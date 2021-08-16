import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { RenameFile } from "../../utils/FileOprations";
import { RenameFolder } from "../../utils/FolderOprations";
export default function FormDialog({
  open,
  handleClose,
  id,
  currentname,
  folder,
}) {
  const [newName, SetNewName] = useState("");
  // const NewNameRef = useRef();
  const handleChange = (e) => {
    console.log(e.target.value);

    SetNewName(e.target.value);
  };
  const handleSubmit = () => {
    if (folder) {
      RenameFolder(id, newName);
    } else {
      RenameFile(id, newName);
    }
    handleClose();
  };
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Rename</DialogTitle>
        <DialogContent style={{ width: 300 }}>
          <TextField
            onChange={handleChange}
            autoFocus
            margin="dense"
            id="name"
            label="New Name"
            type="text"
            defaultValue={currentname}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!newName} color="primary">
            Rename
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
