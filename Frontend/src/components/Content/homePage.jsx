import { Grid, Typography, Toolbar } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import MainContent from "./MainContent";
import FoldersArray from "./FoldersArray";
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
  return (
    <Grid className={classes.mainpaper} container direction="column">
      <Grid item>
        <Typography className={classes.title} variant={"h5"}>
          Recently added
        </Typography>
      </Grid>
      <Grid item>
        <MainContent CardsNumber={6} />
      </Grid>
      <Toolbar />

      <Grid item>
        <Typography className={classes.title} variant={"h5"}>
          Folders
        </Typography>
      </Grid>
      <Grid item>
        <FoldersArray CardsNumber={6} />
      </Grid>
      <Toolbar />

      <Grid item>
        <Typography className={classes.title} variant={"h5"}>
          Files
        </Typography>
      </Grid>
      <Grid item>
        <MainContent CardsNumber={12} />
      </Grid>
    </Grid>
  );
}
