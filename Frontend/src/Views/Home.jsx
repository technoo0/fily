import MyAppBar from "../components/AppBar";
import HomePage from "../components/Content/homePage";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SideBar from "../components/SideBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MyAppBar />
      <SideBar />
      <main className={classes.content}>
        <Toolbar />
        <HomePage />
      </main>
    </div>
  );
}
