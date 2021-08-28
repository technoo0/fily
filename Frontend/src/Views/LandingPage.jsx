import React from "react";
import Cover from "../images/LangingPage.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Typography, Link } from "@material-ui/core";
import ScreenShot from "../images/Capture.JPG";
import ScreenShot1 from "../images/Screenshot1.png";
import ScreenShot2 from "../images/Screenshot2.png";
import ScreenShot3 from "../images/Screenshot3.png";
import ScreenShot4 from "../images/Screenshot4.png";
import ScreenShot5 from "../images/Screenshot5.png";
import ScreenShot6 from "../images/Screenshot6.png";
import ScreenShot7 from "../images/Screenshot7.png";
import ScreenShot8 from "../images/Screenshot8.png";
import ScreenShot9 from "../images/Screenshot9.png";
import Header from "../components/LandingPage/Header";
import { Email } from "@material-ui/icons";
const UseStyles = makeStyles((theme) => ({
  whiteText: {
    color: "#ffffff",
  },
  blackText: {
    color: "#000000",
  },
  ScreenShot: {
    width: "100%",
    borderRadius: 20,
    marginBottom: 35,
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
  footer: {
    width: "100vw",
    borderRadius: 0,
    marginBottom: 0,
    height: 90,
    padding: 10,
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
            src={ScreenShot4}
            alt={"Home Screen Image"}
            draggable={"false"}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.text} variant={"h4"}>
            <b>
              <span className={classes.blackText}>and privew them</span>
            </b>
          </Typography>
        </Grid>
        <Grid item xs={11} md={9}>
          <img
            className={classes.ScreenShot}
            src={ScreenShot1}
            alt={"Home Screen Image"}
            draggable={"false"}
          />
        </Grid>
        <Grid item xs={11} md={9}>
          <img
            className={classes.ScreenShot}
            src={ScreenShot2}
            alt={"Home Screen Image"}
            draggable={"false"}
          />
        </Grid>
        <Grid item xs={11} md={9}>
          <img
            className={classes.ScreenShot}
            src={ScreenShot3}
            alt={"Home Screen Image"}
            draggable={"false"}
          />
        </Grid>
        <Grid item xs={11} md={9}>
          <img
            className={classes.ScreenShot}
            src={ScreenShot5}
            alt={"Home Screen Image"}
            draggable={"false"}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.text} variant={"h4"}>
            <b>
              <span className={classes.blackText}>
                Rename ,Move,Copy and Share
              </span>
            </b>
          </Typography>
        </Grid>
        <Grid item xs={11} md={9}>
          <img
            className={classes.ScreenShot}
            src={ScreenShot7}
            alt={"Home Screen Image"}
            draggable={"false"}
          />
        </Grid>
        <Grid item xs={11} md={9}>
          <img
            className={classes.ScreenShot}
            src={ScreenShot8}
            alt={"Home Screen Image"}
            draggable={"false"}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.footer}>
            <Grid
              container
              direction={"row"}
              alignItems={"center"}
              justify={"center"}
            >
              <Grid
                item
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
                spacing={1}
              >
                <Grid item>
                  <Typography>Made by Marwan Fouda</Typography>
                </Grid>

                <Grid
                  item
                  container
                  direction={"row"}
                  alignItems={"center"}
                  justify={"center"}
                  spacing={2}
                >
                  <Grid item>
                    <Link href="https://github.com/technoo0">
                      <Typography>GitHub</Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="https://www.linkedin.com/in/marwan-fouda-6818a51aa">
                      <Typography>LinkedIn</Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="https://www.facebook.com/marawan.fouda.9/">
                      <Typography>Facebook</Typography>
                    </Link>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography>
                    <b>Email : </b> marwanmf2050@gmail.com
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
