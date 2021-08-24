import { Grid, Typography, Toolbar } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  getMainFolderdata,
  getrecentFiles,
  RefreshHome,
} from "../../utils/getData";
import MainContent from "./MainContent";
import FoldersArray from "./FoldersArray";
import useStore from "../../store";
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
  const Refreshme = () => {
    RefreshHome();
  };
  useEffect(() => {
    useStore.setState({
      refreshCurrent: Refreshme,
    });
    getMainFolderdata();
    getrecentFiles();
  }, []);

  const MainFiles = useStore((state) => state.MianFiles);
  const MianFolders = useStore((state) => state.MianFolders);
  const recentlyadded = useStore((state) => state.recentlyadded);

  return (
    <Grid className={classes.mainpaper} container direction="column">
      <Grid item>
        <Typography className={classes.title} variant={"h5"}>
          Recently added
        </Typography>
      </Grid>
      <Grid item>
        <MainContent recently={true} CardsNumber={recentlyadded} />
      </Grid>
      <Toolbar />

      <Grid item>
        <Typography className={classes.title} variant={"h5"}>
          Folders
        </Typography>
      </Grid>
      <Grid item>
        <FoldersArray CardsNumber={MianFolders} />
      </Grid>
      <Toolbar />

      <Grid item>
        <Typography className={classes.title} variant={"h5"}>
          Files
        </Typography>
      </Grid>
      <Grid item>
        <MainContent CardsNumber={MainFiles} />
      </Grid>
    </Grid>
  );
}
