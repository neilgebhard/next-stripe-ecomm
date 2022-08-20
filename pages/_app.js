import '../styles/globals.css'
import { CartProvider } from '../contexts/cart'

const MyApp = ({ Component, pageProps }) => {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
