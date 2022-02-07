/* eslint-disable eqeqeq */
import useStore from "../store";
import axios from "../Axios";
import info from "../utils/info";
const DeletFile = (id) => {
  axios
    .post("/ops/deletfile", { id }, { withCredentials: true })
    .then((data) => {
      if (data.data.msg == "OK") {
        const refreshCurrent = useStore.getState().refreshCurrent;
        refreshCurrent();
        useStore.setState({
          alertOpen: true,
          alertType: "ok",
          alertMsg: "File Deleted successfully",
        });
      }
    })
    .catch((e) => {
      console.log(e);
      useStore.setState({
        alertOpen: true,
        alertType: "error",
        alertMsg: "an Error occoured please try again ",
      });
    });
};

const RenameFile = (id, newName) => {
  axios
    .post("/ops/Renamefile", { id, name: newName }, { withCredentials: true })
    .then((data) => {
      if (data.data.msg == "OK") {
        const refreshCurrent = useStore.getState().refreshCurrent;
        refreshCurrent();
        useStore.setState({
          alertOpen: true,
          alertType: "ok",
          alertMsg: "Folder Renamed successfully",
        });
      }
    })
    .catch((e) => {
      console.log(e);
      useStore.setState({
        alertOpen: true,
        alertType: "error",
        alertMsg: "an Error occoured please try again ",
      });
    });
};

const DownloadFile = (id, name) => {
  window.open(info.BackendUrl + "/ops/Downloadmyfile/" + id);
  // axios
  //   .get(
  //     "/ops/Downloadmyfile/" + id,

  //     {
  //       withCredentials: true,
  //     }
  //   )
  //   .then((e) => {
  //     console.log(e);
  //     // FileDownload(e.data, name);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
};

const MoveFile = (id, folderId) => {
  axios
    .post("/ops/Movefile", { id, folderId }, { withCredentials: true })
    .then((data) => {
      if (data.data.msg == "OK") {
        const refreshCurrent = useStore.getState().refreshCurrent;
        refreshCurrent();
        useStore.setState({
          alertOpen: true,
          alertType: "ok",
          alertMsg: "Folder Moved successfully",
        });
      }
    })
    .catch((e) => {
      console.log(e);
      useStore.setState({
        alertOpen: true,
        alertType: "error",
        alertMsg: "an Error occoured please try again ",
      });
    });
};

const CopyFile = (id, folderId) => {
  axios
    .post("/ops/Copyfile", { id, folderId }, { withCredentials: true })
    .then((data) => {
      if (data.data.msg == "OK") {
        const refreshCurrent = useStore.getState().refreshCurrent;
        refreshCurrent();
        useStore.setState({
          alertOpen: true,
          alertType: "ok",
          alertMsg: "Folder Copied successfully",
        });
      }
    })
    .catch((e) => {
      console.log(e);
      useStore.setState({
        alertOpen: true,
        alertType: "error",
        alertMsg: "an Error occoured please try again ",
      });
    });
};

const AddToFav = (id) => {
  axios
    .post("/ops/AddToFav", { id }, { withCredentials: true })
    .then((data) => {
      if (data.data.msg == "OK") {
        console.log("ok");
        useStore.setState({
          alertOpen: true,
          alertType: "ok",
          alertMsg: "The file have been added to the favorite successfully",
        });
      }
    })
    .catch((e) => {
      console.log(e);
      useStore.setState({
        alertOpen: true,
        alertType: "error",
        alertMsg: "an Error occoured please try again ",
      });
    });
};
const RmFromFav = (id) => {
  axios
    .post("/ops/RemoveFromFav", { id }, { withCredentials: true })
    .then((data) => {
      if (data.data.msg == "OK") {
        console.log("ok");
        const refreshCurrent = useStore.getState().refreshCurrent;
        refreshCurrent();
        useStore.setState({
          alertOpen: true,
          alertType: "ok",
          alertMsg: "The file have been removed from the favorite successfully",
        });
      }
    })
    .catch((e) => {
      console.log(e);
      useStore.setState({
        alertOpen: true,
        alertType: "error",
        alertMsg: "an Error occoured please try again ",
      });
    });
};

const ShareFile = async (id) => {
  try {
    const res = await axios.post(
      "/ops/CreateLink",
      { id },
      { withCredentials: true }
    );
    // console.log(res);
    if (res.data.link) {
      return info.ForntEbdUrl + "/sharelink/" + res.data.link;
    }
  } catch (e) {
    useStore.setState({
      alertOpen: true,
      alertType: "error",
      alertMsg: "an Error occoured please try again ",
    });
  }
};

export {
  DeletFile,
  RenameFile,
  MoveFile,
  CopyFile,
  AddToFav,
  RmFromFav,
  DownloadFile,
  ShareFile,
};
