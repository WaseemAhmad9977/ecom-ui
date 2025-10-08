import axios from 'axios'

const http = axios.create({
     baseURL:'https://ecom-backend-kg4c.vercel.app',
     withCredentials: true,
})

export default http