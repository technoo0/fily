import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
  },
}));

export default function TransitionAlerts(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div {...props}>
      <div className={classes.root}>
        <Collapse in={props.showAlert}>
          <Alert
            variant="filled"
            severity={props.type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  props.setshowAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {props.massage}
          </Alert>
        </Collapse>
      </div>
    </div>
  );
}
