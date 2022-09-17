import axios from 'axios'

export default axios.create({
  baseURL: 'https://www.emsifa.com/api-wilayah-indonesia'
}, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    crossDomain: true
  }
})
