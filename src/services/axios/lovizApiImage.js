import * as axios from 'axios'

const BASE_URL = 'http://localhost:8000'

function upload (formData) {
  const url = `${BASE_URL}/comentarioimgs/`
  return axios.post(url, formData)
  .then(res => res.data)
  .catch(err => err.data)
}

export { upload }
