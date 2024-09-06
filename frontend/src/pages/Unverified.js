import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

import {APP_TITLE} from "../constants";
import BITSLogo from "../assets/BITSLogo.png";

const Unverified = () => (
  <>
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper variant="" maxWidth="23">
        <img src={BITSLogo} style={{ width: 150 }} />
      </Paper>
      <Typography component="h1" variant="h4" align="center">
        {APP_TITLE}
      </Typography>
      <Alert severity="info">
        You are not authorized to access this website.
      </Alert>
    </Box>
  </>
);

export default Unverified;
