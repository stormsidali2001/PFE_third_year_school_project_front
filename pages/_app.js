import ToastPortal from '../components/ToastPortal'
import '../styles/globals.css'
import {useEffect, useRef} from 'react'
import {StoreProvider} from 'easy-peasy'
import {store} from '../store'
import Layout from '../components/Layout'
import HorisontalNavbar from '../components/HorisontalNavbar'
import AdminVerticalNavbar from '../components/AdminVerticalNavbar'
import TeacherVerticalNavbar from '../components/TeacherVerticalNavbar'
import StudentVerticalNavbar from '../components/StudentVerticalNavbar'

function MyApp({ Component, pageProps }) {
  
  const toastsRef = useRef();
  
  

  
  return(
    <StoreProvider store={store} >
        <Layout toastsRef={toastsRef} 
          HorisontalNavbar={HorisontalNavbar}
          AdminVerticalNavbar={AdminVerticalNavbar}
          TeacherVerticalNavbar={TeacherVerticalNavbar}
          StudentVerticalNavbar={StudentVerticalNavbar}
        >
          <Component {...pageProps} toastsRef={toastsRef} />
          <ToastPortal ref={toastsRef} />
        </Layout>
      </StoreProvider>
  ) 
}




export default MyApp
