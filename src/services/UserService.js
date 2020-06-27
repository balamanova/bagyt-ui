import axios from "axios";
import { API_URL, API_URL_REAL, ACCESS_TOKEN,
  AUTHORITY,
  USER_NAME_SESSION_ATTRIBUTE_NAME, } from "../util/Constants";

const API_URI = API_URL + "/user";
const API_URI_ADMIN = API_URI + "/university-admin";

export const authenticate = (data) => {
  return axios({
    method: "post",
    url: API_URL_REAL + "/authenticate",
    data: data,
  }).then((res) => res.data);
};

export const getUniversityByUser = () => {
  const email = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  return axios.get(`${API_URI_ADMIN}/email`, {
    params: { email },
  }).then((res) => res.data);
}
  
export const registerSuccessfulLoginForJwt = (username, token, authority) => {
  console.log("authority" , authority)
  sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  sessionStorage.setItem(ACCESS_TOKEN, token);
  sessionStorage.setItem(AUTHORITY, authority)
}

export const hasEditorAuthority = () => {
  const authority = sessionStorage.getItem(AUTHORITY)
  return authority === AUTHORITY ? true : false
}

export const logout = () => {
  sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
}

export const isUserAdmin = () =>  {
  const authority = sessionStorage.getItem(AUTHORITY);
  console.log("authority ", authority)
  if (authority === 'ADMIN') return true;
  return false;
}

export const isUserLoggedIn = () => {
  let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  if (user === null) return false;
  return true;
}

export const getLoggedInUserName = () =>  {
  let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  if (user === null) return '';
  return user;
}


export const createUniversityAdmin = (data) => {
  return axios({
    method: "post",
    url: API_URI_ADMIN,
    data: data,
  });
};

export const getUniversityAdmins = () =>
  axios.get(API_URI_ADMIN).then((res) => res.data);

export const resetPassword = (id, data) => {
  return axios({
    method: "put",
    url: API_URI + "/reset/" + id,
    data: data,
  });
};

export const deleteUser = (id) => {
  return axios({
    method: "delete",
    url: `${API_URI}/${id}`,
  });
};
