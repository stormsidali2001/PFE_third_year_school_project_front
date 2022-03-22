import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Acceuil from '../components/Acceuil'
import Navbar from '../components/AcceuilNavbar'
import WhatIs from '../components/WhatIsProject101'
import Offer from '../components/WhatItCanOffer'
import WhyUse from '../components/WhyToUseProject101'

import styles from '../styles/Home.module.css'


export default function Home() {
  
  const [open , setOpen] = useState(false);
  return (
    <div className=' h-full bg-background scroll-smooth'>
      <Navbar open={open} setOpen={setOpen}/>
      <Acceuil  id='what'/>
      <WhatIs id = 'whyuse'/>
      <WhyUse/>
      <Offer id='service'/>
    </div>
  )
}
