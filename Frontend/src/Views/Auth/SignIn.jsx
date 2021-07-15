import React from "react";
import {
  Grid,
  Paper,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import validator from "validator";
import axios from "axios";

import TwitterIcon from "@material-ui/icons/Twitter";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../images/Logo.svg";
import GoogleLogo from "../../images/Google.svg";
import { useState } from "react";
const UseStyles = makeStyles((theme) => ({
  //   Forget: {
  //     marginLeft: 200,
  //   },
  mainLogo: {
    height: 100,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    boxShadow: "0px 0px 0px",
    marginBottom: 10,
    // width: 300,
    height: 50,
    textTransform: "none",
    fontWeight: "bold",
    fontSize: 18,
    borderRadius: 30,
    backgroundColor: "#1DA1F2",
    color: "white",
    "&:hover": {
      backgroundColor: "#1D89CB",
    },
  },
  button2: {
    boxShadow: "0px 0px 0px",
    marginBottom: 20,
    // width: 300,
    height: 50,
    textTransform: "none",
    fontWeight: "bold",
    fontSize: 18,
    borderRadius: 30,
    backgroundColor: "#DB4437",
    color: "white",
    "&:hover": {
      backgroundColor: "#B7362B",
    },
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
    height: 700,
    borderRadius: 29,
  },
  mainGrid: {
    height: "100vh",
    //Width: "100vw",
  },
  formInput: {
    //marginBottom: 10,
  },
}));
export default function Login() {
  const history = useHistory();
  const classes = UseStyles();
  const [ShowPass, SetShowPass] = useState(false);
  const [Lodding, SetLodding] = useState(false);
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Pass, SetPass] = useState("");
  const [CPass, SetCPass] = useState("");
  const [EmailError, SetEmailError] = useState(false);
  const [PasswordError, SetPasswordError] = useState(false);
  const [CPasswordError, SetCPasswordError] = useState(false);
  const hanldSubmit = (e) => {
    e.preventDefault();
    SetEmailError(false);
    if (!Lodding) {
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
            "http://localhost:4000/u/register",
            {
              Name: Name,
              email: Email,
              password: Pass,
            },
            { withCredentials: true }
          )
          .then((res) => {
            if (res.data.msg == "OK") {
              history.push("/Login?NewUser=true");
            }
          })
          .catch((e) => {
            SetLodding(false);
            if (e.response.status == 400) {
              if (e.response.data.error == "Email") {
                SetEmailError(true);
              }
            }
            //console.log(e.response.status, e.response.data.error);
          });
      } else {
        SetPasswordError(!validPass);
        SetCPasswordError(!validConfirm);
      }
    }
  };
  const handleChange = (e) => {
    if (e.target.name == "Name") {
      SetName(e.target.value);
    } else if (e.target.name == "Email") {
      SetEmail(e.target.value);
    } else if (e.target.name == "password") {
      SetPass(e.target.value);
    } else if (e.target.name == "Confirm Password") {
      SetCPass(e.target.value);
    }
  };
  return (
    <Grid
      className={classes.mainGrid}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={10} sm={8} md={5} lg={3} xl={3}>
        <Paper className={classes.container} elevation={6}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item container justify="center" alignContent="center" xs={12}>
              <Link to="/">
                <img className={classes.mainLogo} src={Logo} alt="logo" />
              </Link>
            </Grid>
            <Grid item xs={8} lg={9}>
              <Button
                size="large"
                fullWidth
                className={classes.button}
                startIcon={
                  <TwitterIcon
                    className={classes.buttonicon}
                    fontSize="large"
                  />
                }
                variant="contained"
              >
                Sgin up with Twitter
              </Button>
            </Grid>
            <Grid item xs={8} lg={9}>
              <Button
                fullWidth
                size="large"
                className={classes.button2}
                startIcon={
                  <img
                    src={GoogleLogo}
                    className={classes.buttonicon}
                    alt="google"
                  />
                }
                variant="contained"
              >
                Sgin up with Google
              </Button>
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
                      className={classes.formInput}
                      type="text"
                      //error
                      //helperText="Incorrect entry."
                      //placeholder="Email"
                      fullWidth
                      name="Name"
                      label="Name"
                      id="Name"
                      //   variant="outlined"
                      //value={this.state.password}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.formInput}
                      id="Email"
                      type="text"
                      //placeholder="Email"
                      fullWidth
                      name="Email"
                      label="Email"
                      error={EmailError}
                      helperText={EmailError ? "Email already in use" : ""}
                      //   variant="outlined"
                      //value={this.state.password}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type={ShowPass ? "text" : "password"}
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
                      helperText={CPasswordError ? "Passwords don't match" : ""}
                      type={ShowPass ? "text" : "password"}
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
                      {Lodding ? <CircularProgress /> : "Sgin up"}
                    </Button>
                  </Grid>

                  <Grid item justify="center" container>
                    <Typography>
                      Already have an account <Link to="/Login">Login</Link>{" "}
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
