import React from "react";
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
import Toolbar from "@material-ui/core/Toolbar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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
  buttonoutline: {
    height: 60,
    width: 160,
    marginLeft: 18,
    borderRadius: 50,
    boxShadow: "0px 0px 10px rgba(0,0,0,0.25)",
    fontWeight: "bold",
    fontSize: 20,
    borderWidth: 2,
    color: "#003049",
    "&:hover": {
      borderWidth: 2,
    },

    textTransform: "none",

    fontFamily: ["Titillium Web", "Roboto"].join(","),
  },
  ButtomLogo: {
    width: 40,
  },
  listicon: {
    minWidth: 30,
  },
}));
export default function SideBar() {
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
            {/* <UploadButtom /> */}
            <Button
              size="large"
              variant="outlined"
              className={classes.button}
              color="secondary"
              startIcon={
                <img
                  className={classes.ButtomLogo}
                  src={logo}
                  alt="upload logo"
                />
              }
              classes={{
                outlined: classes.buttonoutline,
              }}
            >
              Upload
            </Button>
          </ListItem>

          <ListItem button>
            <ListItemIcon className={classes.listicon}>
              <FavoriteIcon color="primary" />
            </ListItemIcon>
            <ListItemText>Favorite</ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon className={classes.listicon}>
              <DeleteIcon color="primary" />
            </ListItemIcon>
            <ListItemText>Bin</ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon className={classes.listicon}>
              <AccountCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText>Porfile</ListItemText>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
