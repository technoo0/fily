import {
  Grid,
  Typography,
  Toolbar,
  Divider,
  IconButton,
  Paper,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory, useLocation } from "react-router-dom";

import MainContent from "../components/Content/MainContent";
import FoldersArray from "../components/Content/FoldersArray";
import useStore from "../store";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import axiosInstance from "../Axios";

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
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("q");
  const classes = useStyles();
  const History = useHistory();
  //d

  const [Files, SetFiles] = useState([]);
  const [Folders, SetFolders] = useState([]);

  const GetData = async () => {
    try {
      const res = await axiosInstance.get(`/get/search?q=${query}`, {
        withCredentials: true,
      });

      const { files, folders } = await res.data;
      SetFiles(files);
      SetFolders(folders);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    GetData();
    useStore.setState({
      refreshCurrent: GetData,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const GoBack = () => {
    History.goBack();
  };

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
              <Typography variant={"h6"}>Search for {query}</Typography>
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
