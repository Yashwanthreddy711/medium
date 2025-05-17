import { Link, useNavigate } from "react-router-dom"
import { Input } from './ui/Input';
import { useState } from "react";
import { SignUpInput } from "@yashwanth711/medium-zod-types";
import { Button } from './ui/Button';
import { BACKEND_URL } from "../config";
import axios from 'axios';


export const Auth=({type}:{type:"signup" | "signin"})=>{
    const navigate=useNavigate();

    const [authInputs,setAuthInputs]=useState<SignUpInput>({
        name:"",
        email:"",
        password:""

    })
   

    async function sendRequest(){
        try{
            const response=  await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,authInputs);
            const jwt=response.data;
            localStorage.setItem('token',jwt.token);
            navigate("/blogs")

        }
        catch(e){

        }
      
    }


    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="flex justify-center">
                  <div className="w-96" >
                     <div className="text-3xl font-extrabold text-center ">Create an account</div>
                     <div className="text-center text-slate-400">
                        {type==="signin" ?"Don't have an account?":" Already have an account?"
                        }
                     
                        <Link className="pl-2 underline" to={type==="signin"?"/signup":"/signin"} >{type==="signin" ? "Signup": "Login"}</Link>
                     </div>
                   { type==="signup"? <Input  label="Name" type="name" placeholder="Yashwanth" onChange={(e)=>{
                        setAuthInputs(c=>(
                            {
                                ...c,
                                name:e.target.value
                            }
                        ))
                     }} />:null}
                     <Input label="Email" type="email" placeholder="yashwanth@gmail.com" onChange={(e)=>{
                        setAuthInputs(c=>(
                            {
                                ...c,
                                email:e.target.value
                            }
                        ))
                     }} />
                       <Input label="Password" type="password" placeholder="123456" onChange={(e)=>{
                        setAuthInputs(c=>(
                            {
                                ...c,
                                password:e.target.value
                            }
                        ))
                     }} />
                    <Button onClick={sendRequest} text={type==="signup"?"Sign Up":"Sign in"}/>
                  </div>

            </div>

        </div>
    )
}