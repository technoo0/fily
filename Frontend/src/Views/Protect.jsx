import React, { useEffect, useState } from "react";
import LangingPage from "./LandingPage";
import Home from "./Home";
import axios from "../Axios";
import moment from "moment";
import { useHistory } from "react-router-dom";
// var ff = "NA";
import useStore from "../store";
export default function Protect() {
  const [ff, setff] = useState("NA");
  const History = useHistory();
  const AuthState = useStore((state) => state.loggedin);
  useEffect(() => {
    if (AuthState == "OK") {
      History.push("/u/");
    }
    // axios
    //   .get("/", { withCredentials: true })
    //   .then((res) => {
    //     console.log(res.data.user);
    //     setff("OK");
    //     History.push("/u/");
    //     useStore.setState({
    //       UserData: {
    //         Name: res.data.user.Name,
    //         Email: res.data.user.email,
    //         Startigy: res.data.user.strategy,
    //         usage: res.data.user.usage,
    //         JoinData: moment(res.data.user.createdAt).format("Do MMMM YYYY"),
    //       },
    //     });
    //   })
    //   .catch((err) => {
    //     setff("NO");
    //     console.log(err);
    //   });
  }, [AuthState]);

  if (AuthState == "wait") {
    return <div></div>;
  } else if (ff == "OK") {
    return <div></div>;
  } else if (ff == "NO") {
    return <LangingPage />;
  } else {
    return <div></div>;
  }
}
