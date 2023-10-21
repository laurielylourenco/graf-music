import Head from "next/head";

import Navbar from './Navbar'
import HeroSection from './Heroes'


export default function Home() {



  return (

    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
      </Head>

      <Navbar />
      <HeroSection />

    </>


  )
}
