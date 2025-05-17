type InputProps={
    label:string,
    placeholder:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    type?:string
}
export const Input=({label,placeholder,type,onChange}:InputProps)=>{
    return (
       

<div className="mt-2">
            <label htmlFor="first_name"  className="block mb-2 text-sm font-medium text-black ">{label}</label>
            <input onChange={onChange} type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder={placeholder} required />
        </div>


        
    )
}