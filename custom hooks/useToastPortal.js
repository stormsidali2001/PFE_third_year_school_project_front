import {useState,useEffect} from 'react';
import uniqid from 'uniqid'

export const useToastPortal = ({isSm})=>{
    const [loaded,setLoaded] = useState(false)
    const [portalId,setPortalId] = useState(`Toast_portal_${uniqid()}`)
    
    useEffect(()=>{
       if(loaded && typeof document !== 'undefined'){
            const div = document.getElementById(portalId);
            if(div){
                div.style.cssText = `
                position:fixed;
                transform:translate(-50%,0);
                top:70px;
                z-index:50;
               
                ${isSm?'left:25vw;':'left:50vw;'} 
               
        `
              !isSm && (div.style.transform = 'transform:translate(-50%,0);')
            }
       }
       
    },[isSm, loaded])

    useEffect(()=>{
        if(typeof document === 'undefined') return;
        
        const div = document.createElement('div');
        div.id = portalId;
        div.style.cssText = `
        position:fixed;
        transform:translate(-50%,0);
        top:70px;
        z-index:50;
       
        ${isSm?'left:25vw;':'left:50vw;'} 
       
`
      !isSm && (div.style.transform = 'transform:translate(-50%,0);')
        
        const body = document.getElementsByTagName('body')[0];
        if(body){
            body.appendChild(div);
        }
        setLoaded(true);
        
        return ()=>{
            if(body && div.parentNode){
                body.removeChild(div);
            }
        }
    },[portalId, isSm])

    return {loaded , portalId};
}

