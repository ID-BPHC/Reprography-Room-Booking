import {AuthAgent} from "./agent";
import {Navigate} from "react-router-dom";

const loginUser = (response) => {
    let accessToken = response.access_token;
    let refreshToken = response.refresh_token;
    let userRole = response.user.role;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userRole", userRole);
};

const logoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
};

const decodeJwt = (token) => {
    try {
        let base64 = token.split('.')[1];
        let decoded = JSON.parse(window.atob(base64));
        return decoded;
    } catch (e) {
        return {};
    }
};

const getUserDetails = () => {
    return decodeJwt(getAccessToken());
};

const getAccessToken = () => {
    return localStorage.getItem("accessToken") || "";
};

const getRefreshToken = () => {
    return localStorage.getItem("refreshToken") || "";
};

const isTokenValid = (token) => {
    try {
        const decoded = decodeJwt(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch (e) {
        return false;
    }
};

const refreshAccessToken = async () => {
    try {
        if (!isTokenValid(getAccessToken())) {
            const res = await AuthAgent.refreshToken({refresh: getRefreshToken()});
            localStorage.setItem("accessToken", res.data.access);
        }
    } catch (e) {
        logoutUser();
        window.location = "/login";
    }
};

const getUserRole = () => {
    return localStorage.getItem("userRole") || "";
};

const isAdmin = () => {
    const userRole = getUserRole();
    return userRole === "AD";
};

const isVerifiedUser = () => {
    const userRole = getUserRole();
    return userRole === "US" || userRole === "AD";
};

export {
    isAdmin,
    isVerifiedUser,
    getAccessToken,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getUserDetails
};