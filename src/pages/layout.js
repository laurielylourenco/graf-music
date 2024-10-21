import "bootswatch/dist/sketchy/bootstrap.min.css";
import Script from 'next/script'
import Head from 'next/head'

import { signOut, useSession } from 'next-auth/react';
import Navbar from '../app/components/Navbar';
import Home from ".";


export default function RootLayout({ children, userSessionState, onLogout}) {
  const clickLogout = (mensagem) => {
    signOut();
  };

  const session = useSession() 

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar userSessionState={session} onLogout={clickLogout} />

        <Home userSessionState={session} onLogout={clickLogout} />
        <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></Script>

    </>
  )
}

