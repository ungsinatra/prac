import axios from "axios";
import { BASE_URL } from "../utils/constants";


export const  verifiedToken = async(jwt:string) =>{
  try {
      const res = await fetch(`http://158.160.28.109/api/users/me`,{
          method:"GET",
          headers:{
              authorization:`Bearer ${jwt}`,
              "Content-Type": "application/json; charset=UTF-8", 
          }
      })
      const data = await res.json();
      return data;
  } catch (error) {
      console.error(error)
  }
}
