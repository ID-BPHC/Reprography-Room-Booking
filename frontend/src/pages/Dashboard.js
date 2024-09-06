import * as React from "react";
import Box from "@mui/material/Box";
import Calendar from "../components/Calendar";
import ChangeRoomFba from "../components/ChangeRoomFba";
import { useSnackbar } from "notistack";

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box>
      <Calendar />
      <ChangeRoomFba />
    </Box>
  );
};

export default Dashboard;
