import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MoveFile, CopyFile } from "../../utils/FileOprations";
import { MoveFolder, CopyFolder } from "../../utils/FolderOprations";
import BorwoseFolders from "./BorwoseFolders";
export default function FormDialog({ open, handleClose, id, op, folder }) {
  const [newName, SetNewName] = useState("");
  // const NewNameRef = useRef();
  const handleChange = (e) => {
    SetNewName(e);
  };
  const handleSubmit = () => {
    if (folder) {
      if (op == "Move") {
        MoveFolder(id, newName);
      } else if (op == "Copy") {
        console.log("copy", id, newName);
        CopyFolder(id, newName);
      }
    } else {
      if (op == "Move") {
        MoveFile(id, newName);
      } else if (op == "Copy") {
        console.log("copy", id, newName);
        CopyFile(id, newName);
      }
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
        <DialogTitle id="form-dialog-title">{op} to</DialogTitle>
        <DialogContent style={{ width: 300 }}>
          {/* <TextField
            onChange={handleChange}
            autoFocus
            margin="dense"
            id="name"
            label="New Name"
            type="text"
            defaultValue={currentname}
            fullWidth
          /> */}
          <BorwoseFolders NewSelect={handleChange} hidethis={id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!newName} color="primary">
            {op}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
