import axios from 'axios';
import {isAdmin, isVerifiedUser, getAccessToken, refreshAccessToken} from './utils';

import {API_URL} from './constants/';

const includeToken = () => {
    const accessToken = getAccessToken();
    return {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
};

const agent = async (path, data, reqType, includeHeader = true, attemptRefresh=true) => {
    let reqURL = `${API_URL}/${path}`;
    let res = null;
    let config = {};
    if (attemptRefresh) {
        await refreshAccessToken();
    }
    if (includeHeader) {
        config = includeToken();
    }
    if (reqType === "get") {
        config.params = data;
        res = await axios({
            method: "get",
            url: reqURL,
            ...config,
            data: data
        })
    } else {
        res = await axios({
            method: reqType,
            url: reqURL,
            data: data,
            ...config
        })
    }
    return res;
};

export const AuthAgent = {
    googleLogin: data => agent("auth/google/", data, "post", false, false),
    refreshToken: data => agent("auth/token/refresh/", data, "post", false, false),
};

export const AdminAgent = {
    getVerifiedUsers: () => agent("admin/verified-users/", {}, 'get'),
    getUnverifiedUsers: () => agent("admin/unverified-users/", {}, 'get'),
    unverifyUser: data => agent("admin/unverify/", data, "post"),
    verifyUser: data => agent("admin/verify/", data, "post"),
    addRoom: data => agent("room/add/", data, "post"),
    getRooms: () => agent("room/", {}, 'get'),
    addUser: (data) => agent("admin/create/", data, "post"),
    updateSettings: (data) => agent("settings/update/", data, "post"),
};

export const UserAgent = {
    getRooms: () => agent("room/", {}, 'get'),
    getEvents: (data) => agent("booking/", data, "post"),
    createEvent: (data) => agent("booking/new/", data, "post"),
    deleteEvent: (data) => agent("booking/delete/", data, "post"),
    getSettings: () => agent("settings/", {}, "get")
};

export default agent;