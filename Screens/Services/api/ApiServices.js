import { Config } from "../../Config";
import axios from "axios"

export async function AUTH(method, path, data) {

  try {
    let url = Config.base_url + path;
    console.log(url,'url')
    console.log("api",data)
    const response = await axios({
      method, url, data, headers:{
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    } });
     console.log(response,'check')
    return response.data
  } catch (e) {
    console.log(e,'error')
    return e.response
       
  }
}
