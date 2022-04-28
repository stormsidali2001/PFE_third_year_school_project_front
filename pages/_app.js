import ToastPortal from '../components/ToastPortal'
import '../styles/globals.css'
import {useEffect, useRef} from 'react'
import {StoreProvider} from 'easy-peasy'
import {store} from '../store'


function MyApp({ Component, pageProps }) {
  
  const toastsRef = useRef();
  
  

  
  return(
    <StoreProvider store={store} >
        <Component {...pageProps} toastsRef={toastsRef} />
        <ToastPortal ref={toastsRef} />
    </StoreProvider>
  ) 
}




export default MyApp
