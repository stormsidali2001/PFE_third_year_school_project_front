import DocumentIcon from "../icons/documentIcon"

const Document = ({file,onClick})=>{
    return (
        <div 
            className=" w-fit flex flex-col hover:scale-105 cursor-pointer transition-transform ease-in"
            onClick={onClick}
        
        >
        <div className=" bg-gray-100 flex justify-center items-center p-4 w-fit">
           
           <DocumentIcon
               className='w-8'
           />
           
       </div>
       <div className="w-full  text-center  break-words text-sm">{file.name}</div>
   </div>
    )
}
export  default Document;