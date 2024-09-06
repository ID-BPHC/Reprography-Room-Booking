import * as React from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Event,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";

import { UserAgent, AdminAgent } from "../agent";
import { useStore } from "../Store";
import Modal from "../components/Modal";
import { getUserDetails } from "../utils";

const localizer = momentLocalizer(moment);
const views = ["week", "day"];

const CreateEventModal = (props) => {
  const { open, setOpen, slot, room, handleOk, setUser } = props;
  const [users, setUsers] = React.useState([]);
  const userDetails = getUserDetails();

  React.useEffect(async () => {
    if (userDetails.role !== "AD") {
      return;
    }
    try {
      const res = await AdminAgent.getVerifiedUsers();
      let tempUsers = [
        {
          label: "Book for myself",
          value: userDetails.user_id,
        },
      ];
      for (let i = 0; i < res.data.length; i++) {
        let userName = res.data[i].first_name + " " + res.data[i].last_name;
        tempUsers.push({
          label: userName + "<" + res.data[i].email + ">",
          value: res.data[i].id,
        });
      }
      setUsers(tempUsers);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleCancel = () => {
    setOpen(false);
  };

  if (slot == null) {
    return null;
  }

  return (
    <Modal
      open={open}
      modalTitle="Confirm Booking"
      okText="Confirm"
      cancelText="Cancel"
      handleCancel={handleCancel}
      handleOk={handleOk}
      content={
        <>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            <strong>Room No: </strong>
            {`${room.block} ${room.room_no}`}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Date: </strong>
            {moment(slot.start).format("Do MMM YYYY")}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Slot: </strong>
            {moment(slot.start).format("HH:mm")} -{" "}
            {moment(slot.end).format("HH:mm")}
          </Typography>
          {userDetails.role === "AD" ? (
            <>
              <br />
              <b>Book for: </b>
              <br />
              <br />
              <Autocomplete
                disablePortal
                options={users}
                renderInput={(params) => (
                  <TextField {...params} label="Users" />
                )}
                onChange={(event, item) => {
                  setUser(item.value);
                }}
                defaultValue={"Book for myself"}
              />
            </>
          ) : null}
        </>
      }
    />
  );
};

const DisplayEventModal = (props) => {
  const { open, setOpen, event, setEvent, handleBookingCancel } = props;

  const userDetails = getUserDetails();
  const handleCancel = () => {
    setOpen(false);
    setEvent(null);
  };

  if (event == null) {
    return null;
  }

  return (
    <Modal
      open={open}
      modalTitle="Booking Details"
      okText="Cancel Booking"
      handleOk={handleBookingCancel}
      handleCancel={handleCancel}
      cancelText="Close"
      hideSubmit={
        (userDetails.user_id !== event.owner_id && userDetails.role !== "AD") ||
        (moment(event.start).diff(moment(), "minutes") < 30 &&
          userDetails.role !== "AD")
      }
      content={
        <>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            <strong>Room No: </strong>
            {event.title}
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            <strong>Booked by: </strong>
            {event.owner}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Date: </strong>
            {moment(event.start).format("Do MMM YYYY")}
          </Typography>
          <Typography variant="subtitle2">
            <strong>Slot: </strong>
            {moment(event.start).format("HH:mm")} -{" "}
            {moment(event.end).format("HH:mm")}
          </Typography>
        </>
      }
    />
  );
};

const processEvents = (events) => {
  const userDetails = getUserDetails();
  let serializedEvents = [];
  for (let i = 0; i < events.length; i++) {
    serializedEvents.push({
      title: `${events[i].block} ${events[i].room_no}`,
      start: moment(events[i].start_time).toDate(),
      end: moment(events[i].end_time).toDate(),
      owner: events[i].user_first_name + " " + events[i].user_last_name,
      owner_id: events[i].user_id,
      id: events[i].id,
      self_event: userDetails.user_id === events[i].user_id,
    });
  }

  return serializedEvents;
};

const Calendar = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();

  const [createEventModalOpen, setCreateEventModalOpen] = React.useState(false);
  const [displayEventModalOpen, setDisplayEventModalOpen] =
    React.useState(false);
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const userDetails = getUserDetails();
  const [selectedUser, setSelectedUser] = React.useState(userDetails.user_id);
  const [settings, setSettings] = React.useState({
    START_DATE: moment(),
    END_DATE: moment().add(3, "month"),
    IS_OPEN: true,
  });
  const [currentWeekStart, setCurrentWeekStart] = React.useState(moment());

  const { room, roomList } = useStore((store) => ({
    room: store.room,
    roomList: store.roomList,
  }));

  const [loading, setLoading] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  const [dummyEvents, setDummyEvents] = React.useState([]);

  const handleDummyEvents = (day) => {
    let tempEvents = [];
    let start = moment(settings.START_DATE);
    let end = moment(settings.END_DATE).add(1, "days");
    let weekDay = moment(day).day("Sunday").startOf("day");
    for (let i = 0; i < 7; i++) {
      if (
        weekDay.isBefore(start) ||
        weekDay.isAfter(end) ||
        weekDay.isBefore(moment().startOf("day"))
      ) {
        tempEvents.push({
          title: "",
          start: weekDay.set("hour", 9).set("minute", 0).toDate(),
          end: weekDay.set("hour", 17).set("minute", 0).toDate(),
          owner: "",
          id: 1,
          dummy: true,
        });
      } else if (weekDay.day() === 0) {
        tempEvents.push({
          title: "",
          start: weekDay.set("hour", 9).set("minute", 0).toDate(),
          end: weekDay.set("hour", 17).set("minute", 0).toDate(),
          owner: "",
          id: 1,
          dummy: true,
        });
      } else if (weekDay.day() === 6) {
        tempEvents.push({
          title: "",
          start: weekDay
            .set("hour", moment(settings.SATURDAY_END, "HH:mm:ss").hour())
            .set("minute", 0)
            .toDate(),
          end: weekDay.set("hour", 17).set("minute", 0).toDate(),
          owner: "",
          id: 1,
          dummy: true,
        });
      } else {
        tempEvents.push({
          title: "",
          start: weekDay
            .set("hour", 13)
            .set("minute", 0)
            .toDate(),
          end: weekDay.set("hour", 14).set("minute", 0).toDate(),
          owner: "",
          id: 1,
          dummy: true,
        });
      }
      weekDay = weekDay.add(1, "day");
    }
    setDummyEvents(tempEvents);
  };

  const refreshEvents = async () => {
    setLoading(true);
    try {
      const res = await UserAgent.getEvents({
        room_id: room.id,
        start_time: moment().subtract(365, "days").format("YYYY-MM-DD HH:mm:ss"),
        end_time: moment().add(365, "days").format("YYYY-MM-DD HH:mm:ss"),
      });
      setEvents(processEvents(res.data));
      handleDummyEvents(currentWeekStart);
    } catch (e) {
      enqueueSnackbar("Failed to load calendar events");
    }
    setLoading(false);
  };

  React.useEffect(async () => {
    try {
      const res = await UserAgent.getSettings();
      setSettings(res.data);
    } catch (e) {
      enqueueSnackbar("Failed to fetch settings");
    }
  }, []);

  const handleRangeChange = (range) => {
    if (range.length) {
      handleDummyEvents(range[0]);
      setCurrentWeekStart(moment(range[0]));
    }
  };

  React.useEffect(() => {
    if (room && room.id) {
      refreshEvents();
    }
  }, [roomList, room]);

  const handleEventSubmit = async (event) => {
    setLoading(true);
    try {
      const data = {
        room_id: room.id,
        start_time: moment(selectedSlot.start).format("YYYY-MM-DD HH:mm:ss"),
        end_time: moment(selectedSlot.end).format("YYYY-MM-DD HH:mm:ss"),
        user_id: userDetails.role === "AD" && selectedUser,
      };
      await UserAgent.createEvent(data);
      setSelectedUser(userDetails.user_id);
      refreshEvents();
      enqueueSnackbar("Booking created successfully");
    } catch (e) {
      enqueueSnackbar(e.response.data.detail);
    }
    setCreateEventModalOpen(false);
    setLoading(false);
  };

  const handleBookingCancel = async () => {
    setLoading(true);
    try {
      confirm({
        title: "Cancel booking",
        description: `Are you sure you want to cancel this booking for 
          ${moment(selectedEvent.start).format("Do MMM, YYYY")} from ${moment(
          selectedEvent.start
        ).format("HH:mm")} to ${moment(selectedEvent.end).format("HH:mm")}?`,
        confirmationText: "Yes",
      }).then(async () => {
        await UserAgent.deleteEvent({ booking_id: selectedEvent.id });
        refreshEvents();
        enqueueSnackbar("Booking cancelled successfully");
      });
    } catch (e) {
      enqueueSnackbar("Failed to cancel booking");
    }
    setSelectedEvent(null);
    setDisplayEventModalOpen(false);
    setLoading(false);
  };

  React.useEffect(() => {
    if (selectedSlot == null) {
      return;
    }
    setCreateEventModalOpen(true);
  }, [selectedSlot]);

  React.useEffect(() => {
    if (selectedEvent == null) {
      return;
    }
    setDisplayEventModalOpen(true);
  }, [selectedEvent]);

  return (
    <div style={{ position: "relative", padding: 20 }}>
      <BigCalendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh" }}
        events={[...events, ...dummyEvents]}
        views={views}
        defaultView="week"
        min={moment("9:00", "HH:mm").toDate()}
        max={moment("17:00", "HH:mm").toDate()}
        selectable={true}
        onSelectSlot={(slot) => {
          if (!settings.IS_OPEN) {
            enqueueSnackbar("Booking is closed");
          } else {
            setSelectedSlot(slot);
          }
        }}
        onSelectEvent={(event) => {
          setSelectedEvent(event);
        }}
        step={15}
        timeslots={1}
        eventPropGetter={(event, start, end, isSelected) => {
          let dummyEvent = event.dummy || false;
          let selfEvent = event.self_event || false;
          let backgroundColor = "#1976D2";
          if (dummyEvent) {
            backgroundColor = "#ababab";
          } else if (selfEvent) {
            backgroundColor = "#0b4987";
          }
          let style = dummyEvent
            ? {
                backgroundColor: backgroundColor,
                opacity: 0.4,
                border: "none",
                color: "transparent",
                borderRadius: 0,
                width: "120%",
                padding: 0,
              }
            : {
                backgroundColor: backgroundColor,
                opacity: 0.8,
              };
          return {
            style: style,
          };
        }}
        onRangeChange={handleRangeChange}
      />
      <CreateEventModal
        open={createEventModalOpen}
        setOpen={setCreateEventModalOpen}
        slot={selectedSlot}
        room={room}
        handleOk={handleEventSubmit}
        setUser={setSelectedUser}
      />
      <DisplayEventModal
        open={displayEventModalOpen}
        setOpen={setDisplayEventModalOpen}
        event={selectedEvent}
        setEvent={setSelectedEvent}
        room={room}
        handleBookingCancel={handleBookingCancel}
      />
      <Backdrop
        sx={{
          color: "#fff",
          opacity: 0.7,
          zIndex: (theme) => theme.zIndex.drawer - 1,
          position: "absolute",
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Calendar;
