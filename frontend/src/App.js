import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import VerifiedUsers from "./pages/Admin/VerifiedUsers";
import PendingRequests from "./pages/Admin/PendingRequests";
import Rooms from "./pages/Admin/Rooms";
import Settings from "./pages/Admin/Settings";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Unverified from "./pages/Unverified";
import Logout from "./pages/Logout";
import Developers from "./pages/Developers";

import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

import { CssBaseline } from "@mui/material";

import { isAdmin, isVerifiedUser } from "./utils";

const LoginContainer = () => (
  <div>
    <Routes>
      <Route path="/logout" element={<Logout />} />
      <Route path="/uv" element={<Unverified />} />
      <Route path="/developers" element={<Developers />} />
      <Route path="/*" element={<Login />} />
    </Routes>
  </div>
);

const DefaultContainer = () => (
  <div>
    <NavBar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="bookings/" element={<Bookings />} />
      <Route path="contact/" element={<Contact />} />
      <Route path="faq/" element={<Faq />} />
    </Routes>
  </div>
);

const AdminContainer = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/verified-users" element={<VerifiedUsers />} />
        <Route path="/pending-requests" element={<PendingRequests />} />
        <Route path="settings/" element={<Settings />} />
        <Route path="/*" element={<Rooms />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <CssBaseline>
        <Router>
          <Routes>
            {isVerifiedUser() ? (
              <Route path="dashboard/*" element={<DefaultContainer />} />
            ) : null}
            {isAdmin() ? (
              <Route path="admin/*" element={<AdminContainer />} />
            ) : null}
            <Route path="/*" element={<LoginContainer />} />
          </Routes>
          <Footer />
        </Router>
      </CssBaseline>
    </div>
  );
}

export default App;
