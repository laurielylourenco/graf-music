//import { Inter } from 'next/font/google'
/* import bootstrap from 'bootstrap' */
import "bootswatch/dist/sketchy/bootstrap.min.css";
//import 'bootstrap/dist/css/bootstrap.min.css';
// 

// TODO: Note: Replace ^[theme]^ (examples: darkly, slate, cosmo, spacelab, and superhero. See https://bootswatch.com for current theme names.)
//const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Graf-Music',
  description: 'Bagunça',
}


export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body >{children}



        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>

      </body>


    </html>
  )
}
