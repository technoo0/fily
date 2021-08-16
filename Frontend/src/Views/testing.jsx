import React, { useRef, useState } from "react";
import axios from "../Axios";
import { Button } from "@material-ui/core";
import FileDownload from "js-file-download";
import useStore from "../store";
import UploadingStatus from "../components/UploadingStatus";
import BrowserFolders from "../components/FileMuneDiloge/BorwoseFolders";
export default function Testing() {
  const FilePicker = useRef();
  const [FilePath, setFilePath] = useState();
  const fileChange = () => {
    console.log(FilePicker.current.files);
    setFilePath(FilePicker.current.files[0]);
  };
  const uploadf = () => {
    let formData = new FormData();
    formData.append("file", FilePath);
    formData.append("FolderId", "5069d16c-c7ae-49b4-908e-9ecdf7a048f3");
    formData.append("acsses", "private");
    axios
      .post("/file/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          console.log(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("errrrrr", err);
      });
  };
  const Download = () => {
    axios
      .get("/file/download", { withCredentials: true, responseType: "blob" })
      .then((e) => {
        console.log(e);
        FileDownload(e.data, "reportss.jpg");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getMyData = () => {
    axios
      .get("/file/MainFolder", { withCredentials: true })
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const addTest = () => {
    useStore.setState((state) => ({
      UploadingProsses: [...state.UploadingProsses, { name: "p", value: 0 }],
    }));
  };
  return (
    <div>
      <input
        ref={FilePicker}
        // accept="video/*"

        type="file"
        onChange={fileChange}
      />
      <label htmlFor="contained-button-file">Uplaoad</label>

      <Button onClick={uploadf}>dd</Button>
      <Button onClick={Download}>ddownload</Button>
      <Button onClick={getMyData}>get My Data</Button>
      <Button onClick={addTest}>add prosses</Button>
      <div>
        <UploadingStatus />
        <BrowserFolders />
      </div>
    </div>
  );
}
