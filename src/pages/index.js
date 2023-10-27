
import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Script from 'next/script'
import HeroSection from '../app/components/Heroes'
import Navbar from '../app/components/Navbar'
import "bootswatch/dist/sketchy/bootstrap.min.css";

import Dash from '../app/dash/page'

const Home = () => {
  const session = useSession()
  console.log('session.status:  ', session.status)
  console.log('session:  ', session)
  const clickLogin = (mensagem) => {
    signIn('spotify')
  };

  const clickLogout = (mensagem) => {
    
    signOut('spotify')
  };

  return (


    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar userSessionState={session} onLogout={clickLogout} />

        {session.status === 'authenticated'
          ? <Dash userSessionState={session} />
          : <HeroSection onLogin={clickLogin} />}

   
      <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></Script>

    </>
  )
}

export default Home
