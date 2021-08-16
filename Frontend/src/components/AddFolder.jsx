import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Typography, Box, TextField } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core";

import useStore from "../store";
import axios from "../Axios";
import { UpdateHome } from "../utils/getData";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    height: 40,
    textTransform: "none",
    fontSize: 17,
    color: "#000000",
    backgroundColor: "#EAE2B7",
    "&:hover": {
      backgroundColor: "#cfc7a1",
    },
    borderRadius: 30,
  },
  button2: {
    width: "100%",
    height: 40,
    textTransform: "none",
    fontSize: 17,
    color: "#ffffff",
    backgroundColor: "#D62828",
    "&:hover": {
      backgroundColor: "#871717",
    },
    borderRadius: 30,
  },
  lastRow: {
    marginTop: 60,
  },
  profileIcon: {
    marginTop: 5,
    marginRight: 5,
  },
  paper: {
    borderRadius: 25,
  },
  Main: {
    width: 400,
    height: 50,
    overflow: "hidden",
  },
}));

export default function AlertDialog({ open, CloseProfile }) {
  const classes = useStyles();
  const inputRef = useRef();
  const [NameError, setNameError] = useState(false);
  const CreateFolder = () => {
    if (inputRef.current.value) {
      const currentFolder = useStore.getState().CurrentFolderID;
      const refreshCurrent = useStore.getState().refreshCurrent;
      axios
        .post(
          "/ops/CreateFolder",
          { name: inputRef.current.value, ParentId: currentFolder },
          { withCredentials: true }
        )
        .then((e) => {
          console.log(e);
          CloseProfile();
          refreshCurrent();
          // UpdateHome();
        })
        .catch((e) => {
          if (e.response.data.msg) {
            if (e.response.data.msg == "name error") {
              console.log(e.response.data.msg);
              setNameError(true);
            }
          }
        });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={CloseProfile}
        classes={{ paper: classes.paper }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <b>{"Create Folder"}</b>
        </DialogTitle>
        <DialogContent className={classes.Main}>
          <Grid
            spacing={0}
            container
            direction={"row"}
            alignItems={"center"}
            justify={"flex-start"}
          >
            <Grid item xs={3}>
              <Typography>Folder Name</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                error={NameError}
                id="outlined-basic"
                label=""
                size="small"
                variant="outlined"
                fullWidth
                helperText={NameError ? "this folder already exists" : ""}
                inputRef={inputRef}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={CreateFolder} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
