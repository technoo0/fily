import MyAppBar from "../components/AppBar";
import HomePage from "../components/Content/homePage";
import React from "react";
import FolderPage from "../components/Content/FolderPage";
import { makeStyles } from "@material-ui/core/styles";
import SideBar from "../components/SideBar";
import Favorite from "../Views/Favorite";
import Search from "../Views/Search";
import Toolbar from "@material-ui/core/Toolbar";
import UploadingStatus from "../components/UploadingStatus";
import { Switch, Route, useRouteMatch } from "react-router-dom";
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
  let { path } = useRouteMatch();
  return (
    <div className={classes.root}>
      <MyAppBar />
      <SideBar />
      <main className={classes.content}>
        <Toolbar />
        <Switch>
          <Route exact path={path}>
            <HomePage />
          </Route>

          <Route path={`${path}/folder/:id`}>
            <FolderPage />
          </Route>
          <Route path={`${path}/Favorite`}>
            <Favorite />
          </Route>
          <Route path={`${path}/search`}>
            <Search />
          </Route>
        </Switch>
      </main>
      <UploadingStatus />
    </div>
  );
}
