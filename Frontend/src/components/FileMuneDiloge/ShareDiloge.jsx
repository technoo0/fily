import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, IconButton } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";

export default function ShareDiloge({ open, handleClose, link }) {
  // const NewNameRef = useRef();

  const CopyLink = () => {
    window.navigator.clipboard.writeText(link);
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
        <DialogTitle id="form-dialog-title">Share</DialogTitle>
        <DialogContent style={{ width: 300 }}>
          <Grid container direction={"row"} alignItems={"center"}>
            <Grid item xs={11}>
              <TextField
                disabled
                autoFocus
                margin="dense"
                id="name"
                label="New Name"
                type="text"
                defaultValue={link}
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={CopyLink}>
                <FileCopyIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
