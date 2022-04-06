import { forwardRef } from "react";
import DotedMessageIcon from "../icons/DotedMessageIcon";
import DotsIcon from "../icons/DotsIcon";

const LastMessages = forwardRef(({open},ref)=>{
  
    return(
        <div ref={ref} className={`absolute font-roboto bg-white rounded-[10px] w-[400px] h-fit pt-2 pb-2 drop-shadow-[2px_5px_4px_rgba(0,0,0,0.25)] flex flex-col right-0 bottom-0 translate-y-[102%]   space-y-2 ${open?'scale-100':'scale-0'}`}>

        <div className="absolute right-2 top-2 w-fit p-1 aspect-square rounded-full bg-[#CAEAFE] text-[12px] flex justify-center items-center font-medium">
                +<span className="">50</span>
        </div>

        <div className="text-[#1A2562] text-[24px] font-[400] flex space-x-2 items-center mx-auto"><DotedMessageIcon className='w-[40px] text-[#1A2562]/20'/><span>Messages:</span></div>
        {
          <>
                    <div className="ml-4 relative w-fit">
                        Team:
                        <div className="absolute right-0 top-[50%] translate-y-[-50%] translate-x-[120%] w-fit p-1 aspect-square rounded-full bg-[#CAEAFE] text-[12px] flex justify-center items-center font-medium">
                            +<span className="">25</span>
                      </div>

                    </div>
                    <div className="h-[60px] w-[90%] rounded-[5px] bg-[#E4F1F9] text-[14px] px-2 py-2  font-normal relative mx-auto">
                    houda debza accepted your invitation . a new team was created.
                    <div className="absolute bottom-[1px] right-2 text-[12px] text-[#1A2562]/60">at: {new Date().toLocaleString()}</div>
                    </div>
                    <div className="flex text-[13px] items-center space-x-1 group mx-auto">
                        <DotsIcon 
                            className='w-[28px] text-[#1A2562]/60 font-medium cursor-pointer group-hover:text-[#1A2562]/30 transition-all ease-in'

                        />
                    <span className="cursor-pointer group-hover:underline underline-offset-1 transition-all ease-in decoration-[#1A2562]/60">More  messages</span> 
                   </div>
                    <div className="ml-4 relative w-fit">
                        Team {'&'} teachers:
                        <div className="absolute right-0 top-[50%] translate-y-[-50%] translate-x-[120%] w-fit p-1 aspect-square rounded-full bg-[#CAEAFE] text-[12px] flex justify-center items-center font-medium">
                            +<span className="">25</span>
                      </div>
                    </div>
                    <div className="h-[60px] w-[90%] rounded-[5px] bg-[#E4F1F9] text-[14px] px-2 py-2  font-normal relative mx-auto">
                        houda debza accepted your invitation . a new team was created.
                        <div className="absolute bottom-[1px] right-2 text-[12px] text-[#1A2562]/60">at: {new Date().toLocaleString()}</div>
                    </div>
                        <div className="flex text-[13px] items-center space-x-1 group mx-auto">
                        <DotsIcon 
                            className='w-[28px] text-[#1A2562]/60 font-medium cursor-pointer group-hover:text-[#1A2562]/30 transition-all ease-in'

                        />
                    <span className="cursor-pointer group-hover:underline underline-offset-1 transition-all ease-in decoration-[#1A2562]/60">more  messages</span> 
                   </div>
          </>

             
        }
      
      
       

    </div>
    )
}
)
export default LastMessages;