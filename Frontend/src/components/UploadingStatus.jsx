import useStore from "../store";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import StatusCard from "./StatusCard";
import CancelIcon from "@material-ui/icons/Cancel";
import { Grid, IconButton } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  icon: {
    color: "white",
  },
  root: {
    width: 450,
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  header: {
    backgroundColor: "#003049",
    color: "white",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  const ff = useStore((state) => state.UploadingProsses);
  const activeUploads = useStore((state) => state.activeUploads);
  const UploadingStatus = useStore((state) => state.UploadingStatus);
  const hideIfDone = () => {
    if (activeUploads === 0) {
      useStore.setState({ UploadingStatus: false, UploadingProsses: [] });
    }
  };
  return (
    <div className={classes.root}>
      {UploadingStatus ? (
        <Accordion>
          <AccordionSummary
            className={classes.header}
            expandIcon={<ExpandMoreIcon className={classes.icon} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container direction={"row"} alignItems={"center"}>
              <Grid item xs={11}>
                <Typography>
                  {activeUploads > 0
                    ? `Uploading ${activeUploads} items ...`
                    : "Uploading Done"}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                {activeUploads === 0 ? (
                  <IconButton onClick={hideIfDone}>
                    <CancelIcon className={classes.icon} />
                  </IconButton>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: "column" }}>
            <Grid container direction={"column"} spacing={1}>
              {ff.map((item, i) =>
                item ? (
                  <Grid item xs={12} key={i}>
                    <StatusCard
                      name={item.name}
                      key={i}
                      value={item.value}
                      cancel={item.source}
                      status={item.status}
                    />
                  </Grid>
                ) : (
                  ""
                )
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : (
        ""
      )}
    </div>
  );
}
