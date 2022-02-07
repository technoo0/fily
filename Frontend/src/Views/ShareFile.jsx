/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Grid, Paper, Button, Typography } from "@material-ui/core";
import moment from "moment";
import { Link, useParams } from "react-router-dom";

import { GetFileData } from "../utils/linkops";

import { makeStyles } from "@material-ui/core/styles";
import Logo from "../images/Logo.svg";
import info from "../utils/info";
import { useState } from "react";

const UseStyles = makeStyles((theme) => ({
  griditem: {
    marginBottom: 15,
  },
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
  const [FileData, SetFileData] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    GetFileData(id).then((file) => {
      console.log(file);
      SetFileData(file);
    });
  }, []);
  const DownloadFile = () => {
    window.location.href = info.BackendUrl + "/ShareLink/DownloadFile/" + id;
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

            <Grid className={classes.griditem} item xs={8}>
              <Typography>
                <b>File Name</b> : {FileData.name}
              </Typography>
            </Grid>
            <Grid className={classes.griditem} item xs={8}>
              <Typography>
                <b>File Size</b> :{" "}
                {(Number(FileData.size) / 1048576).toFixed(2)} MB
              </Typography>
            </Grid>
            <Grid className={classes.griditem} item xs={8}>
              <Typography>
                <b>Created</b> :{" "}
                {moment(FileData.createdAt).format("D MMMM YYYY")}
              </Typography>
            </Grid>

            <Grid className={classes.griditem} item xs={8}>
              <Typography>
                <b>Last Modified</b> :{" "}
                {moment(FileData.updatedAt).format("D MMMM YYYY")}
              </Typography>
            </Grid>

            <Grid className={classes.griditem} item xs={5}>
              <Button
                color="secondary"
                size="large"
                fullWidth
                onClick={DownloadFile}
                className={classes.button3}
                variant="contained"
              >
                {"Download"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
