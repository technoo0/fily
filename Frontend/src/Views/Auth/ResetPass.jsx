import React from "react";
import validator from "validator";
import MyAlert from "./myalert";
import {
  Grid,
  Paper,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Link, useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../images/Logo.svg";

import { useState, useEffect } from "react";
import axios from "../../Axios";
const UseStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  aler: {
    position: "absolute",
    bottom: 30,
    right: 10,
    width: "70%",
  },
  //   Forget: {
  //     marginLeft: 200,
  //   },
  mainLogo: {
    height: 100,
    marginTop: 10,
    marginBottom: 20,
  },

  button3: {
    boxShadow: "0px 0px 0px",
    marginTop: 30,
    // width: 300,
    height: 50,
    textTransform: "none",
    fontWeight: "bold",
    fontSize: 20,
    backgroundColor: "#FCBF49",
    "&:hover": {
      backgroundColor: "#FFBC3B",
    },
    borderRadius: 30,
    color: "white",
  },
  buttonicon: {
    width: 40,
    height: 40,
  },
  container: {
    height: 450,
    borderRadius: 29,
  },
  mainGrid: {
    position: "relative",
    height: "100vh",
    //Width: "100vw",
  },
  formInput: {
    //marginBottom: 10,
  },
}));
export default function Login(props) {
  const classes = UseStyles();

  const [Lodding, SetLodding] = useState(false);
  const [showAlert, SetshowAlert] = useState(false);
  const [ErrorMassage, SetErrorMassage] = useState("");
  const [Email, SetEmail] = useState("");
  const { id, token } = useParams();

  const [AlertType, SetAlertType] = useState("error");
  const [disableB, SetdisableB] = useState("");
  const [Pass, SetPass] = useState("");
  const [CPass, SetCPass] = useState("");
  const [PasswordError, SetPasswordError] = useState(false);
  const [CPasswordError, SetCPasswordError] = useState(false);
  useEffect(() => {
    console.log("hhhhhhpohoihohpoi");
    console.log(id, token);
  }, []);

  const history = useHistory();
  const hanldSubmit = (e) => {
    e.preventDefault();
    SetshowAlert(false);
    let validPass = true;
    let validConfirm = true;
    if (Pass != CPass) {
      validConfirm = false;
    } else {
      validConfirm = true;
    }

    if (!validator.isStrongPassword(Pass)) {
      validPass = false;
    } else {
      validPass = true;
    }

    if (validPass && validConfirm) {
      SetLodding(true);
      SetPasswordError(false);
      SetCPasswordError(false);
      axios
        .post(
          "/u/ResetPass",
          {
            id: id,
            token: token,
            password: Pass,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.msg == "OK") {
            console.log("good");
            SetshowAlert(true);
            SetAlertType("success");
            SetErrorMassage(
              "Your password has changed sucssfuly redirciting to login... "
            );
            SetLodding(false);
            setTimeout(() => {
              history.push("/login");
            }, 2000);
          }
        })
        .catch((e) => {
          SetLodding(false);
          if (e.response.status == 400) {
            if (e.response.data.error == "jwt expired") {
              SetshowAlert(true);
              SetAlertType("error");
              SetErrorMassage("The link you used is expired");
            }
          } else if (e.response.status == 404) {
            if (e.response.data.error == "id not found") {
              SetshowAlert(true);
              SetAlertType("error");
              SetErrorMassage("Something worng with you link");
            }
          } else {
            SetshowAlert(true);
            SetAlertType("error");
            SetErrorMassage("Something worng ");
          }
          //console.log("errrrrrr", e.response.data.message);
        });
    } else {
      SetPasswordError(!validPass);
      SetCPasswordError(!validConfirm);
    }
  };

  const handleChange = (e) => {
    if (e.target.name == "password") {
      SetPass(e.target.value);
    } else if (e.target.name == "Confirm Password") {
      SetCPass(e.target.value);
    }
  };
  return (
    <div className={classes.root}>
      <Grid
        className={classes.mainGrid}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={10} sm={8} md={5} lg={3} xl={3}>
          <Paper className={classes.container} elevation={6}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid
                item
                container
                justify="center"
                alignContent="center"
                xs={12}
              >
                <Link to="/">
                  <img className={classes.mainLogo} src={Logo} alt="logo" />
                </Link>
              </Grid>
              <Grid item xs={8}>
                <Typography>
                  Enter the email address associated with your account and we'll
                  send you a link to reset your password.
                </Typography>
              </Grid>

              <Grid item xs={8}>
                <form
                  className={classes.root}
                  autoComplete="on"
                  onSubmit={hanldSubmit}
                >
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <TextField
                        type={"password"}
                        error={PasswordError}
                        helperText={
                          PasswordError ? "must have a-z A-Z 0-9 @#$%.&" : ""
                        }
                        label="Password"
                        id="Password"
                        fullWidth
                        name="password"
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        error={CPasswordError}
                        helperText={
                          CPasswordError ? "Passwords don't match" : ""
                        }
                        type={"password"}
                        label="Confirm Password"
                        id="cPassword"
                        fullWidth
                        name="Confirm Password"
                        onChange={handleChange}
                        required
                      />
                    </Grid>

                    <Grid item>
                      <Button
                        type="submit"
                        color="secondary"
                        size="large"
                        fullWidth
                        className={classes.button3}
                        variant="contained"
                      >
                        {Lodding ? <CircularProgress /> : "Reset Password"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <MyAlert
        className={classes.aler}
        massage={ErrorMassage}
        showAlert={showAlert}
        setshowAlert={SetshowAlert}
        type={AlertType}
      />
    </div>
  );
}
