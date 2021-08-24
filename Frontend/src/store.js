import create from "zustand";

const useStore = create((set) => ({
  fileLogging: "true",
  folderLogging: "true",
  recentlyLogging: "true",
  loggedin: "wait",
  UserData: {
    Name: "",
    Email: "",
    Startigy: "local",
    usage: 0,
    JoinData: new Date(Date.now()).toUTCString(),
  },
  UploadingStatus: false,
  activeUploads: 0,
  MianFolderId: "",
  FavoriteFolderId: "",
  CurrentFolderID: "",
  MianFolders: [],
  FavoriteFiles: [],
  FavoriteFolders: [],
  UploadingProsses: [],
  MianFiles: [],
  recentlyadded: [],
  CurrentName: "",
  ChangeName: (name) => set({ CurrentName: name }),
  refreshCurrent: () => {
    console.log("Refresh");
  },

  alertOpen: false,
  alertType: "",
  alertMsg: "",
}));

export default useStore;
