import axios from 'axios'

export default axios.create({
  baseURL: 'http://www.emsifa.com/api-wilayah-indonesia/api/'
}, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    crossDomain: true
  }
})
