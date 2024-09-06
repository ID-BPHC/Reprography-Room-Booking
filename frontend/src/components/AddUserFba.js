import * as React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "notistack";

import { AdminAgent } from "../agent";
import Modal from "../components/Modal";

const AddUserFba = (props) => {
  const { refreshUsers } = props;

  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleFabButtonClick = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await AdminAgent.addUser({
        email: email,
        first_name: firstName,
        last_name: lastName,
      });
      setEmail("");
      setFirstName("");
      setLastName("");
      refreshUsers();
      enqueueSnackbar("User added successfully");
    } catch (e) {
      enqueueSnackbar(e.response.data.detail);
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        modalTitle="Add User"
        okText="Add"
        cancelText="Cancel"
        handleCancel={handleCancel}
        handleOk={handleSubmit}
        content={
          <>
            {!loading ? (
              <div style={{ padding: 20 }}>
                <InputLabel>Email</InputLabel>
                <Input
                  id="block"
                  sx={{ width: "100%" }}
                  value={email}
                  onChange={handleEmailChange}
                />
                <br />
                <br />
                <InputLabel>First Name</InputLabel>
                <Input
                  id="room_no"
                  sx={{ width: "100%" }}
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
                <br />
                <br />
                <InputLabel>Last Name</InputLabel>
                <Input
                  id="room_no"
                  sx={{ width: "100%" }}
                  value={lastName}
                  onChange={handleLastNameChange}
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
        <AddIcon /> Add User
      </Fab>
    </div>
  );
};

export default AddUserFba;
