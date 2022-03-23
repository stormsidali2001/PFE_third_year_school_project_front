import {useState,useEffect} from 'react';
import uniqid from 'uniqid'

export const useToastPortal = ({isSm})=>{
    const [loaded,setLoaded] = useState(false)
    const [portalId,setPortalId] = useState(`Toast_portal_${uniqid()}`)
    useEffect(()=>{
       if(loaded){
            const div =  document.getElementById(portalId);
            div.style.cssText = `
            position:fixed;
            transform:translate(-50%,0);
            top:10px;
           
            ${isSm?'left:25vw;':'left:50vw;'} 
           
    `
          !isSm && (div.style.transform = 'transform:translate(-50%,0);')
       }
       
    },[isSm])

    useEffect(()=>{
        const div = document.createElement('div');
        div.id = portalId;
        div.style.cssText = `
        position:fixed;
        transform:translate(-50%,0);
        top:10px;
       
        ${isSm?'left:25vw;':'left:50vw;'} 
       
`
      !isSm && (div.style.transform = 'transform:translate(-50%,0);')
        
        
        const body = document.getElementsByTagName('body')[0];
        body.prepend(div);
        setLoaded(true);
        return ()=>body.remove(div)
    },[portalId])

    return {loaded , portalId};
}

