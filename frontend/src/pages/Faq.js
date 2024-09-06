import * as React from "react";
import FaqComponent from "react-faq-component";
import Typography from "@mui/material/Typography";

const createFaq = (title, body) => {
	return {
		title: <Typography variant="h6" sx={{ fontWeight: 400 }}>{title}</Typography>,
		content: <Typography variant="body1" sx={{ color: "text.secondary" }}>{body}</Typography>
	};
};

const data = {
  rows: [
		createFaq("How do I book a slot?", `From BOOK ROOM tab on your dashboard, you can book a slot by dragging the slot to the desired time. You can also book a slot by clicking on the slot in the calendar.`),
    createFaq("For which dates can I book a slot?", `You can book a slot from 7th March to 16th March`),
		createFaq("How do I cancel a booked slot?", `
			From BOOK ROOM tab on your dashboard, click on your booking you want to cancel and click on cancel booking. You can also
			cancel a booking from MY BOOKINGS tab on the dashboard by clicking on CANCEL BOOKING.
		`),
		createFaq("When can I cancel a booked slot?", `You can cancel a booked slot at least 30 mins prior to the slot start time.`),
		createFaq("Whom can I contact for any queries?", `You can get the contact us info by clicking on CONTACT US tab on the dashboard.`),
  ],
};

const Faq = () => (
  <div style={{ padding: 20 }}>
    <Typography variant="h3" sx={{ fontWeight: 500, marginBottom: "20px" }}>
      Frequently Asked Questions
    </Typography>
    <FaqComponent data={data} />
  </div>
);

export default Faq;
