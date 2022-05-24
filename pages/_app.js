import ToastPortal from '../components/ToastPortal'
import '../styles/globals.css'
import {useEffect, useRef} from 'react'
import {StoreProvider} from 'easy-peasy'
import {store} from '../store'
import Layout from '../components/Layout'


function MyApp({ Component, pageProps }) {
  
  const toastsRef = useRef();
  
  

  
  return(
    <StoreProvider store={store} >
        <Layout toastsRef={toastsRef}>
          <Component {...pageProps} toastsRef={toastsRef} />
          <ToastPortal ref={toastsRef} />
        </Layout>
      </StoreProvider>
  ) 
}




export default MyApp
