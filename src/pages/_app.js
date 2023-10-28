import RootLayout from './layout';
import { SessionProvider } from 'next-auth/react';

function App({ Component, pageProps }) {
  const { userSessionState, onLogout } = pageProps;

  return (
    <SessionProvider session={pageProps.session}>
      <RootLayout userSessionState={userSessionState} onLogout={onLogout}>
        <Component {...pageProps} />
      </RootLayout>
    </SessionProvider>
  );
}

export default App;
