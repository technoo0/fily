import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import RenameDialog from "../FileMuneDiloge/RenameDialoge";

import CopyMoveDialog from "../FileMuneDiloge/CopyMoveDialog";
import {
  Edit,
  Folder,
  FileCopy,
  Delete,
  Share,
  Favorite,
} from "@material-ui/icons";
import {
  CardActionArea,
  CardContent,
  Grid,
  Menu,
  MenuItem,
  ListItemIcon,
  SvgIcon,
} from "@material-ui/core";
import { DeletFolder, AddToFav, RmFromFav } from "../../utils/FolderOprations";
import HtmlTooltip from "./htmlToolTip";
import FolderIcon from "@material-ui/icons/Folder";
import moment from "moment";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import useStore from "../../store";
import { ReactComponent as removeFav } from "../../images/removeFav.svg";

const useStyles = makeStyles({
  root: {
    borderRadius: 25,
    width: 250,
    boxShadow: "0px 0px 20px rgba(0,0,0,0.25)",
  },
  media: {
    borderColor: "#CDA1A1",
    borderWidth: 2,
    border: "solid",
    height: 200,
    width: "92%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    borderRadius: 25,
  },
  Ficon: {
    marginRight: 10,
  },
  title: {
    // marginLeft: 30,
    // marginTop: 5,
    // paddingBottom: 22,
    // paddingTop: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  arrow: {
    color: "#f5f5f9",
  },
});

export default function OutlinedCard({ data }) {
  const [state, setState] = React.useState({
    mouseX: null,
    mouseY: null,
  });
  const History = useHistory();
  const ChangeName = useStore((state) => state.ChangeName);
  const goToFolder = () => {
    if (data.OpenMe) {
      History.push(`/u/folder/${data.OpenMe}`);
    } else {
      History.push(`/u/folder/${data.id}`);
    }
    ChangeName(data.name);
  };
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
  const handleOpenFolder = () => {
    goToFolder();
    handleClose();
  };
  const classes = useStyles();

  //DeletFile, RenameFile, MoveFile, CopyFile
  const DeletFileHandle = () => {
    DeletFolder(data.id);
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
              <b>Name</b> {data.name}
            </Typography>
            <Typography color="inherit">
              <b>Created At</b> {moment(data.createdAt).format("D MMMM YYYY")}
            </Typography>
            <Typography color="inherit">
              <b>Last update </b> {moment(data.updatedAt).format("D MMMM YYYY")}
            </Typography>
          </React.Fragment>
        }
      >
        <Card className={classes.root} variant="outlined">
          <CardActionArea onClick={goToFolder}>
            <CardContent>
              <Grid container direction="row">
                <FolderIcon className={classes.Ficon} />
                <Typography
                  className={classes.title}
                  color="primary"
                  variant="h6"
                >
                  {data.name}
                </Typography>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </HtmlTooltip>
      <RenameDialog
        open={openRename}
        handleClose={handleRenameClose}
        id={data.id}
        currentname={data.name}
        folder={true}
      />
      <CopyMoveDialog
        open={openMove}
        handleClose={handleMoveClose}
        id={data.id}
        op={currentOP}
        folder={true}
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
        <MenuItem onClick={handleOpenFolder}>
          <ListItemIcon>
            <FolderOpenIcon fontSize="small" />
          </ListItemIcon>
          Open
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
      </Menu>
    </div>
  );
}
