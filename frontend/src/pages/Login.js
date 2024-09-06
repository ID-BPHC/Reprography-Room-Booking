import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import GoogleLogin from "react-google-login";
import {useSnackbar} from "notistack";
import {AuthAgent} from '../agent';
import {isAdmin, isVerifiedUser, loginUser} from '../utils';
import BITSLogo from "../assets/BITSLogo.png";
import { APP_TITLE, GOOGLE_SIGN_IN_CLIENT_ID } from "../constants/index.js";

export default function Login() {
	const {enqueueSnackbar} = useSnackbar();

  const responseGoogleSuccess = async (response) => {
		try {
			const res = await AuthAgent.googleLogin({access_token: response.accessToken});
			enqueueSnackbar("Login Successful");
			loginUser(res.data);
			if (isAdmin()) {
				window.location.href = "/dashboard";
			} else if (isVerifiedUser()) {
				window.location = "/dashboard";
			} else {
				window.location = "/uv";
			}
		} catch (e) {
      console.log(e);
			enqueueSnackbar("Login Failed");
		}
  };

  const responseGoogleFail = async (response) => {
		enqueueSnackbar("Login failed");
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper variant="" maxWidth="36">
          <img src={BITSLogo} style={{ width: 150 }} />
        </Paper>
        <Typography component="h1" variant="h4" align="center">
          {APP_TITLE}
        </Typography>
        <Typography component="p" variant="p">
          Click the button below to sign in with Google.
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <GoogleLogin
            clientId={GOOGLE_SIGN_IN_CLIENT_ID}
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                color="primary"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login with Google
              </Button>
            )}
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFail}
            cookiePolicy={"single_host_origin"}
          />
        </Box>
      </Box>
    </Container>
  );
}
