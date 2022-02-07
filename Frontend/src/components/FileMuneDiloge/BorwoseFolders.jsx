/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TreeView } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { getFolders, getMainFolderId } from "../../utils/getData";
import useStore from "../../store";
const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const FolderStructer = (props) => {
  const [Files, SetFiles] = useState([]);
  useEffect(() => {
    getFolders(props.data.id).then((data) => {
      SetFiles(data);
    });
  }, []);
  return (
    <TreeItem nodeId={props.data.id} label={props.data.name}>
      {Files.map((File, index) =>
        props.hidethis == File.id || File.OpenMe ? (
          ""
        ) : (
          <FolderStructer
            hidethis={props.hidethis}
            key={index}
            data={File}
          ></FolderStructer>
        )
      )}
    </TreeItem>
  );
};

export default function FileSystemNavigator({ NewSelect, hidethis }) {
  const classes = useStyles();
  const [selected, setselected] = useState("");
  const MainId = useStore((state) => state.MianFolderId);
  const handleSelect = (event, nodeIds) => {
    setselected(nodeIds);
    NewSelect(nodeIds);
  };
  useEffect(() => {
    getMainFolderId();
  }, []);

  return (
    <div>
      <TreeView
        className={classes.root}
        selected={selected}
        onNodeSelect={handleSelect}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {MainId ? (
          <FolderStructer
            hidethis={hidethis}
            data={{ name: "home", id: MainId }}
          />
        ) : (
          ""
        )}

        {/* <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="10" label="OSS" />
          <TreeItem nodeId="6" label="Material-UI">
            <TreeItem nodeId="7" label="src">
              <TreeItem nodeId="8" label="index.js" />
              <TreeItem nodeId="9" label="tree-view.js" />
            </TreeItem>
          </TreeItem>
        </TreeItem> */}
      </TreeView>
    </div>
  );
}
