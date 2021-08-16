import useStore from "../store";
import axios from "../Axios";

const DeletFile = (id) => {
  axios
    .post("/ops/deletfile", { id }, { withCredentials: true })
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

const RenameFile = (id, newName) => {
  axios
    .post("/ops/Renamefile", { id, name: newName }, { withCredentials: true })
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

const MoveFile = (id, folderId) => {
  axios
    .post("/ops/Movefile", { id, folderId }, { withCredentials: true })
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

const CopyFile = (id, folderId) => {
  axios
    .post("/ops/Copyfile", { id, folderId }, { withCredentials: true })
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
    .post("/ops/AddToFav", { id }, { withCredentials: true })
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
    .post("/ops/RemoveFromFav", { id }, { withCredentials: true })
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

export { DeletFile, RenameFile, MoveFile, CopyFile, AddToFav, RmFromFav };
