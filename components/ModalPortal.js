import { forwardRef,useImperativeHandle,useState } from "react";
import reactDom from "react-dom";
import { useModalPortal } from "../custom hooks/useModalPortal"

const ModalPortal = ({open ,handleClose,children})=>{
    const {loaded,modalId} = useModalPortal();
    
  
   console.log('111111111111111111')
   
    return (
       loaded?reactDom.createPortal(
            <div className="w-fit h-fit ">
                <div className={`${open?'scale-100':'scale-0'} transition-all bg-white p-4 shadow-lg relative `}>
                        <div onClick={(e)=>handleClose(false)} className="absolute right-2 top-2 text-black cursor-pointer -translate-y-1/2 -translate-x-1/2">x</div>
                        {children}
                </div>
            </div>
            ,
            document.getElementById(modalId)
        ):<></>
    
    )
}

export default ModalPortal;