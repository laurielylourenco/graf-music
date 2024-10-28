import RootLayout from './layout';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from "@vercel/analytics/react"

function App({ Component, pageProps }) {
  const { userSessionState, onLogout } = pageProps;

  return (

    <SessionProvider session={pageProps.session}>
      <RootLayout userSessionState={userSessionState} onLogout={onLogout}>
        <Component {...pageProps} />
        <Analytics />
      </RootLayout>
    </SessionProvider>
  );
}

export default App;
