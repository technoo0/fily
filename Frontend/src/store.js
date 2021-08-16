import create from "zustand";

const useStore = create((set) => ({
  UserData: {
    Name: "",
    Email: "",
    Startigy: "local",
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
}));

export default useStore;
