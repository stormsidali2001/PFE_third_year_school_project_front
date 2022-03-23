import ToastPortal from '../components/ToastPortal'
import '../styles/globals.css'
import {useRef} from 'react'

function MyApp({ Component, pageProps }) {
  const toastsRef = useRef();
  return(
    <>
      <Component {...pageProps} toastsRef={toastsRef} />
      <ToastPortal ref={toastsRef} />
    </>
  ) 
}

export default MyApp
