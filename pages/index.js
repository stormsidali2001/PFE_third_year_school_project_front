import Head from 'next/head'
import Image from 'next/image'
import Acceuil from '../components/Acceuil'
import Navbar from '../components/AcceuilNavbar'

import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className=' h-[200vh] w-[100vw]'>
      <Navbar/>
      <Acceuil/>
    </div>
  )
}
