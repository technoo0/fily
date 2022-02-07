import { Grid, Typography, Toolbar } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getFavoriteFolderdata, RefresFav } from "../utils/getData";
import MainContent from "../components/Content/MainContent";
import FoldersArray from "../components/Content/FoldersArray";
import useStore from "../store";

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

  //   const add = () => {
  //     AddName("ACACACC");
  //   };
  //   const Readd = () => {
  //     DeletLastName();
  //   };

  const Refreshme = () => {
    RefresFav();
  };
  const MainFiles = useStore((state) => state.FavoriteFiles);
  const MianFolders = useStore((state) => state.FavoriteFolders);
  useEffect(() => {
    useStore.setState({
      refreshCurrent: Refreshme,
    });
    // console.log("Curent Folder", id);
    getFavoriteFolderdata();
  }, []);

  //   const MainFiles = useStore((state) => state.MianFiles);
  //   const MianFolders = useStore((state) => state.MianFolders);
  //   const recentlyadded = useStore((state) => state.recentlyadded);

  return (
    <Grid className={classes.mainpaper} container direction="column">
      <Grid item style={{ marginTop: 15 }}>
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
