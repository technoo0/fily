import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card";
import CardSkeleton from "./Skeleton/Card";
import useStore from "../../store";
const useStyles = makeStyles((theme) => ({}));
export default function MainContent({ CardsNumber, recently }) {
  const classes = useStyles();
  const recentlyLogging = useStore((state) => state.recentlyLogging);
  const fileLogging = useStore((state) => state.fileLogging);

  return (
    <Grid
      className={classes.mainpaper}
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={2}
    >
      {recently
        ? recentlyLogging
          ? [...Array(4)].map((index) => (
              <Grid key={index} item>
                <CardSkeleton />
              </Grid>
            ))
          : CardsNumber.map((itemdata, index) => (
              <Grid key={index} item>
                <Card data={itemdata}></Card>
              </Grid>
            ))
        : fileLogging
        ? [...Array(5)].map((index) => (
            <Grid key={index} item>
              <CardSkeleton />
            </Grid>
          ))
        : CardsNumber.map((itemdata, index) => (
            <Grid key={index} item>
              <Card data={itemdata}></Card>
            </Grid>
          ))}
    </Grid>
  );
}
