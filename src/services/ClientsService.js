import { notification } from "antd";
import axios from "axios";

const fetch = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 60000,
});

fetch.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let notificationParam = {
      message: "",
    };

    // Remove token and redirect
    if (error.response.status === 400 || error.response.status === 403) {
      notificationParam.message = "Authentication Fail";
      notificationParam.description = "Please login again";
    }

    if (error.response.status === 404) {
      notificationParam.message = "Not Found";
    }

    if (error.response.status === 500) {
      notificationParam.message = "Internal Server Error";
    }

    if (error.response.status === 508) {
      notificationParam.message = "Time Out";
    }

    notification.error(notificationParam);

    return Promise.reject(error);
  }
);

const clientsService = {};

clientsService.getClients = function () {
  return fetch({
    url: "/users",
    method: "get",
  });
};

// clientsService.setUserData = function (data) {
//   return fetch({
//     url: "/posts",
//     method: "post",
//     data: data,
//   });
// };

export default clientsService;
