import axios from "axios";
import { API_URL } from "../util/Constants";

const API_URI = API_URL + "/university";

export const getUniversities = (page, searchText) => {
  return axios
    .get(API_URI, {
      params: { page, searchText },
    })
    .then((response) => response.data);
};

export const getAllUniversity = () =>
  axios.get(API_URI + "/all").then((response) => response.data);

export const getUniversityById = (id) => {
  return axios.get(API_URI + "/" + id).then((response) => response.data);
};

export const updateUniversity = (id, data) => {
  return axios({
    method: "put",
    url: API_URI + "/" + id,
    data: data,
  });
};

export const getMajorList = () =>
  axios.get(API_URL + "/major").then((response) => response.data);
