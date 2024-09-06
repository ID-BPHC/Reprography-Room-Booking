import {Navigate} from 'react-router-dom';
import {logoutUser} from '../utils';

const Logout = () => {
    logoutUser();
    return (
        <Navigate to="/login" />
    );
};

export default Logout;