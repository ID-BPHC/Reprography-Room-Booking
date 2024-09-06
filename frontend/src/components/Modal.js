import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";

const Modal = (props) => {
  const {
    open,
    handleOk,
    handleCancel,
    modalTitle,
    okText = "Submit",
    cancelText = "Cancel",
    hideSubmit = false,
		content
  } = props;

  return (
    <div>
      <Dialog open={open} PaperComponent={Paper}>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent style={{minWidth: 500}}>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>{cancelText}</Button>
          {!hideSubmit ? <Button onClick={handleOk}>{okText}</Button> : null}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
