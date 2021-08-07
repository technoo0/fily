import create from "zustand";

const useStore = create((set) => ({
  UserData: {
    Name: "",
    Email: "",
    Startigy: "local",
    JoinData: new Date(Date.now()).toUTCString(),
  },
}));

export default useStore;
