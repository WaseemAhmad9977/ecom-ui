import axios from "axios";
axios.defaults.baseURL='http://localhost:8080'
const fetcher = async (url)=>{
    const {data} = await axios.get(url)
    return data
}

export default fetcher 