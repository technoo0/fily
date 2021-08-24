import useStore from "../store";
import axios from "../Axios";
const getMainFolderId = () => {
  const id = useStore.getState().MianFolderId;
  if (id == "") {
    axios
      .get("/get/MainFolderId", { withCredentials: true })
      .then((e) => {
        console.log(e.data.msg);

        useStore.setState({
          MianFolderId: e.data.msg,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

const getMainFolderdata = async () => {
  const id = useStore.getState().MianFolderId;
  if (id == "") {
    axios
      .get("/get/MainFolderId", { withCredentials: true })
      .then((e) => {
        console.log(e.data.msg);

        useStore.setState({
          MianFolderId: e.data.msg,
          CurrentFolderID: e.data.msg,
        });
        getFiles(e.data.msg).then((e) => {
          if (typeof e == "object") {
            useStore.setState({
              MianFiles: e,
            });
          }
        });

        getFolders(e.data.msg)
          .then((e) => {
            console.log("ssssadsd", e);
            if (typeof e == "object") {
              useStore.setState({
                MianFolders: e,
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    const data1 = useStore.getState().MianFiles;
    const data2 = useStore.getState().MianFolders;
    useStore.setState({
      CurrentFolderID: id,
    });
    if (data1 == [] && data2 == []) {
      getFiles(id).then((e) => {
        if (typeof e == "object") {
          useStore.setState({
            MianFiles: e,
          });
        }
      });

      getFolders(id)
        .then((e) => {
          console.log("ssssadsd", e);
          if (typeof e == "object") {
            useStore.setState({
              MianFolders: e,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
};

const RefreshHome = () => {
  const id = useStore.getState().MianFolderId;
  getFiles(id).then((e) => {
    if (typeof e == "object") {
      useStore.setState({
        MianFiles: e,
      });
    }
  });

  getFolders(id)
    .then((e) => {
      console.log("ssssadsd", e);
      if (typeof e == "object") {
        useStore.setState({
          MianFolders: e,
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const getFavoriteFolderdata = () => {
  const data1 = useStore.getState().FavoriteFiles;
  const data2 = useStore.getState().FavoriteFolders;
  console.log("opopopop");
  console.log(data1, data2);
  if (data1.length == 0 && data2.length == 0) {
    console.log("opopopop2");
    useStore.setState({ fileLogging: true });
    axios
      .get("/get/FavoriteFiles", {
        withCredentials: true,
      })
      .then((files) => {
        useStore.setState({ fileLogging: false });
        if (files.data.files) {
          console.log("files opop");
          useStore.setState({
            FavoriteFiles: files.data.files,
          });
        }
      });
    useStore.setState({ folderLogging: true });
    axios
      .get("/get/FavoriteFolders", {
        withCredentials: true,
      })
      .then((files) => {
        useStore.setState({ folderLogging: false });
        if (files.data.files) {
          useStore.setState({
            FavoriteFolders: files.data.files,
          });
        }
      });
  }
};

const RefresFav = () => {
  axios
    .get("/get/FavoriteFiles", {
      withCredentials: true,
    })
    .then((files) => {
      if (files.data.files) {
        console.log("files opop");
        useStore.setState({
          FavoriteFiles: files.data.files,
        });
      }
    });

  axios
    .get("/get/FavoriteFolders", {
      withCredentials: true,
    })
    .then((files) => {
      if (files.data.files) {
        useStore.setState({
          FavoriteFolders: files.data.files,
        });
      }
    });
};

const UpdateHome = () => {
  const id = useStore.getState().MianFolderId;
  getFiles(id).then((e) => {
    if (typeof e == "object") {
      useStore.setState({
        MianFiles: e,
      });
    }
  });

  getFolders(id)
    .then((e) => {
      console.log("ssssadsd", e);
      if (typeof e == "object") {
        useStore.setState({
          MianFolders: e,
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
const getFiles = async (folderid) => {
  try {
    useStore.setState({ fileLogging: true });
    const files = await axios.get(`/get/files/${folderid}`, {
      withCredentials: true,
    });
    console.log(files.data.files);
    useStore.setState({ fileLogging: false });
    return files.data.files;
  } catch (e) {
    console.log(e);
  }
};

const getrecentFiles = async () => {
  useStore.setState({ recentlyLogging: true });
  const files = await axios
    .get(`/get/recentlyadded/`, {
      withCredentials: true,
    })
    .then((res) => {
      //   console.log("rec", files);
      useStore.setState({ recentlyLogging: false });
      useStore.setState({
        recentlyadded: res.data.files,
      });
    })
    .catch((e) => {
      useStore.setState({ recentlyLogging: false });
      console.log(e);
    });
};

const getFolders = async (folderid) => {
  try {
    useStore.setState({ folderLogging: true });
    const Response = await axios.get(`/get/folders/${folderid}`, {
      withCredentials: true,
    });
    console.log(Response.data.files);
    useStore.setState({ folderLogging: false });
    return Response.data.files;
  } catch (e) {
    console.log(e);
    useStore.setState({ folderLogging: false });
  }
};

const getFolderData = async (folderid) => {
  try {
    const data = await axios.get(`/get/folderdata/${folderid}`, {
      withCredentials: true,
    });
    return data.data.msg;
  } catch (e) {
    console.log(e);
  }
};

export {
  RefreshHome,
  RefresFav,
  getFavoriteFolderdata,
  getMainFolderdata,
  getFiles,
  getFolders,
  UpdateHome,
  getrecentFiles,
  getFolderData,
  getMainFolderId,
};
