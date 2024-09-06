import * as React from "react";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useSnackbar } from "notistack";
import { blue } from "@mui/material/colors";

import { UserAgent } from "../agent";
import { useStore } from "../Store";

const ChangeRoomFba = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const { room, setRoom, roomList, setRoomList } = useStore((store) => ({
    room: store.room,
    setRoom: store.setRoom,
    roomList: store.roomList,
    setRoomList: store.setRoomList,
  }));

  const [open, setOpen] = React.useState(false);

  const handleFabButtonClick = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (value) => {
    setRoom(value);
    setOpen(false);
  };

  React.useEffect(async () => {
    try {
      const res = await UserAgent.getRooms();
      setRoomList(res.data);
      if (res.data.length > 0) {
        setRoom(res.data[0]);
      }
    } catch (e) {
      enqueueSnackbar("Failed to get rooms");
    }
  }, []);

  return (
    <div>
      <Dialog open={open} handleClose={handleClose}>
        <DialogTitle>Select Room</DialogTitle>
        <List sx={{ pt: 0 }}>
          {roomList.map((room) => (
            <ListItem
              button
              onClick={() => handleListItemClick(room)}
              key={room.id}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  {room.id}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${room.block} ${room.room_no}`} />
            </ListItem>
          ))}
        </List>
      </Dialog>
      <Fab
        variant="extended"
        color="primary"
        style={{
          position: "fixed",
          right: 30,
          bottom: 30,
          visibility: roomList.length > 1 ? "visible" : "hidden",
        }}
        onClick={handleFabButtonClick}
      >
        <EditIcon /> Change Room
      </Fab>
    </div>
  );
};

export default ChangeRoomFba;
