import React, { useState, useRef } from "react";
//import "./Upload.css";
import logo from "../images/upload.svg";
import { Button, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import axios from "../Axios";
import axioslib from "axios";
import useStore from "../store";
const trimName = (name) => {
  if (name.length > 25) {
    return name.slice(0, 21) + "....";
  } else {
    return name;
  }
};
const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  buttonoutline: {
    height: 60,
    width: 160,
    marginLeft: 18,
    borderRadius: 50,
    boxShadow: "0px 0px 10px rgba(0,0,0,0.25)",
    fontWeight: "bold",
    fontSize: 20,
    borderWidth: 2,
    color: "#003049",
    "&:hover": {
      borderWidth: 2,
    },

    textTransform: "none",

    fontFamily: ["Titillium Web", "Roboto"].join(","),
  },
  ButtomLogo: {
    width: 40,
  },
}));

export default function UploadButtom() {
  const classes = useStyles();

  const FilePicker = useRef();
  const [FilePath, setFilePath] = useState([]);
  const fileChange = () => {
    console.log(FilePicker.current.files);
    setFilePath(FilePicker.current.files);

    uploadf(FilePicker.current.files);
  };
  const uploadf = (Files) => {
    const FilesArray = [...Files];
    if (FilesArray.length > 0) {
      useStore.setState({ UploadingStatus: true });
      FilesArray.forEach((file) => {
        const currentPlace = useStore.getState().UploadingProsses.length;
        console.log("current Place", currentPlace);
        const CancelToken = axioslib.CancelToken;
        const source = CancelToken.source();
        useStore.setState((state) => ({
          UploadingProsses: [
            ...state.UploadingProsses,
            {
              name: trimName(file.name),
              value: 0,
              source: source,
              status: "active",
            },
          ],
          activeUploads: state.activeUploads + 1,
        }));
        let formData = new FormData();
        formData.append("file", file);
        const refreshCurrent = useStore.getState().refreshCurrent;
        const currentFolder = useStore.getState().CurrentFolderID;
        formData.append("FolderId", currentFolder);
        formData.append("acsses", "private");
        axios
          .post("/upload/file", formData, {
            withCredentials: true,
            cancelToken: source.token,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (data) => {
              //Set the progress value to show the progress bar
              useStore.setState((state) => {
                var newstate = state.UploadingProsses.slice();
                newstate[currentPlace].value = Math.round(
                  (100 * data.loaded) / data.total
                );
                return { UploadingProsses: newstate };
              });
              console.log(
                file.name,
                Math.round((100 * data.loaded) / data.total)
              );
            },
          })
          .then((res) => {
            refreshCurrent();
            useStore.setState((state) => {
              var newstate = state.UploadingProsses.slice();
              newstate[currentPlace].status = "done";
              return {
                UploadingProsses: newstate,
                activeUploads: state.activeUploads - 1,
              };
            });

            console.log(res.data);
          })
          .catch((err) => {
            console.log("errrrrr", err);
            if (axioslib.isCancel(err)) {
              useStore.setState((state) => {
                var newstate = state.UploadingProsses.slice();
                newstate[currentPlace].status = "canceled";
                return {
                  UploadingProsses: newstate,
                  activeUploads: state.activeUploads - 1,
                };
              });
            }
          });
      });
    }
    // for (const k in Files) {
    //   const file = Files[k];
    //   console.log(file);

    // }
  };
  return (
    <div>
      <input
        ref={FilePicker}
        className={classes.input}
        multiple
        id="contained-button-file"
        type="file"
        onChange={fileChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          size="large"
          variant="outlined"
          className={classes.button}
          component="span"
          color="secondary"
          startIcon={
            <img className={classes.ButtomLogo} src={logo} alt="upload logo" />
          }
          classes={{
            outlined: classes.buttonoutline,
          }}
        >
          Upload
        </Button>
      </label>
      {/* <input
        ref={FilePicker}
        // accept="video/*"
        id="scontained-button-file"
        className={classes.input}
        onChange={fileChange}
      />
      <label htmlFor="scontained-button-file">
        <Button
          size="large"
          variant="outlined"
          className={classes.button}
          color="secondary"
          startIcon={
            <img className={classes.ButtomLogo} src={logo} alt="upload logo" />
          }
          classes={{
            outlined: classes.buttonoutline,
          }}
        >
          Upload
        </Button>
      </label> */}
    </div>
  );
}
