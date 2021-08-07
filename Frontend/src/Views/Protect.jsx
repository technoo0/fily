import React, { useEffect, useState } from "react";
import LangingPage from "./LandingPage";
import Home from "./Home";
import axios from "../Axios";
import moment from "moment";
// var ff = "NA";
import useStore from "../store";
export default function Protect() {
  const [ff, setff] = useState("NA");
  useEffect(() => {
    axios
      .get("/", { withCredentials: true })
      .then((res) => {
        console.log(res.data.user);

        setff("OK");
        useStore.setState({
          UserData: {
            Name: res.data.user.Name,
            Email: res.data.user.email,
            Startigy: res.data.user.strategy,
            JoinData: moment(res.data.user.createdAt).format("Do MMMM YYYY"),
          },
        });
      })
      .catch((err) => {
        setff("NO");
        console.log(err);
      });
  }, []);

  if (ff == "NA") {
    return <div></div>;
  } else if (ff == "OK") {
    return <Home />;
  } else if (ff == "NO") {
    return <LangingPage />;
  }
}
