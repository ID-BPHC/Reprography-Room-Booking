import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";

import { getUserDetails } from "../utils";
import { useStore } from "../Store";
import ChangeRoomFba from "../components/ChangeRoomFba";
import { UserAgent } from "../agent";

const BookingCard = (props) => {
  const { booking, setLoading, fetchBookings, alert } = props;
  const {enqueueSnackbar} = useSnackbar();
  const confirm = useConfirm();

  const handleBookingCancel = async () => {
    setLoading(true);
    try {
      confirm({
        title: "Cancel booking",
        description: `Are your sure you want to cancel this booking for 
          ${moment(booking.start).format("Do MMM, YYYY")} from ${moment(
          booking.start_time
        ).format("HH:mm")} to ${moment(booking.end_time).format("HH:mm")}?`,
        confirmationText: "Yes",
      }).then(async () => {
        await UserAgent.deleteEvent({ booking_id: booking.id });
        fetchBookings();
        enqueueSnackbar("Booking cancelled successfully");
      });
      fetchBookings();
    } catch (e) {
      alert("Failed to cancel booking");
    }
    setLoading(false);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" sx={{ color: "text.secondary" }}>
          <strong>Room no: </strong>
          {`${booking.block} ${booking.room_no}`}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Date: </strong>
          {moment(booking.start_time).format("Do MMM, YYYY")}
        </Typography>
        <Typography variant="subtitle2">
          <strong>Slot: </strong>
          {moment(booking.start_time).format("hh:mm A")}
          {" - "}
          {moment(booking.end_time).format("hh:mm A")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={handleBookingCancel}>
          Cancel Booking
        </Button>
      </CardActions>
    </Card>
  );
};

const Bookings = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { room, roomList } = useStore((store) => ({
    room: store.room,
    roomList: store.roomList,
  }));

  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const userDetails = getUserDetails();
      const res = await UserAgent.getEvents({
        start_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        end_time: moment().add(365, "days").format("YYYY-MM-DD HH:mm:ss"),
        room_id: room.id,
        user_id: userDetails.user_id,
      });
      setBookings(res.data);
    } catch (e) {
      enqueueSnackbar("Failed to fetch bookings");
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (room && room.id) {
      fetchBookings();
    }
  }, [roomList, room]);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h3" sx={{ fontWeight: 500, marginBottom: "20px" }}>
        Upcoming Bookings
      </Typography>
      {!loading ? (
        <Grid container spacing={2}>
          {bookings.map((booking) => (
            <Grid item md={6}>
              <BookingCard
                booking={booking}
                setLoading={setLoading}
                fetchBookings={fetchBookings}
                alert={enqueueSnackbar}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <CircularProgress />
      )}
      <ChangeRoomFba />
    </div>
  );
};

export default Bookings;
