import useStore from "../store";
import axios from "../Axios";

const DeletFolder = (id) => {
  axios
    .post("/ops/folder/deletfolder", { id }, { withCredentials: true })
    .then((data) => {
      if (data.data.msg == "OK") {
        const refreshCurrent = useStore.getState().refreshCurrent;
        refreshCurrent();
      }
    })
    .catch((e) => {
      console.log(e);
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
      }
    })
    .catch((e) => {
      console.log(e);
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
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const CopyFolder = (id, folderId) => {
  axios
    .post("/ops/folder/Copyfolder", { id, folderId }, { withCredentials: true })
    .then((data) => {
      if (data.data.msg == "OK") {
        const refreshCurrent = useStore.getState().refreshCurrent;
        refreshCurrent();
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const AddToFav = (id) => {
  axios
    .post("/ops/folder/AddToFav", { id }, { withCredentials: true })
    .then((data) => {
      if (data.data.msg == "OK") {
        console.log("ok");
      }
    })
    .catch((e) => {
      console.log(e);
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
      }
    })
    .catch((e) => {
      console.log(e);
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
