import React from "react";
import { AppBar, Grid, TextField } from "@material-ui/core";
import Logo from "../images/FilyLogo.svg";
import { makeStyles } from "@material-ui/core";
import SearchBar from "./Content/SearchBar";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: 70,
  },
  GridItem: {
    margin: 0,
    padding: 0,
  },
  mainlogo: {
    height: 70,
  },
}));
export default function MyAppBar() {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={1}>
          <Link to="/">
            <img className={classes.mainlogo} src={Logo} alt="Fily Logo" />
          </Link>
        </Grid>
        <Grid item xs={9}>
          <SearchBar />
        </Grid>
      </Grid>
    </AppBar>
  );
}
