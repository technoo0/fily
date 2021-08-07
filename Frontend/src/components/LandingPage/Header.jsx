import { Button, Grid } from "@material-ui/core";
import React from "react";
import Logo from "../../images/HomeLogo.svg";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
const UseStyles = makeStyles((theme) => ({
  ssgrid: {
    marginRight: 10,
  },
  mainGrid: {
    width: "100vw",
  },
  button3: {
    width: "100%",
    height: 30,
    marginTop: 10,
    textTransform: "none",
    fontWeight: "bold",
    fontSize: 15,

    backgroundColor: "#FCBF49",
    "&:hover": {
      backgroundColor: "#FFBC3B",
    },
    borderRadius: 30,
    color: "white",
  },
}));
export default function Header() {
  const classes = UseStyles();
  const History = useHistory();
  const Login = () => {
    History.push("/Login");
  };
  const SignUp = () => {
    History.push("/SignIn");
  };
  return (
    <Grid
      container
      className={classes.mainGrid}
      direction={"column"}
      justify={"space-between"}
      alignContent={"center"}
      spacing={1}
    >
      <Grid
        item
        xs={12}
        className={classes.ssgrid}
        spacing={2}
        container
        direction={"row"}
        justify={"flex-end"}
      >
        <Grid item xs={4} sm={3} md={2} lg={1} xl={1}>
          <Button
            onClick={Login}
            variant="contained"
            className={classes.button3}
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={4} sm={3} md={2} lg={1} xl={1}>
          <Button
            onClick={SignUp}
            variant="contained"
            className={classes.button3}
          >
            Sign up
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={10} sm={8} md={7} lg={4} xl={3}>
        <img draggable={false} width={"100%"} src={Logo} />
      </Grid>
    </Grid>
  );
}
