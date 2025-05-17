import { Avatar } from "./ui/Avatar"

interface BlogCardProps{
    authorName:string,
    title:string,
    content:string,
    publishedDate:string

}
export const BlogCard=({
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps)=>{
    return (
        <div className="">
            <div className="flex gap-2 p-4">
                <div className="flex items-center justify-center">
                <Avatar name={authorName}/>
                </div>
              
               <div className="flex items-center justify-center font-extralight">{authorName} </div>
               <div className="flex items-center justify-center text-md font-extralight">{publishedDate}</div>. 
            </div>
            <div className="px-4 text-xl font-bold">
                {title}
            </div>
            <div className="px-4 font-thin text-md">
                {content.slice(0,100)+"..."}
            </div>
            <div className="w-full px-4 text-sm font-thin text-slate-400">
                {`${Math.ceil(content.length/100)} min read`}
            </div>
            <div className="w-full py-2 border-b-2 border-slate-200 "></div>
        </div>
    )
}