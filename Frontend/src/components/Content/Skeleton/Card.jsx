import React from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Skeleton from "@material-ui/lab/Skeleton";
const useStyles = makeStyles((theme) => ({
  media: {
    height: 161,
    width: "91%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    borderRadius: 23,
  },
  root: {
    width: 200,
    borderRadius: 23,
    boxShadow: "0px 0px 20px rgba(0,0,0,0.25)",
  },
}));

export default function CardSkeleton() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Skeleton className={classes.media} animation="wave" variant="rect" />

      <CardContent>
        <React.Fragment>
          <Skeleton animation="wave" height={13} width="95%" />
        </React.Fragment>
      </CardContent>
    </Card>
  );
}
