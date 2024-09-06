import * as React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

const ContactCard = (props) => (
  <Card variant="outlined" style={{minHeight: "130px"}}>
    <CardContent>
      <Typography variant="h5" sx={{ color: "text.secondary" }}>
       {props.title}
      </Typography>
			{props.name ? (
				<Typography variant="subtitle1">
					<>Name: </>{props.name}
				</Typography>
			) : null}
			{props.phone ? (
				<Typography variant="subtitle1">
					<>Contact No: </>{props.phone}
				</Typography>
			) : null}
			{props.email ? (
				<Typography variant="subtitle1">
					<>Email: </>{props.email}
				</Typography>
			) : null}
    </CardContent>
  </Card>
);

const Contact = () => (
  <div style={{ padding: 20 }}>
    <Typography variant="h3" sx={{ fontWeight: 500, marginBottom: "20px" }}>
      Contact Us
    </Typography>
    <Grid container spacing={2}>
      <Grid item md={6}>
				<ContactCard 
					title="Technical Support (Printer related problems)"
					name="Mr. Venkat"
					phone="7013919014"
				/>
			</Grid>
			<Grid item md={6}>
				<ContactCard 
					title="Technical Support (Booking)"
					email="tech.csis@hyderabad.bits-pilani.ac.in"
				/>
			</Grid>
			<Grid item md={6}>
				<ContactCard 
					title="Reprography Room Access (CSIS Office)"
					phone="(040)66303875"
				/>
			</Grid>
    </Grid>
  </div>
);

export default Contact;
