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
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import TwitterIcon from "@material-ui/icons/Twitter";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../images/Logo.svg";
import GoogleLogo from "../../images/Google.svg";
import { useState } from "react";
import axios from "../../Axios";
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
  const classes = UseStyles();
  const [ShowPass, SetShowPass] = useState(false);
  const [Lodding, SetLodding] = useState(false);
  const [Email, SetEmail] = useState("");
  const [Pass, SetPass] = useState("");
  const [EmailError, SetEmailError] = useState(false);
  const [PasswordError, SetPasswordError] = useState(false);
  const history = useHistory();
  const hanldSubmit = (e) => {
    e.preventDefault();
    SetLodding(true);
    SetEmailError(false);
    SetPasswordError(false);
    axios
      .post(
        "/u/login",
        {
          email: Email,
          password: Pass,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("eeeeees", res);
        if (res.data.msg == "OK") {
          history.push("/");
        }
      })
      .catch((e) => {
        SetLodding(false);
        if (e.response.status == 401) {
          if (e.response.data.message == "That email is not registered") {
            SetEmailError(true);
          } else if (e.response.data.message == "Password incorrect") {
            SetPasswordError(true);
          } else if (e.response.data.message == "Too Many Password Retrys") {
            alert("You intered you password too many times slow down");
          } else {
            alert(e.response.data.message);
          }
        }
        //console.log("errrrrrr", e.response.data.message);
      });
  };

  const handleChange = (e) => {
    if (e.target.name == "Email") {
      SetEmail(e.target.value);
    } else if (e.target.name == "password") {
      SetPass(e.target.value);
    }
  };

  const TwitterHandel = () => {
    window.location.href = "http://localhost:4000/auth/twitter";
  };
  const GoogleHandel = () => {
    window.location.href = "http://localhost:4000/auth/google";
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
                onClick={TwitterHandel}
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
                Login with Twitter
              </Button>
            </Grid>
            <Grid item xs={8} lg={9}>
              <Button
                onClick={GoogleHandel}
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
                Login with Google
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
                      //placeholder="Email"
                      fullWidth
                      name="Email"
                      label="Email"
                      //   variant="outlined"
                      //value={this.state.password}
                      error={EmailError}
                      helperText={EmailError ? "Wrong Email" : ""}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type={ShowPass ? "text" : "password"}
                      label="Password"
                      fullWidth
                      name="password"
                      error={PasswordError}
                      helperText={PasswordError ? "Wrong Password" : ""}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <IconButton
                              onClick={() => {
                                SetShowPass(!ShowPass);
                              }}
                            >
                              {ShowPass ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={handleChange}
                      required
                    />
                    <Grid container direction="row-reverse">
                      <Typography className={classes.Forget} variant="caption">
                        <Link to="/ForgetPassword">Forget Password ?</Link>{" "}
                      </Typography>
                    </Grid>
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
                      {Lodding ? <CircularProgress /> : "Login"}
                    </Button>
                  </Grid>

                  <Grid item justify="center" container>
                    <Typography>
                      Don’t have an account <Link to="/SignIn">SignIn</Link>{" "}
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
