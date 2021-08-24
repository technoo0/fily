import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import useStore from "../../store";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const alertOpen = useStore((state) => state.alertOpen);
  const alertType = useStore((state) => state.alertType);
  const alertMsg = useStore((state) => state.alertMsg);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    useStore.setState({
      alertOpen: false,
    });
  };

  return (
    <div className={classes.root}>
      <Snackbar open={alertOpen} autoHideDuration={5000} onClose={handleClose}>
        {alertType == "error" ? (
          <Alert onClose={handleClose} severity="error">
            {alertMsg}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            {alertMsg}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
