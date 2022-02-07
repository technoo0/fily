import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@material-ui/core";
import React from "react";

import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ImageIcon from "@material-ui/icons/Image";
import TheatersIcon from "@material-ui/icons/Theaters";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import SubjectIcon from "@material-ui/icons/Subject";
import FolderIcon from "@material-ui/icons/Folder";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import useStore from "../../store";
const FileAvatar = ({ type }) => {
  if (type.includes("image")) {
    return <ImageIcon />;
  } else if (type.includes("video")) {
    return <TheatersIcon />;
  } else if (type.includes("pdf")) {
    return <PictureAsPdfIcon />;
  } else if (type.includes("audio")) {
    return <AudiotrackIcon />;
  } else if (type.includes("text")) {
    return <SubjectIcon />;
  } else if (type.includes("folder")) {
    return <FolderIcon />;
  } else {
    return <InsertDriveFileIcon />;
  }
};

function FormateFileSize(bytes, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}

function TrimText(string) {
  var length = 30;
  var trimmedString =
    string.length > length ? string.substring(0, length - 3) + "..." : string;
  return trimmedString;
}

export default function SearchCard({ data }) {
  const History = useHistory();
  const [show, setshow] = useState(false);
  const ElementRef = useRef();
  const HideList = (e) => {
    if (ElementRef.current && !ElementRef.current.contains(e.target)) {
      setshow(false);
    }
  };
  const MianFolderId = useStore((state) => state.MianFolderId);
  const HandelClick = (FolderId) => {
    if (MianFolderId === FolderId) {
      History.push(`/u/`);
    } else {
      History.push(`/u/folder/${FolderId}`);
    }
    setshow(false);
  };
  useEffect(() => {
    window.addEventListener("mousedown", HideList);
    return () => {
      window.removeEventListener("mousedown", HideList);
    };
  }, [ElementRef]);
  useEffect(() => {
    setshow(true);
  }, [data]);
  return (
    <>
      {show && (
        <Paper
          ref={ElementRef}
          style={{ position: "absolute", top: 49, left: 20, width: 300 }}
        >
          <List disablePadding>
            {data.map((item, key) => (
              <ListItem
                button
                divider
                dense
                key={key}
                onClick={() => HandelClick(item.FolderId)}
              >
                <ListItemAvatar>
                  <FileAvatar type={item.type} />
                </ListItemAvatar>
                <ListItemText
                  primary={TrimText(item.name)}
                  secondary={item.size ? FormateFileSize(item.size) : ""}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  );
}
