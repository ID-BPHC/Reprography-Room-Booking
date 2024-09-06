import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DateAdapter from "@mui/lab/AdapterMoment";
import FormControlLabel from "@mui/material/FormControlLabel";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import moment from "moment";

import { AdminAgent, UserAgent } from "../../agent";
import { useSnackbar } from "notistack";

const Settings = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    STATE_DATE: moment().format("YYYY-MM-DD"),
    END_DATE: moment().add(7, "days").format("YYYY-MM-DD"),
    IS_OPEN: 1,
  });

  const handleChange = (e, name) => {
    let tempFormData = {
      ...formData,
    };
    tempFormData[name] = moment(e).format("YYYY-MM-DD");
    setFormData(tempFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AdminAgent.updateSettings(formData);
      enqueueSnackbar("Settings updated successfully");
    } catch (e) {
      enqueueSnackbar("Failed to update settings");
    }
    setLoading(false);
  };

  React.useEffect(async () => {
    setLoading(true);
    try {
      const res = await UserAgent.getSettings();
      setFormData(res.data);
    } catch (e) {
      enqueueSnackbar("Failed to load settings");
    }
    setLoading(false);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h3" sx={{ fontWeight: 500, marginBottom: "20px" }}>
        Settings
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <form>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Grid item xs={12}>
                  <DesktopDatePicker
                    label="Booking Start Date"
                    value={formData.START_DATE}
                    onChange={(e) => handleChange(e, "START_DATE")}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="DD/MM/YYYY"
                  />
                </Grid>
                <Grid item xs={12}>
                  <DesktopDatePicker
                    label="Booking End Date"
                    value={formData.END_DATE}
                    onChange={(e) => handleChange(e, "END_DATE")}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="DD/MM/YYYY"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.IS_OPEN}
                        onChange={(e) => {
                          let tempFormData = {
                            ...formData,
                          };
                          tempFormData["IS_OPEN"] = e.target.checked;
                          setFormData(tempFormData);
                        }}
                      />
                    }
                    label="Enable bookings"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </LocalizationProvider>
        </>
      )}
    </div>
  );
};

export default Settings;
