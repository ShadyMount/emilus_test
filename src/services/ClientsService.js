import fetch from "auth/FetchInterceptor";

const clientsService = {};

clientsService.getClients = function () {
  return fetch({
    url: "/users",
    method: "get",
  });
};

clientsService.setUserData = function (data) {
  return fetch({
    url: "/posts",
    method: "post",
    data: data,
  });
};

export default clientsService;
