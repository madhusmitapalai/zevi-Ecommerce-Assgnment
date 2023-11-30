import axios from "axios";
import Cookies from "js-cookie";

const accessToken = Cookies.get("accessToken");

export const client = axios.create({
  withCredentials: false,
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
  },
});

const request = async function (options) {
  const onSuccess = function (response) {
    return response.data;
  };

  const handleStatusCode = function (statusCode) {
    switch (statusCode) {
      case 200:
        console.log("statusCode : 200");
        break;
      case 404:
        console.log("statusCode : 404");
        break;
      case 500:
        console.log("statusCode : 500");
        break;
      case 403:
        console.log("statusCode : 404");
        break;
      default:
        break;
    }
  };

  const onError = function (error) {
    if (error.response) {
      handleStatusCode(error.response.status);
    } else {
      console.log("error message:", error.message);
    }
    return Promise.reject(error.response || error.message);
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export const GetAPIRequest = (options) => {
  const { url, ...otherOptions } = options;

  return request(
    {
      url: url,
      withCredentials: false,
      method: "GET",
      ...otherOptions,
    },
    true
  );
};

export const PostAPIRequest = (options) => {
  const { url, ...otherOptions } = options;

  return request({
    url: url,
    withCredentials: false,
    method: "POST",
    body: JSON.stringify(options.data),
    ...otherOptions,
  });
};
export const PatchAPIRequest = (options) => {
  const { url, ...otherOptions } = options;

  return request({
    url: url,
    withCredentials: false,
    method: "PATCH",
    body: JSON.stringify(options.data),
    ...otherOptions,
  });
};

export const PutAPIRequest = (options) => {
  const { url, ...otherOptions } = options;

  return request({
    url: url,
    withCredentials: false,
    method: "PUT",
    ...otherOptions,
  });
};

export const DeleteAPIRequest = (options) => {
  const { url, ...otherOptions } = options;

  return request({
    url: url,
    withCredentials: false,
    method: "DELETE",
    ...otherOptions,
  });
};

export default request;
