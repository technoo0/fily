import useStore from "../store";
import axios from "../Axios";
import info from "../utils/info";

const GetFileData = async (id) => {
  try {
    const res = await axios.post(
      "/ShareLink/GetFileData",
      { id },
      { withCredentials: true }
    );
    console.log(res);
    if (res.data.file) {
      return res.data.file;
    }
  } catch (e) {
    console.log(e);
    useStore.setState({
      alertOpen: true,
      alertType: "error",
      alertMsg: "an Error occoured please try again ",
    });
  }
};

const DownloadFileFromLink = (id) => {};

export { GetFileData, DownloadFileFromLink };
