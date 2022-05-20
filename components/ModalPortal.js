import { forwardRef,useImperativeHandle,useState } from "react";
import reactDom from "react-dom";
import { useModalPortal } from "../custom hooks/useModalPortal"

const ModalPortal = ({open ,handleClose,children,styles})=>{
   
    
  
   
    return (
    
           
              open&&<div className={` transition-transform bg-white p-4 shadow-lg fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  ${styles} z-50`}>
                        <div onClick={(e)=>handleClose(false)} className="absolute right-2 top-2 text-black cursor-pointer -translate-y-1/2 -translate-x-1/2">x</div>
                        {children}
                </div>
           
           
    
    )
}

export default ModalPortal;