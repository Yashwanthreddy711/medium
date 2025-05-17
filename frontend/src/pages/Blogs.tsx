import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs=()=>{
    const {loading,blogs}=useBlogs();
    if(loading){
        return <div>
            loading ...
        </div>
    }
    return (
        <div>
             <Appbar/>
        
        <div className="flex justify-center">
           
        <div className="flex justify-center max-w-xl">
            <BlogCard 
            authorName="Yashwanth "
            title="Yashwanth is the king there is no one to stop him "
            content="Yashwanth is the king there is no one to stop him Yashwanth is the king there is no one to stop him Yashwanth is the king there is no one to stop him Yashwanth is the king there is no one to stop him Yashwanth is the king there is no one to stop him Yashwanth is the king there is no one to stop him "
            publishedDate="30-11-2024"/>
        </div>
        </div>
        </div>
    )
}