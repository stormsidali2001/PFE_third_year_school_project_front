import {useState,useEffect} from 'react';
import reactDom from 'react-dom';
import { useToastPortal } from '../custom hooks';
import uniqid from 'uniqid';
import { forwardRef ,useImperativeHandle} from 'react';
import { useResponsive } from '../custom hooks/useResponsive';
import ErrorIcon from '../icons/ErrorIcon';
const ToastPortal = forwardRef(({p},ref)=>{
     const {isSm} = useResponsive({smMaxWidth:760})
    
    const {loaded,portalId} = useToastPortal({isSm});
    const modeToStyle ={
        Error:'bg-red-500/70',
        Alert:'bg-[#5375E2]/80'
    }
    const [toasts,setToasts] = useState([]);
    const [removing,setRemoving] = useState('');
    const removeTost = id=>setToasts(toasts.filter(tst=>tst.id!= id))
  
    useEffect(()=>{ 
            if(removing && toasts.length >0){
                console.log(removing)
                const id = removing;
              
                setToasts(toasts.filter(tst=>tst.id!= id))
                setRemoving('')
            }

    },[removing])
    useEffect(()=>{
        if(toasts.length >0){

            setTimeout(()=>{
                setRemoving(toasts[toasts.length-1].id)
            },7000)
        }
           
    },[toasts])
    useImperativeHandle(ref,()=>({
        addMessage(tst){
            toasts.length<=4 &&setToasts([...toasts,{...tst,id:uniqid()}])

        }
    }
        
    ))
    return loaded?  (reactDom.createPortal(
          <div className='w-fit h-fit flex flex-col space-y-4'> {/*toasts container*/}
                {
                    toasts.map(tst=>{
                        return(
                            <div 
                                key={tst.id}
                                className={`${modeToStyle[tst.mode]} space-x-4 border-l-2 border-l-white text-white w-[80vw] sm:w-[300px] min-h-[70px] flex items-center  font-semibold text-[20px] relative cursor-pointer transition-all px-1`}
                                onClick={(e)=>removeTost(tst.id)}
                            >
                                <div className='absolute  right-[5px] top-[10px] text-white -translate-x-1/2  -translate-y-1/2 cursor-pointer'>x</div>
                                <ErrorIcon
                                    className='w-10 text-white'
                                />
                                <div className='flex flex-col -space-y-1'>
                                    <div>{tst.mode}:</div>
                                    <div className='font-light text-[14px]'>{tst.text}</div>
                                </div>
                                
                            </div>

                        )
                    })
                }
          </div>
        ,document.getElementById(portalId))):(<></>)
    
})

export default ToastPortal;