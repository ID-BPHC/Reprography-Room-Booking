import * as React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "notistack";

import { AdminAgent } from "../agent";
import Modal from "../components/Modal";

const ChangeRoomFba = (props) => {
  const { refreshRooms } = props;

  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [room, setRoom] = React.useState(null);
  const [block, setBlock] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleFabButtonClick = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  const handleBlockChange = (event) => {
    setBlock(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await AdminAgent.addRoom({
        room_no: room,
        block: block,
      });
      refreshRooms();
      enqueueSnackbar("Room added successfully");
    } catch (e) {
      enqueueSnackbar("Failed to add room");
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        modalTitle="Add Room"
        okText="Add"
        cancelText="Cancel"
        handleCancel={handleCancel}
        handleOk={handleSubmit}
        content={
          <>
            {!loading ? (
              <div style={{ padding: 20 }}>
                <InputLabel>Block</InputLabel>
                <Input
                  id="block"
                  sx={{ width: "100%" }}
                  value={block}
                  onChange={handleBlockChange}
                />
                <br />
                <br />
                <InputLabel>Room Number</InputLabel>
                <Input
                  id="room_no"
                  sx={{ width: "100%" }}
                  value={room}
                  onChange={handleRoomChange}
                />
              </div>
            ) : (
              <CircularProgress />
            )}
          </>
        }
      />
      <Fab
        variant="extended"
        color="primary"
        style={{
          position: "fixed",
          right: 30,
          bottom: 30,
        }}
        onClick={handleFabButtonClick}
      >
        <AddIcon /> Add Room
      </Fab>
    </div>
  );
};

export default ChangeRoomFba;
