import { forwardRef,useImperativeHandle,useState } from "react";
import reactDom from "react-dom";
import { useModalPortal } from "../custom hooks/useModalPortal"

const ModalPortal = ({open ,handleClose,children,styles})=>{
    const {loaded,modalId} = useModalPortal();
    
  
   
    return (
       loaded?reactDom.createPortal(
            <div className=" ">
              {  open&&<div className={` transition-transform bg-white p-4 shadow-lg relative  ${styles} `}>
                        <div onClick={(e)=>handleClose(false)} className="absolute right-2 top-2 text-black cursor-pointer -translate-y-1/2 -translate-x-1/2">x</div>
                        {children}
                </div>}
            </div>
            ,
            document.getElementById(modalId)
        ):<></>
    
    )
}

export default ModalPortal;