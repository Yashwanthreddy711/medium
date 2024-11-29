import { Hono } from "hono"

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@yashwanth711/medium-zod-types";


export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	},
    Variables:{
        userId:string;
    }
}>();

blogRouter.use("/*",async(c,next)=>{
    const authHeader=c.req.header("authorization")||"";
    const user=await verify(authHeader,c.env.JWT_SECRET);
    if(user){
        c.set("userId",user.id as string)
        await next();
    }
  


})
blogRouter.post('/',async(c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate()) 
      const body= await c.req.json();
      const authorId=c.get("userId")
      const {success}=createBlogInput.safeParse(body)
    if(!success){
      return c.json({error:"Invalid Inputs"},403);
    }

      const blog=await prisma.post.create({

        data:{
            title: body.title,
            content:body.content,
            authorId:authorId
        }

      })
      return c.json({id:blog.id});
  })
  
  blogRouter.put('/',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate()) 
      const body= await c.req.json();
      const {success}=updateBlogInput.safeParse(body)
    if(!success){
      return c.json({error:"Invalid Inputs"},403);
    }

      const blog=await prisma.post.update({
        where:{
            id:body.id,
        },
        data:{
            title: body.title,
            content:body.content,
            
        }

      })
      return c.json({id:blog.id});
  })
  blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate()) 
      const body= await c.req.json();

      const blogs=await prisma.post.findMany();

      return c.json({blogs});
   
  })
  blogRouter.get('/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate()) 
      const id=  c.req.param("id");

      try{

      

      const blog=await prisma.post.findFirst({
        where:{
            id:id,
        }

      })
      return c.json({blog});
    }
    catch(err){
        return c.json({error:"Failed to get the blog"},411)
    }
    
  })
  