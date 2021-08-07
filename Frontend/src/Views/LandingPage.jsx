import React from "react";
import Cover from "../images/LangingPage.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import ScreenShot from "../images/Capture.JPG";
import Header from "../components/LandingPage/Header";
const UseStyles = makeStyles((theme) => ({
  whiteText: {
    color: "#ffffff",
  },
  ScreenShot: {
    width: "100%",
    borderRadius: 20,
    boxShadow: "0px 0px 50px rgba(0,0,0,0.90)",
  },
  HeaderGrid: {
    width: "100%",
  },
  main: {
    position: "relative",
    maxWidth: "100vw",
  },
  mainGrid: {
    width: "100%",
  },
  im: {
    zIndex: "-1",
    position: "absolute",
    left: 0,
    top: -5,
    objectFit: "cover",
    width: "100vw",
    height: "75vh",
  },
  logo: {
    width: "100%",
  },
  text: {
    marginBottom: 50,
    textAlign: "center",
  },
  buttonConter: {
    // marginRight: 45,
  },
  button3: {
    boxShadow: "0px 0px 0px",
    marginTop: 20,
    width: 110,
    height: 36,
    // marginLeft: 10,
    textTransform: "none",
    fontWeight: "bold",
    fontSize: 17,
    backgroundColor: "#FCBF49",
    "&:hover": {
      backgroundColor: "#FFBC3B",
    },
    borderRadius: 30,
    color: "white",
  },
}));
export default function LandingPage() {
  const classes = UseStyles();
  return (
    <div className={classes.main}>
      <img className={classes.im} draggable={false} src={Cover} />
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
        justify={"center"}
        className={classes.mainGrid}
        spacing={1}
      >
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.text} variant={"h4"}>
            <b>
              <span className={classes.whiteText}>
                Store all your files in the cloud
              </span>
            </b>
          </Typography>
        </Grid>
        <Grid item xs={11} md={9}>
          <img
            className={classes.ScreenShot}
            src={ScreenShot}
            alt={"Home Screen Image"}
            draggable={"false"}
          />
        </Grid>
      </Grid>
    </div>
  );
}
