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
      {[...Array(CardsNumber)].map((_, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FolderCard />
        </Grid>
      ))}
    </Grid>
  );
}
