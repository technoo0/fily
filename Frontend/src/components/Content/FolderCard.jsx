import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import {
  CardActionArea,
  CardMedia,
  Grid,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    borderRadius: 25,
    boxShadow: "0px 0px 20px rgba(0,0,0,0.25)",
  },
  media: {
    borderColor: "#CDA1A1",
    borderWidth: 2,
    border: "solid",
    height: 200,
    width: "92%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    borderRadius: 25,
  },
  Ficon: {
    marginRight: 10,
  },
  title: {
    // marginLeft: 30,
    // marginTop: 5,
    // paddingBottom: 22,
    // paddingTop: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default function FolderCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <CardContent>
          <Grid container direction="row">
            <FolderIcon className={classes.Ficon} />
            <Typography className={classes.title} color="primary" variant="h6">
              Myfolder
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
