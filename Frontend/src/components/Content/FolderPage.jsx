import {
  Grid,
  Typography,
  Toolbar,
  Divider,
  Button,
  Icon,
  IconButton,
  Paper,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getFiles, getFolders, getFolderData } from "../../utils/getData";
import MainContent from "./MainContent";
import FoldersArray from "./FoldersArray";
import useStore from "../../store";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, useHistory, useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  mainpaper: {
    width: "87%",
  },
  title: {
    marginBottom: 15,
    fontWeight: "bold",
  },
}));
export default function HomePage() {
  const classes = useStyles();
  const { id } = useParams();
  const CurrentName = useStore((state) => state.CurrentName);
  const ChangeName = useStore((state) => state.ChangeName);
  const History = useHistory();
  //   const add = () => {
  //     AddName("ACACACC");
  //   };
  //   const Readd = () => {
  //     DeletLastName();
  //   };
  const [Files, SetFiles] = useState([]);
  const [Folders, SetFolders] = useState([]);
  const Refreshme = () => {
    getFiles(id)
      .then((files) => {
        SetFiles(files);
      })
      .catch((e) => {
        console.log(e);
      });
    getFolders(id)
      .then((files) => {
        SetFolders(files);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    useStore.setState({
      CurrentFolderID: id,
      refreshCurrent: Refreshme,
    });
    // console.log("Curent Folder", id);
    if (CurrentName == "") {
      //   console.log("ohoh");

      getFolderData(id).then((data) => {
        ChangeName(data.name);
      });
    }
    getFiles(id)
      .then((files) => {
        SetFiles(files);
      })
      .catch((e) => {
        console.log(e);
      });
    getFolders(id)
      .then((files) => {
        SetFolders(files);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);
  const GoBack = () => {
    History.goBack();
  };

  //   const MainFiles = useStore((state) => state.MianFiles);
  //   const MianFolders = useStore((state) => state.MianFolders);
  //   const recentlyadded = useStore((state) => state.recentlyadded);

  return (
    <Grid className={classes.mainpaper} container direction="column">
      <Grid item>
        <Paper>
          <Grid container direction={"row"} spacing={1} alignItems={"center"}>
            <Grid item>
              <IconButton onClick={GoBack}>
                <ArrowBackIosIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant={"h6"}>/ {CurrentName}</Typography>
            </Grid>
          </Grid>
          <Divider></Divider>
        </Paper>
      </Grid>

      <Grid item style={{ marginTop: 15 }}>
        <Typography className={classes.title} variant={"h5"}>
          Folders
        </Typography>
      </Grid>
      <Grid item>
        <FoldersArray CardsNumber={Folders} />
      </Grid>
      <Toolbar />

      <Grid item>
        <Typography className={classes.title} variant={"h5"}>
          Files
        </Typography>
      </Grid>
      <Grid item>
        <MainContent CardsNumber={Files} />
      </Grid>
    </Grid>
  );
}
