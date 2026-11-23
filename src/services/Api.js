import axios from 'axios'

const API = 'https://word-api-hmlg.vercel.app'

const getValidateWord = (word) => {
  return axios
              .get(`${API}/api/validate`, { params: { word } })
              .then((response) => response.data.exists);
}

export default {
  getValidateWord,
}
