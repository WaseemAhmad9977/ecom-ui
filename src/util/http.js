import axios from 'axios'
const ENV = import.meta.env

const http = axios.create({
     baseURL:'http://localhost:8080',
     withCredentials: true,
})

export default http