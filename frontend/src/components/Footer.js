import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";

const Footer = () => (
    <center>
        <Typography variant="overline">
            BPHC {new Date().getFullYear()} | {" "} 
            <Link to="/developers">Developers</Link>
        </Typography>
    </center>
);

export default Footer;