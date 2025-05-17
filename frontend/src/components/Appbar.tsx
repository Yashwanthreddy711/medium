import { Avatar } from "./ui/Avatar"

export const Appbar=()=>{
    return (
        <div className="flex justify-between px-10 py-4 border-b">
            <div>
                Medium
            </div>
            <div>
                <Avatar name="Yashwanth"/>
            </div>
            

        </div>
    )
}