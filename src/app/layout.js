
import "bootswatch/dist/sketchy/bootstrap.min.css";
import Script from 'next/script'

export const metadata = {
  title: 'Graf-Music',
  description: 'Bagunça',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body >{children}
        <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></Script>
      </body>
    </html>
  )
}
