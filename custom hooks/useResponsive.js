import { useState ,useEffect} from "react"

export const useResponsive = ({smMaxWidth})=>{
    const [isSm,setIsSm] = useState(false); 

    useEffect(()=>{
        setIsSm(window.innerWidth >=smMaxWidth)
        const handleResize = ()=>{
            setIsSm(window.innerWidth >=smMaxWidth)
            console.log(isSm,window.innerWidth >=smMaxWidth)
          
        }
        window.addEventListener('resize',handleResize)
        
        return ()=> window.removeEventListener('resize',handleResize)
    },[])

    return {isSm}
}

