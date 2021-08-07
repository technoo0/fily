import React, { useRef, useState } from "react";
import axios from "../Axios";
import { Button } from "@material-ui/core";
import FileDownload from "js-file-download";
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
    formData.append("path", "/");
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
    </div>
  );
}
