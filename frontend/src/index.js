import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";

ReactDOM.render(
  <React.StrictMode>
    <ConfirmProvider>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </ConfirmProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
