import {useState,useEffect} from 'react';
import {uniqid} from 'uniqid'
const ToastPortal = props=>{
    const [loaded,setLoaded] = useState(false)
    const [portalId,setPortalId] = useState(`Toast_portal_${uniqid()}`)

    useEffect(()=>{
        const div = document.createElement('div');
        div.id = portalId;
        const body = document.getElementsByTagName('body')[0];
        body.prepend(div);
        setLoaded(true);
    },[])
    return(
      ReactDOM.createPortal(
          <div className='w-screen h-screen bg-black'>

          </div>
        ,document.getElementById(portalId))
    )
}