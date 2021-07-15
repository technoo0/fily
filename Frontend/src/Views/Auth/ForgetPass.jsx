import React from "react";
import {
  Grid,
  Paper,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import MyAlert from "./myalert";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../images/Logo.svg";

import { useState } from "react";
import axios from "axios";
const UseStyles = makeStyles((theme) => ({
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
  aler: {
    position: "absolute",
    bottom: 30,
    right: 10,
    width: "70%",
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
  root: {
    position: "relative",
  },
  formInput: {
    //marginBottom: 10,
  },
}));
export default function Login() {
  const classes = UseStyles();

  const [Lodding, SetLodding] = useState(false);
  const [Email, SetEmail] = useState("");

  const [EmailError, SetEmailError] = useState(false);
  const [showAlert, SetshowAlert] = useState(false);
  const [ErrorMassage, SetErrorMassage] = useState("");
  const [AlertType, SetAlertType] = useState("error");
  const history = useHistory();
  const hanldSubmit = (e) => {
    e.preventDefault();
    SetLodding(true);
    SetEmailError(false);

    axios
      .post(
        "http://localhost:4000/u/ForgetPass",
        {
          email: Email,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.msg == "OK") {
          //   history.push("/");
          console.log("good");
          SetLodding(false);
          SetshowAlert(true);
          SetAlertType("success");
          SetErrorMassage("The email has been sent ");
        }
      })
      .catch((e) => {
        SetLodding(false);
        if (e.response.status == 404) {
          if (e.response.data.error == "Email Not registered") {
            SetEmailError(true);
          }
        } else if (e.response.status == 501) {
          if (e.response.data.error == "SomeThing Worg") {
            SetshowAlert(true);
            SetAlertType("error");
            SetErrorMassage("SomeThing Worg Please Try again later");
          }
        }
        //console.log("errrrrrr", e.response.data.message);
      });
  };

  const handleChange = (e) => {
    if (e.target.name == "Email") {
      SetEmail(e.target.value);
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
        <Grid item xs={10} sm={7} md={5} lg={3} xl={3}>
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
                        className={classes.formInput}
                        type="text"
                        //placeholder="Email"
                        fullWidth
                        name="Email"
                        label="Email"
                        //   variant="outlined"
                        //value={this.state.password}
                        error={EmailError}
                        helperText={EmailError ? "Email not registered" : ""}
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
                        {Lodding ? <CircularProgress /> : "Send Email"}
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
