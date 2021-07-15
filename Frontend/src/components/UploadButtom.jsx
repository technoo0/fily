import React from "react";
//import "./Upload.css";
import logo from "../images/upload.svg";
import { Button } from "@material-ui/core";
export default function UploadButtom() {
  return (
    <Button
      className="upladbuttom"
      startIcon={
        <img className="upladbuttomlogo" src={logo} alt="upload logo" />
      }
    >
      Upload
    </Button>
  );
}
