import { forwardRef,useImperativeHandle,useState } from "react";
import reactDom from "react-dom";
import { useModalPortal } from "../custom hooks/useModalPortal"
import { X } from 'lucide-react'

const ModalPortal = ({open ,handleClose,children,styles})=>{
   
    
  
   
    return (
       open && (
           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
               <div className={`relative bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${styles || ''}`}>
                   {/* Close Button */}
                   <button 
                       onClick={() => handleClose(false)}
                       className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-50"
                       aria-label="Close"
                   >
                       <X className="w-5 h-5" style={{color: '#1A2562'}} />
                   </button>
                   {children}
               </div>
           </div>
       )
    )
}

export default ModalPortal;