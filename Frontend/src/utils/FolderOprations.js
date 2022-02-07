/* eslint-disable eqeqeq */
import useStore from "../store";
import axios from "../Axios";

const DeletFolder = (id) => {
  axios
    .post("/ops/folder/deletfolder", { id }, { withCredentials: true })
    .then((data) => {
      if (data.data.msg == "OK") {
        const refreshCurrent = useStore.getState().refreshCurrent;
        refreshCurrent();
        useStore.setState({
          alertOpen: true,
          alertType: "ok",
          alertMsg: "Folder Deleted successfully",
        });
      } else {
        useStore.setState({
          alertOpen: true,
          alertType: "error",
          alertMsg: "an Error occoured please try again ",
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

const RenameFolder = (id, newName) => {
  axios
    .post(
      "/ops/folder/Renamefolder",
      { id, name: newName },
      { withCredentials: true }
    )
    .then((data) => {
      if (data.data.msg == "OK") {
        const refreshCurrent = useStore.getState().refreshCurrent;
        refreshCurrent();
        useStore.setState({
          alertOpen: true,
          alertType: "ok",
          alertMsg: "Folder Renamed successfully",
        });
      } else {
        useStore.setState({
          alertOpen: true,
          alertType: "error",
          alertMsg: "an Error occoured please try again ",
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

const MoveFolder = (id, folderId) => {
  axios
    .post("/ops/folder/Movefolder", { id, folderId }, { withCredentials: true })
    .then((data) => {
      if (data.data.msg == "OK") {
        console.log("hojhopj");
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

const CopyFolder = (id, folderId) => {
  axios
    .post("/ops/folder/Copyfolder", { id, folderId }, { withCredentials: true })
    .then((data) => {
      if (data.data.msg == "OK") {
        const refreshCurrent = useStore.getState().refreshCurrent;
        refreshCurrent();
        useStore.setState({
          alertOpen: true,
          alertType: "ok",
          alertMsg: "Folder copied successfully",
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
    .post("/ops/folder/AddToFav", { id }, { withCredentials: true })
    .then((data) => {
      if (data.data.msg == "OK") {
        console.log("ok");
        useStore.setState({
          alertOpen: true,
          alertType: "ok",
          alertMsg: "The folder have been added to the favorite successfully",
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
    .post("/ops/folder/RemoveFromFav", { id }, { withCredentials: true })
    .then((data) => {
      if (data.data.msg == "OK") {
        console.log("ok");
        const refreshCurrent = useStore.getState().refreshCurrent;
        refreshCurrent();
        useStore.setState({
          alertOpen: true,
          alertType: "ok",
          alertMsg:
            "The folder have been removed from the favorite successfully",
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

export {
  DeletFolder,
  RenameFolder,
  MoveFolder,
  CopyFolder,
  AddToFav,
  RmFromFav,
};
