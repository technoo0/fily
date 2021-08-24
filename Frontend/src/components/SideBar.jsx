import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@material-ui/core";
//import "./Upload.css";
import { makeStyles } from "@material-ui/core";
import logo from "../images/upload.svg";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import Profile from "./ProfilePage";
import AddFolder from "./AddFolder";
import Toolbar from "@material-ui/core/Toolbar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import UploadButtom from "./UploadButtom";
import { useHistory } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  paperdrawer: {
    marginTop: 55,
    width: 250,
  },

  listicon: {
    minWidth: 30,
  },
}));
export default function SideBar() {
  const [open, setopen] = useState(false);
  const [Folderopen, setFolderopen] = useState(false);

  const History = useHistory();

  const Favorite = () => {
    History.push("/u/Favorite");
  };
  const GoToHome = () => {
    History.push("/u/");
  };

  const profile = () => {
    setopen(true);
  };
  const CloseProfile = () => {
    setopen(false);
  };

  const CreateFolder = () => {
    setFolderopen(true);
  };
  const CloseFolder = () => {
    setFolderopen(false);
  };
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem>
            <UploadButtom />
          </ListItem>

          <ListItem button onClick={GoToHome}>
            <ListItemIcon className={classes.listicon}>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem button onClick={CreateFolder}>
            <ListItemIcon className={classes.listicon}>
              <CreateNewFolderIcon color="primary" />
            </ListItemIcon>
            <ListItemText>Create Folder</ListItemText>
          </ListItem>

          <ListItem button onClick={Favorite}>
            <ListItemIcon className={classes.listicon}>
              <FavoriteIcon color="primary" />
            </ListItemIcon>
            <ListItemText>Favorite</ListItemText>
          </ListItem>

          {/* <ListItem button>
            <ListItemIcon className={classes.listicon}>
              <DeleteIcon color="primary" />
            </ListItemIcon>
            <ListItemText>Bin</ListItemText>
          </ListItem> */}

          <ListItem button onClick={profile}>
            <ListItemIcon className={classes.listicon}>
              <AccountCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText>Porfile</ListItemText>
          </ListItem>
        </List>
      </div>
      <Profile open={open} CloseProfile={CloseProfile} />
      <AddFolder open={Folderopen} CloseProfile={CloseFolder} />
    </Drawer>
  );
}
