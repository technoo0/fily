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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import Home from "./Views/Home";
import Login from "./Views/Auth/Login";
import SignIn from "./Views/Auth/SignIn";
import ForgetPass from "./Views/Auth/ForgetPass";
import ResetPass from "./Views/Auth/ResetPass";
import Protect from "./Views/Protect";
import FolderPage from "./Views/Folder";
import ShareFile from "./Views/ShareFile";
import Test from "./Views/testing.jsx";
import SnackbarAlert from "./components/FileMuneDiloge/SnakBarAlearts.jsx";
import axios from "./Axios";
import useStore from "./store";
import moment from "moment";
export default function App() {
  const History = useHistory();
  useEffect(() => {
    console.log("checking auth");
    axios
      .get("/", { withCredentials: true })
      .then((res) => {
        console.log(res.data.user);

        useStore.setState({ loggedin: "OK" });
        // History.push("/u/");
        useStore.setState({
          UserData: {
            Name: res.data.user.Name,
            Email: res.data.user.email,
            Startigy: res.data.user.strategy,
            usage: res.data.user.usage,
            JoinData: moment(res.data.user.createdAt).format("Do MMMM YYYY"),
          },
        });
      })
      .catch((err) => {
        useStore.setState({ loggedin: "NO" });
        // History.push("/Login");
        if (window.location.pathname.includes("/u/")) {
          window.location.href = "https://www.fily.tech/Login";
        } else {
          console.log("lol no");
        }
        window.console.log(err);
      });
  }, []);
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Protect />
          </Route>

          <Route path="/u">
            <Home />
          </Route>
          <Route path="/Test">
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
          <Route path="/sharelink/:id">
            <ShareFile />
          </Route>
        </Switch>
      </Router>
      <SnackbarAlert />
    </div>
  );
}
