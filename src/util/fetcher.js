import axios from "axios";
axios.defaults.baseURL='https://ecom-backend-kg4c.vercel.app'
const fetcher = async (url)=>{
    const {data} = await axios.get(url)
    return data
}

export default fetcher 