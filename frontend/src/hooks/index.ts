import { useEffect, useState } from "react"
import axios from 'axios'
import { BACKEND_URL } from "../config";

export const useBlogs=()=>{
    const [loading,setLoading]=useState(true);
    const [blogs,setBlogs]=useState([])
    async function fectchData(){
        const response= await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        });
        setBlogs(response.data.blogs);
        setLoading(false);

    }
    useEffect(()=>{
        fectchData();
  
        

    },[])
    return {
        loading,
        blogs
    }
}