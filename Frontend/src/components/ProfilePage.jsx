import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DialogContent from "@material-ui/core/DialogContent";
import EditIcon from "@material-ui/icons/Edit";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Typography, Box, LinearProgress } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core";
import EditProfile from "./EditProfile";
import useStore from "../store";
import axios from "../Axios";
import { useHistory } from "react-router-dom";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EAE2B7",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#D62828",
  },
}))(LinearProgress);

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
  },
}));

export default function AlertDialog({ open, CloseProfile }) {
  const history = useHistory();
  const Logout = () => {
    axios.post("/u/logout", {}, { withCredentials: true }).then((res) => {
      console.log(res);
      if (res.data.msg === "You are loged out") {
        console.log(res);
        history.push("/");
        window.location.reload();
      }
    });
  };
  const classes = useStyles();
  const [openf, setopen] = useState(false);
  const OpenEdit = () => {
    setopen(true);
  };
  const UserData = useStore((state) => state.UserData); //reactive
  const CloseProfiles = () => {
    setopen(false);
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
          <AccountCircleIcon className={classes.profileIcon} />
          <b>{"Profile"}</b>
        </DialogTitle>
        <DialogContent dividers className={classes.Main}>
          <Grid
            spacing={3}
            container
            direction={"column"}
            justify={"flex-start"}
          >
            <Grid item xs={12}>
              <Typography>Name : {UserData.Name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Email : {UserData.Email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Date of join : {UserData.JoinData}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction={"row"}
              justify={"center"}
              alignItems={"center"}
            >
              <Grid item xs={2}>
                <Typography>Usage :</Typography>
              </Grid>
              <Grid item xs={10}>
                <Box display="flex" alignItems="center">
                  <Box width="100%" mr={1}>
                    <BorderLinearProgress
                      variant="determinate"
                      value={(UserData.usage / 1e9) * 100}
                      thickness={4}
                    />
                  </Box>
                  <Box minWidth={35}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >{`${Math.round(
                      (UserData.usage / 1e9) * 100
                    )}%`}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                You have 1 GB of storage {UserData.usage / 1e9}{" "}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              {UserData.Startigy === "local" ? (
                <Button
                  onClick={OpenEdit}
                  className={classes.button}
                  endIcon={<EditIcon />}
                >
                  Edit
                </Button>
              ) : (
                ""
              )}
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction={"row"}
              justify={"space-between"}
              className={classes.lastRow}
            >
              <Grid item xs={3}>
                <Button onClick={Logout} className={classes.button}>
                  Logout
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button className={classes.button2}>Delet Account</Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={CloseProfile} color="primary">
            Disagree
          </Button>
          <Button onClick={CloseProfile} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
      <EditProfile open={openf} CloseProfile={CloseProfiles} />
    </div>
  );
}
