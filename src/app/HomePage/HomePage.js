import Head from "next/head";

import Navbar from '../components/Navbar'
import HeroSection from '../components/Heroes'


export default function HomePage() {

  return (

    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar/>
      <HeroSection/>
    </>


  )
}