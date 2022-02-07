import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import axios from "../../Axios";
import SearchCard from "./SearchCard";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const FlatData = ({ files, folders }) => {
  let data = [];
  for (let i of folders) {
    data.push({
      id: i.id,
      FolderId: i.id,
      name: i.name,
      type: "folder",
    });
  }

  return [...data, ...files];
};

const useSearch = () => {
  const [result, SetResult] = useState([]);
  const [query, setquery] = useState(null);
  const [lodding, setLodding] = useState(false);
  const search = async (text) => {
    try {
      const res = await axios.get(`/get/search?q=${text}`, {
        withCredentials: true,
      });

      const data = await FlatData(res.data);

      return data;
    } catch {
      return [];
    }
  };
  useEffect(() => {
    setLodding(true);
    search(query)
      .then((res) => {
        SetResult(res);
        setLodding(false);
      })
      .catch((e) => {
        SetResult([]);
        setLodding(false);
      });
  }, [query, setquery]);
  return [result, lodding, setquery];
};

export default function CustomizedInputBase() {
  const History = useHistory();
  const classes = useStyles();
  const [result, lodding, setquery] = useSearch();
  const onInputHandle = (e) => {
    setquery(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    History.push(`/u/search?q=${e.target[1].value}`);
  };

  return (
    <Paper component="form" onSubmit={onSubmitHandler} className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu"></IconButton>
      <InputBase
        onInput={onInputHandle}
        className={classes.input}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <SearchCard data={result} />
    </Paper>
  );
}
