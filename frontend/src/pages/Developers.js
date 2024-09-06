import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import ONE from "../assets/1.jpg";
import TWO from "../assets/2.png";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const ProfileCard = (props) => (
  <>
    <Card sx={{ width: "100%", minHeight: "250px" }} variant="outlined">
      <CardContent>
        <center>
          <Avatar src={props.avatar} sx={{ width: 100, height: 100 }} />

          <Typography variant="h5" sx={{ color: "text.secondary" }}>
            {props.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <AlternateEmailIcon className="svg_icons" /> 
            <a href={"mailto:" + props.email}>{props.email}</a>
            
          </Typography>
          {props.github ? (
            <>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <GitHubIcon className="svg_icons" />{" "}
                <a href={props.github.url}>{props.github.name}</a>
              </Typography>
            </>
          ) : null}
          {props.linkedin ? (
            <>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <LinkedInIcon className="svg_icons" />{" "}
                <a href={props.linkedin.url}>{props.linkedin.name}</a>
              </Typography>
            </>
          ) : null}
        </center>
      </CardContent>
    </Card>
  </>
);

const Developers = () => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h3" sx={{ fontWeight: 500, marginBottom: "20px" }}>
          Developers
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Button>
            <ArrowBackIcon />
            Back to home
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12} style={{ width: "100%" }}>
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: "center",
          }}
        >
          <Grid item md={4}>
            <ProfileCard
              avatar={ONE}
              name="Prathmesh Srivastava"
              email="f20191322@hyderabad.bits-pilani.ac.in"
              github={{
                url: "https://github.com/prathonit",
                name: "prathonit",
              }}
              linkedin={{
                url: "https://www.linkedin.com/in/prathmesh-srivastava/",
                name: "prathmesh-srivastava",
              }}
            />
          </Grid>
          <Grid item md={4}>
            <ProfileCard
              avatar={TWO}
              name="Aryan Chaubal"
              email="f20190130@hyderabad.bits-pilani.ac.in"
              github={{
                url: "https://github.com/chaubss",
                name: "chaubss",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Developers;
