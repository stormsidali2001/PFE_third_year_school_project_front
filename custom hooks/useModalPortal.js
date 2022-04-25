import { useEffect, useState } from "react";
import uniqid from 'uniqid'
export const useModalPortal = props=>{
    const [modalId,setModalId] = useState(`Modal_portal_${uniqid()}`);
    const [loaded,setLoaded] = useState(false);

    useEffect(()=>{
        setLoaded(false);
        const div = document.createElement('div');
        div.style.cssText = `
            position:fixed;
            left:50vw;
            top:50vh;
            transform:translate(-50%,-50%);
            z-index:50;
        `
        div.id  = modalId;
         
        const body = document.getElementsByTagName('body')[0];
        body.append(div);
        setLoaded(true);
        return ()=>body.remove(div)
    },[modalId])

    return {loaded,modalId}
}