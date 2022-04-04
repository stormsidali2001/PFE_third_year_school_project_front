import { useState ,useEffect} from "react"

export const useOutSideContainer = ({ref})=>{
    const [open,setOpen] = useState(false);
    useEffect(()=>{
        const handleMouseDown = e=>{
            if(ref.current &&  !ref.current.contains(e.target)){
                open && setOpen(false);
                console.log(open)            }
        }
        document.addEventListener('mousedown',handleMouseDown);
        return ()=>document.removeEventListener('mousedown',handleMouseDown);
    },[open])

    return {open,setOpen}
}

