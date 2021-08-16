import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FolderCard from "./FolderCard";
const useStyles = makeStyles((theme) => ({
  mainpaper: {
    // marginLeft: 170,
    // marginTop: 60,
    // [theme.breakpoints.up("xs")]: {
    //   maxWidth: "65%",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   maxWidth: "70%",
    // },
    // [theme.breakpoints.up("md")]: {
    //   maxWidth: "80%",
    // },
    // [theme.breakpoints.up("lg")]: {
    //   maxWidth: "85%",
    // },
  },
}));
export default function MainContent({ CardsNumber }) {
  const classes = useStyles();
  return (
    <Grid
      className={classes.mainpaper}
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={2}
    >
      {CardsNumber.map((Folder, index) => (
        <Grid key={index} item>
          <FolderCard data={Folder} />
        </Grid>
      ))}
    </Grid>
  );
}
