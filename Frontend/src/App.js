// import MyAppBar from "./components/AppBar";
// import HomePage from "./components/Content/homePage";
// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import SideBar from "./components/SideBar";
// import Toolbar from "@material-ui/core/Toolbar";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));

// export default function ClippedDrawer() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <MyAppBar />
//       <SideBar />
//       <main className={classes.content}>
//         <Toolbar />
//         <HomePage />
//       </main>
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Views/Home";
import Login from "./Views/Auth/Login";
import SignIn from "./Views/Auth/SignIn";
import ForgetPass from "./Views/Auth/ForgetPass";
import ResetPass from "./Views/Auth/ResetPass";
import Protect from "./Views/Protect";
import Test from "./Views/testing.jsx";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Protect />
        </Route>
        <Route exact path="/Test">
          <Test />
        </Route>

        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/SignIn">
          <SignIn />
        </Route>
        <Route path="/ForgetPassword">
          <ForgetPass />
        </Route>
        <Route path="/ResetPassword/:id/:token">
          <ResetPass />
        </Route>
      </Switch>
    </Router>
  );
}
