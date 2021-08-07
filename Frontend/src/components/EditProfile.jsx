import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import EditIcon from "@material-ui/icons/Edit";
import DialogTitle from "@material-ui/core/DialogTitle";
import useStore from "../store";
import validator from "validator";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "../Axios";

import {
  Grid,
  Typography,
  Box,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core";

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
  inputBox: {
    width: "100%",
  },
}));

export default function AlertDialog({ open, CloseProfile }) {
  const UserData = useStore((state) => state.UserData); //reactive
  const [errors, setErros] = useState({
    Name: false,
    Email: false,
    Password: false,
    CPassword: false,
  });
  const classes = useStyles();
  const [NewName, SetName] = useState(UserData.Name);
  const [NewEmail, SetEmail] = useState(UserData.Email);
  const [NewPass, SetPass] = useState("");
  const [NewCpass, SetCPass] = useState("");
  const [EmailError, SetEmailError] = useState("");
  const [Lodding, SetLodding] = useState(false);

  useEffect(() => {
    SetName(useStore.getState().UserData.Name);
    SetEmail(useStore.getState().UserData.Email);
  }, []);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    if (e.target.name == "email") {
      SetEmail(e.target.value);
    } else if (e.target.name == "name") {
      SetName(e.target.value);
    } else if (e.target.name == "password") {
      SetPass(e.target.value);
    } else if (e.target.name == "cpassword") {
      SetCPass(e.target.value);
    }
  };
  const HandelSubmit = () => {
    if (!Lodding) {
      SetLodding(true);
      var AllGood = true;
      //Check Name
      if (!NewName) {
        AllGood = false;
        setErros((prevState) => {
          let e = Object.assign({}, prevState);
          e.Name = true;
          return e;
        });
      } else {
        setErros((prevState) => {
          let e = Object.assign({}, prevState);
          e.Name = false;
          return e;
        });
      }

      if (!validator.isEmail(NewEmail)) {
        AllGood = false;
        console.log(NewEmail);
        setErros((prevState) => {
          let e = Object.assign({}, prevState);
          SetEmailError("This is not a vaild email");
          e.Email = true;
          return e;
        });
      } else {
        setErros((prevState) => {
          let e = Object.assign({}, prevState);
          e.Email = false;
          return e;
        });
      }
      if (NewPass) {
        if (!validator.isStrongPassword(NewPass)) {
          AllGood = false;
          setErros((prevState) => {
            let e = Object.assign({}, prevState);
            e.Password = true;

            return e;
          });
        } else {
          setErros((prevState) => {
            let e = Object.assign({}, prevState);
            e.Password = false;
            return e;
          });
        }

        if (NewCpass != NewPass) {
          AllGood = false;
          setErros((prevState) => {
            let e = Object.assign({}, prevState);
            e.CPassword = true;

            return e;
          });
        } else {
          setErros((prevState) => {
            let e = Object.assign({}, prevState);
            e.CPassword = false;
            return e;
          });
        }
      }
      if (AllGood) {
        var Changing = {};
        if (NewName != UserData.Name) {
          Changing.Name = NewName;
        }
        if (NewEmail != UserData.Email) {
          Changing.Email = NewEmail;
        }
        if (NewPass) {
          Changing.Password = NewPass;
        }
        console.log(Object.keys(Changing).length);
        if (Object.keys(Changing).length !== 0) {
          axios
            .post("/u/updateData", Changing, { withCredentials: true })
            .then((res) => {
              console.log(res);
              SetLodding(false);
              CloseProfile();
            })
            .catch((err) => {
              console.log(err);
              SetLodding(false);
              if (err.response.status == 400) {
                if (err.response.data.error == "Email") {
                  setErros((prevState) => {
                    let e = Object.assign({}, prevState);
                    SetEmailError("Email is already in use");
                    e.Email = true;
                    return e;
                  });
                }
              } else {
                setErros((prevState) => {
                  let e = Object.assign({}, prevState);

                  e.Email = false;
                  return e;
                });
              }
            });
        } else {
          SetLodding(false);
          CloseProfile();
        }
      }
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
          <AccountCircleIcon className={classes.profileIcon} />
          <b>{"Edit Profile"}</b>
        </DialogTitle>
        <DialogContent dividers className={classes.Main}>
          <Grid
            spacing={3}
            container
            direction={"column"}
            justify={"flex-start"}
          >
            <Grid
              item
              xs={12}
              container
              direction={"row"}
              alignItems={"center"}
            >
              <Grid item xs={4}>
                <Typography>Name : </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  size="small"
                  defaultValue={UserData.Name}
                  name="name"
                  error={errors.Name}
                  helperText={errors.Name ? "required" : ""}
                  onChange={handleChange}
                  className={classes.inputBox}
                  label=""
                />
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              container
              direction={"row"}
              alignItems={"center"}
            >
              <Grid item xs={4}>
                <Typography>Email : </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  size="small"
                  type="email"
                  error={errors.Email}
                  helperText={errors.Email ? EmailError : ""}
                  name="email"
                  onChange={handleChange}
                  className={classes.inputBox}
                  defaultValue={UserData.Email}
                  label=""
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography>Change Password</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction={"row"}
              alignItems={"center"}
            >
              <Grid item xs={4}>
                <Typography>New Password : </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  size="small"
                  type={"password"}
                  name="password"
                  onChange={handleChange}
                  error={errors.Password}
                  helperText={
                    errors.Password ? "must have a-z A-Z 0-9 @#$%.&" : ""
                  }
                  className={classes.inputBox}
                  label=""
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction={"row"}
              alignItems={"center"}
            >
              <Grid item xs={4}>
                <Typography>Confirm Password : </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  size="small"
                  error={errors.CPassword}
                  helperText={errors.CPassword ? "Passwords don't match" : ""}
                  name="cpassword"
                  onChange={handleChange}
                  type={"password"}
                  className={classes.inputBox}
                  label=""
                />
              </Grid>
            </Grid>

            <Grid item xs={12} className={classes.lastRow}>
              <Button onClick={HandelSubmit} className={classes.button}>
                {Lodding ? <CircularProgress /> : "Save"}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
