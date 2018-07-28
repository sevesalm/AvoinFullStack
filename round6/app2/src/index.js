import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme();

ReactDOM.render(
  <React.Fragment>
    <CssBaseline>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </CssBaseline>
  </React.Fragment>,
  document.getElementById("root")
);
