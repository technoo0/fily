/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import LangingPage from "./LandingPage";

import { useHistory } from "react-router-dom";
// var ff = "NA";
import useStore from "../store";
export default function Protect() {
  const History = useHistory();
  const AuthState = useStore((state) => state.loggedin);
  useEffect(() => {
    if (AuthState == "OK") {
      History.push("/u/");
    }
  }, [AuthState]);

  if (AuthState == "wait") {
    return <div></div>;
  } else if (AuthState == "OK") {
    return <div></div>;
  } else if (AuthState == "NO") {
    return <LangingPage />;
  } else {
    return <div></div>;
  }
}
