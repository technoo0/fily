import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import RenameDialog from "../FileMuneDiloge/RenameDialoge";
import CopyMoveDialog from "../FileMuneDiloge/CopyMoveDialog";
import {
  Visibility,
  Edit,
  Folder,
  FileCopy,
  Delete,
  GetApp,
  Share,
  Favorite,
} from "@material-ui/icons";
import {
  CardActionArea,
  CardMedia,
  Grid,
  Menu,
  MenuItem,
  ListItemIcon,
  SvgIcon,
} from "@material-ui/core";
import {
  DeletFile,
  RenameFile,
  MoveFile,
  RmFromFav,
  AddToFav,
} from "../../utils/FileOprations";
import imagefile from "../../images/image.jpg";
import videofile from "../../images/video.jpg";
import pdffile from "../../images/pdf.jpg";
import filefile from "../../images/file.jpg";
import HtmlTooltip from "./htmlToolTip";
import moment from "moment";
import { ReactComponent as removeFav } from "../../images/removeFav.svg";
const useStyles = makeStyles({
  root: {
    width: 200,
    borderRadius: 23,
    boxShadow: "0px 0px 20px rgba(0,0,0,0.25)",
  },
  media: {
    // borderColor: "#CDA1A1",
    // borderWidth: 2,
    // border: "solid",
    height: 161,
    width: "91%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    borderRadius: 23,
  },

  title: {
    marginLeft: 30,
    paddingBottom: 22,
    paddingTop: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  arrow: {
    color: "#f5f5f9",
  },
});
const initialState = {
  mouseX: null,
  mouseY: null,
};
export default function OutlinedCard({ data }) {
  const [state, setState] = React.useState({
    mouseX: null,
    mouseY: null,
  });

  const handleClick = (event) => {
    event.preventDefault();
    console.log(state);
    if (state.mouseX == null) {
      console.log("iam here");
      setState({
        mouseX: event.clientX - 2,
        mouseY: event.clientY - 4,
      });
    } else {
      console.log("byby");
      handleClose();
    }
  };

  const handleClose = () => {
    setState({
      mouseX: null,
      mouseY: null,
    });
  };
  const classes = useStyles();
  const trimName = (name) => {
    if (name.length > 17) {
      return name.slice(0, 16) + "....";
    } else {
      return name;
    }
  };

  const GetImage = () => {
    if (data.type.includes("image")) {
      return imagefile;
    } else if (data.type.includes("video")) {
      return videofile;
    } else if (data.type.includes("pdf")) {
      return pdffile;
    } else {
      return filefile;
    }
  };
  //DeletFile, RenameFile, MoveFile, CopyFile
  const DeletFileHandle = () => {
    DeletFile(data.id);
    handleClose();
  };

  const RenameFileHandle = () => {
    // DeletFile(data.id);
    handleClose();
    setopenRename(true);
  };

  const MoveFileHandle = () => {
    // DeletFile(data.id);
    handleClose();
    setcurrentOP("Move");
    setopenMove(true);
  };
  const CopyFileHandle = () => {
    // DeletFile(data.id);
    handleClose();
    setcurrentOP("Copy");
    setopenMove(true);
  };

  const AddToFavFileHandle = () => {
    // DeletFile(data.id);
    handleClose();
    if (data.Favorite) {
      RmFromFav(data.id);
    } else {
      AddToFav(data.id);
    }
  };

  const [openRename, setopenRename] = useState(false);
  const [openMove, setopenMove] = useState(false);
  const [currentOP, setcurrentOP] = useState("");
  const handleRenameClose = () => {
    setopenRename(false);
  };

  const handleMoveClose = () => {
    setopenMove(false);
  };

  return (
    <div onContextMenu={handleClick}>
      <HtmlTooltip
        arrow={true}
        TransitionComponent={Fade}
        placement="right"
        title={
          <React.Fragment>
            <Typography color="inherit">
              <b>Size</b> {(Number(data.size) / 1048576).toFixed(2)} MB
            </Typography>
            <Typography color="inherit">
              <b>Created At</b> {moment(data.createdAt).format("D MMMM YYYY")}
            </Typography>
          </React.Fragment>
        }
      >
        <Card
          className={classes.root}
          variant="outlined"
          // onContextMenu={}
        >
          <CardActionArea>
            <CardMedia className={classes.media} image={GetImage()} />

            <Typography className={classes.title} color="primary" variant="h6">
              {trimName(data.name)}
            </Typography>
          </CardActionArea>
        </Card>
      </HtmlTooltip>
      <RenameDialog
        open={openRename}
        handleClose={handleRenameClose}
        id={data.id}
        currentname={data.name}
      />
      <CopyMoveDialog
        open={openMove}
        handleClose={handleMoveClose}
        id={data.id}
        op={currentOP}
      />
      <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          Preview
        </MenuItem>
        {/* Visibility,Edit,Folder,FileCopy,Delete,GetApp,Share */}
        <MenuItem onClick={RenameFileHandle}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Rename
        </MenuItem>
        <MenuItem onClick={MoveFileHandle}>
          <ListItemIcon>
            <Folder fontSize="small" />
          </ListItemIcon>
          Move to
        </MenuItem>
        <MenuItem onClick={CopyFileHandle}>
          <ListItemIcon>
            <FileCopy fontSize="small" />
          </ListItemIcon>
          Copy to
        </MenuItem>
        <MenuItem onClick={AddToFavFileHandle}>
          <ListItemIcon>
            {data.Favorite ? (
              <SvgIcon component={removeFav}></SvgIcon>
            ) : (
              <Favorite fontSize="small" />
            )}
          </ListItemIcon>
          {data.Favorite ? "Remove from favorite " : "Add to favorite"}
        </MenuItem>
        <MenuItem onClick={DeletFileHandle}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Share fontSize="small" />
          </ListItemIcon>
          Share
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <GetApp fontSize="small" />
          </ListItemIcon>
          Download
        </MenuItem>
      </Menu>
    </div>
  );
}
