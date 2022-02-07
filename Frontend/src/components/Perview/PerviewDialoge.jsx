/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";

import { Grid, IconButton, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import VideoJS from "./VideoJS";
import axios from "../../Axios";
import { CodeBlock } from "react-code-blocks";
import Pdfview from "./Pdfview";
import GetAppIcon from "@material-ui/icons/GetApp";
import ReactAudioPlayer from "react-audio-player";
import info from "../../utils/info";
export default function PerviewDialoge({
  open,
  handleClose,
  id,
  type,
  fileName,
}) {
  const [textState, settextState] = useState("");
  const readText = async () => {
    const res = await axios.get(`${info.BackendUrl}/ops/Downloadmyfile/${id}`, {
      withCredentials: true,
      responseType: "blob",
    });
    console.log(res.data);

    let metadata = {
      type: type,
    };
    let file = new File([res.data], "test.txt", metadata);
    var fr = new FileReader();
    fr.onload = function () {
      console.log(fr.result);
      settextState(fr.result);
    };

    await fr.readAsText(file);
  };
  const [pdfurlState, setpdfurlState] = useState("");
  const readpdf = async () => {
    const res = await axios.get(`${info.BackendUrl}/ops/Downloadmyfile/${id}`, {
      withCredentials: true,
      responseType: "blob",
    });
    // console.log(res.data);

    var blobUrl = URL.createObjectURL(res.data);
    setpdfurlState(blobUrl);
  };

  useEffect(() => {
    if (open) {
      if (type.includes("text")) {
        readText();
      }
      if (type.includes("pdf")) {
        readpdf();
      }
    }
  }, [open]);
  const Downloadfile = () => {
    window.open(`${info.BackendUrl}/ops/Downloadmyfile/${id}`);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const videoJsOptions = {
    // lookup the options in the docs for more options

    autoplay: false,
    controls: true,
    responsive: true,

    fluid: true,

    sources: [
      {
        src: `${info.BackendUrl}/ops/Downloadmyfile/${id}`,
        type: "video/mp4",
      },
    ],
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogContent style={{ padding: 0 }}>
          <Grid
            container
            style={{ width: "100%" }}
            alignItems="center"
            justify={"center"}
          >
            <Grid
              item
              style={{ backgroundColor: "#ccc" }}
              xs={12}
              container
              direction="row-reverse"
              alignItems={"center"}
            >
              <Grid item>
                <IconButton onClick={handleClose}>
                  <ClearIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={Downloadfile}>
                  <GetAppIcon />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <Typography>{fileName}</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction={"row"}
              alignItems={"center"}
              justify={"center"}
              style={{ height: "90vh" }}
            >
              {type.includes("image") ? (
                <Grid item>
                  <img
                    alt="file type"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                    src={`${info.BackendUrl}/ops/Downloadmyfile/${id}`}
                  ></img>
                </Grid>
              ) : (
                ""
              )}

              {type.includes("video") ? (
                <Grid item xs={9}>
                  <VideoJS options={videoJsOptions}></VideoJS>
                </Grid>
              ) : (
                ""
              )}

              {type.includes("text") ? (
                <Grid item xs={11}>
                  <CodeBlock
                    text={textState}
                    showLineNumbers={false}
                    wrapLines
                  />
                </Grid>
              ) : (
                ""
              )}

              {type.includes("pdf") ? (
                <Grid item xs={12}>
                  {" "}
                  <Pdfview link={pdfurlState} />{" "}
                </Grid>
              ) : (
                ""
              )}

              {type.includes("audio") ? (
                <Grid item>
                  <ReactAudioPlayer
                    style={{ width: 400 }}
                    src={`${info.BackendUrl}/ops/Downloadmyfile/${id}`}
                    controls
                  />
                </Grid>
              ) : (
                ""
              )}

              {!type.includes("audio") &&
              !type.includes("pdf") &&
              !type.includes("text") &&
              !type.includes("video") &&
              !type.includes("image") ? (
                <Grid item>
                  <Typography>Sorry , we can't preview this formate</Typography>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
