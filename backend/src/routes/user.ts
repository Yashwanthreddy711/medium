import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signUpInput } from "@yashwanth711/medium-zod-types";





export const userRouter=new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();

userRouter.post('/signup',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate()) 
    const body= await c.req.json();
    const {success}=signUpInput.safeParse(body)
    if(!success){
      return c.json({error:"Invalid Inputs"},403);
    }
  
    try{
    const response=await prisma.user.create({
      data:{
        email:body.email,
        name:body.name,
        password:body.password
      }
    })
    if(response){
      
      
       const token=await sign({id:response.id},c.env.JWT_SECRET)
       return c.json({ token: token}, 200);
        
    }
  }
   
  catch(err){
    //@ts-ignore
    return c.json({message:"Bad Auth"},403)
  
  }
  
    
  })
  userRouter.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate()) 
    const body= await c.req.json();
    const {success}=signinInput.safeParse(body)
    if(!success){
      return c.json({error:"Invalid Inputs"},403);
    }
    
    try{
      const user=await prisma.user.findFirst({
        where: {
          email: body.email,
          password:body.password
        }
      })
      if(user){
        const token= await sign({id:user.id},c.env.JWT_SECRET)
        return c.json({token:token})
      }
      else{
         return c.json({message:"Bad Auth"},403)
      }
      
  
    }
    catch(err){
      return c.json({message:"Server Issue"},400)
    }
    
  
    
  })