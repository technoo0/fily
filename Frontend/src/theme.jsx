import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#003049",
    },
    secondary: {
      main: "#F77F00",
    },
  },
  typography: {
    fontFamily: ["Titillium Web", "Roboto"].join(","),
  },
});

export default theme;
