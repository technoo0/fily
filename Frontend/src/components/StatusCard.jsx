import React from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  CircularProgress,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles((theme) => ({
  cardbody: {
    height: 50,
    width: "100%",
  },
  gird: {
    height: "100%",
    width: "100%",
  },
}));

function CircularProgressWithLabel(props) {
  return (
    <Box style={{ marginTop: 5 }} position="relative" display="inline-flex">
      <CircularProgress
        thickness={5}
        style={{ color: "#FCBF49" }}
        variant="determinate"
        {...props}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function StatusCard(props) {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.cardbody}>
      <Grid
        className={classes.gird}
        container
        direction={"row"}
        justify={"space-between"}
        alignItems={"center"}
      >
        <Grid
          style={{ marginLeft: 9 }}
          item
          xs={8}
          container
          direction={"row"}
          alignItems={"center"}
          spacing={1}
        >
          <Grid item={2}>
            <InsertDriveFileIcon style={{ color: "#003049" }} />
          </Grid>
          <Grid item xs={9}>
            <Typography>{props.name}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={3} container alignItems={"center"} direction={"row"}>
          <Grid item xs={6}>
            {props.status == "active" ? (
              <CircularProgressWithLabel value={props.value} />
            ) : props.status == "canceled" ? (
              <Typography>Canceled</Typography>
            ) : (
              <Typography>done</Typography>
            )}
          </Grid>
          <Grid item xs={3}>
            <IconButton onClick={() => props.cancel.cancel()}>
              <CancelIcon style={{ color: "#003049" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
