import {useState,useEffect} from 'react';
import reactDom from 'react-dom';
import { useToastPortal } from '../custom hooks';
import uniqid from 'uniqid';
import { forwardRef ,useImperativeHandle} from 'react';
import { useResponsive } from '../custom hooks/useResponsive';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
const ToastPortal = forwardRef(({p},ref)=>{
     const {isSm} = useResponsive({smMaxWidth:760})
    
    const {loaded,portalId} = useToastPortal({isSm});
    const modeToStyle ={
        Error:{ bg: 'bg-red-50', border: 'border-l-4 border-l-red-500', text: 'text-red-800' },
        Alert:{ bg: 'bg-blue-50', border: 'border-l-4 border-l-[#5375E2]', text: 'text-blue-800' }
    }
    const modeToIcon = {
        Error: AlertCircle,
        Alert: CheckCircle
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
          <div className='w-fit h-fit flex flex-col space-y-3'> {/*toasts container*/}
                {
                    toasts.map(tst=>{
                        const style = modeToStyle[tst.mode];
                        const IconComponent = modeToIcon[tst.mode];
                        const iconColor = tst.mode === 'Error' ? '#EF4444' : '#5375E2';
                        
                        return(
                            <div 
                                key={tst.id}
                                className={`${style.bg} ${style.border} ${style.text} w-[80vw] sm:w-[320px] rounded-lg shadow-lg p-4 flex items-start gap-3 cursor-pointer transition-all duration-300 hover:shadow-xl active:scale-95 animate-in fade-in slide-in-from-right-4 duration-300`}
                                onClick={(e)=>removeTost(tst.id)}
                            >
                                <div className='flex-shrink-0 mt-0.5'>
                                    <IconComponent className='w-5 h-5' style={{color: iconColor}} strokeWidth={2.5} />
                                </div>
                                <div className='flex-1 flex flex-col gap-1'>
                                    <div className='font-semibold text-sm'>{tst.mode}</div>
                                    <div className='text-sm leading-relaxed font-roboto'>{tst.text}</div>
                                </div>
                                <button 
                                    onClick={(e)=>{e.stopPropagation(); removeTost(tst.id)}}
                                    className='flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors'
                                >
                                    <X className='w-4 h-4' strokeWidth={2} />
                                </button>
                            </div>

                        )
                    })
                }
          </div>
        ,document.getElementById(portalId))):(<></>)
    
})

export default ToastPortal;