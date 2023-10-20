//import { Inter } from 'next/font/google'
/* import bootstrap from 'bootstrap' */
import "bootswatch/dist/minty/bootstrap.min.css";
// TODO: Note: Replace ^[theme]^ (examples: darkly, slate, cosmo, spacelab, and superhero. See https://bootswatch.com for current theme names.)
//const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Graf-Music',
  description: 'Bagunça',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body >{children}</body>
    </html>
  )
}
