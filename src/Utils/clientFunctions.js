import axios from "axios";


export const getData = (url, setState) => {
  axios
    .get(url)
    .then((response) => {
      setState(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
};
