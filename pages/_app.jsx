import '../styles/globals.css'
import { CartProvider } from '../contexts/cart'
import Nav from '../components/Nav'

const MyApp = ({ Component, pageProps }) => {
  return (
    <CartProvider>
      <Nav />
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
