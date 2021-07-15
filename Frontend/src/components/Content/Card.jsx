import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardMedia, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    borderRadius: 23,
    boxShadow: "0px 0px 20px rgba(0,0,0,0.25)",
  },
  media: {
    // borderColor: "#CDA1A1",
    // borderWidth: 2,
    // border: "solid",
    height: 161,
    width: "91%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    borderRadius: 23,
  },

  title: {
    marginLeft: 30,
    paddingBottom: 22,
    paddingTop: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default function OutlinedCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />

        <Typography className={classes.title} color="primary" variant="h6">
          adjective.mp4
        </Typography>
      </CardActionArea>
    </Card>
  );
}
