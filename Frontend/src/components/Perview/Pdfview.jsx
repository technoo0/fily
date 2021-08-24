import React, { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import {
  Grid,
  IconButton,
  makeStyles,
  Typography,
  withStyles,
} from "@material-ui/core";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
const useStyles = makeStyles((theme) => ({
  page: {
    width: 900,
    margin: "auto",
    border: "2px solid rgb(0,0,0)",
  },
}));
function MyApp(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const canvasRef = useRef();
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  useEffect(() => {}, [pageNumber]);
  const next = () => {
    setPageNumber(pageNumber + 1);
  };
  const back = () => {
    setPageNumber(pageNumber - 1);
  };
  const classes = useStyles();
  return (
    <div>
      <Grid
        style={{ width: "100%" }}
        container
        direction={"row"}
        alignItems={"center"}
        justify={"space-around"}
      >
        <Grid item xs={1}>
          <IconButton onClick={back}>
            <ArrowBackIosSharpIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography>
            Page {pageNumber} of {numPages}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={next}>
            <ArrowForwardIosSharpIcon />
          </IconButton>
        </Grid>
      </Grid>
      {/* <button onClick={next}>next</button>
      <p>
        Page {pageNumber} of {numPages}
      </p> */}
      <Document file={props.link} onLoadSuccess={onDocumentLoadSuccess}>
        <Page width={900} className={classes.page} pageNumber={pageNumber} />
      </Document>
    </div>
  );
}

export default MyApp;
