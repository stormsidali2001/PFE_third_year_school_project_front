import Head from 'next/head'
import Image from 'next/image'
import Acceuil from '../components/Acceuil'
import ForgotPassword from '../components/ForgotPassword'
import Login from '../components/Login'
import ResetPasword from '../components/ResetPassword'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div>
      <Login/>
    </div>
  )
}
