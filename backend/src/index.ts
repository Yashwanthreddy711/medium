import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.post('/api/v1/signup',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate()) 
  const body= await c.req.json();

  try{

  

  const response=await prisma.user.create({
    data:{
      email:body.email,
      name:body.name,
      password:body.password
    }
  })
  if(response){
    
    const secret="Yashwanth"
     const token=await sign({id:response.id},c.env.JWT_SECRET)
     return c.json({ token: token}, 200);
      
  }
}
 
catch(err){
  //@ts-ignore
  return c.json({message:"Bad Auth"},403)

}

  
})
app.post('/api/v1/signin',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate()) 
  const body= await c.req.json();

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
app.post('/api/v1/blog',(c)=>{
  return c.text('Hello Hono!')
})

app.put('/api/v1/blog',(c)=>{
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog',(c)=>{
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/:id',(c)=>{
  return c.text('Hello Hono!')
})
export default app
