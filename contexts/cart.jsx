import { createContext, useContext, useEffect, useState } from 'react'
import { initiateCheckout } from '../lib/payments'

const defaultCart = {
  products: {},
}

const Context = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(defaultCart)

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('cart')))

    setCart(JSON.parse(localStorage.getItem('cart')))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const cartItems = Object.keys(cart.products).map((key) => {
    return { ...cart.products[key] }
  })

  const subtotal = cartItems.reduce(
    (accumulator, { pricePerUnit, quantity }) => {
      return accumulator + pricePerUnit * quantity
    },
    0
  )

  const quantity = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity
  }, 0)

  const addToCart = ({ id, price }) => {
    setCart((cart) => {
      if (cart.products[id]) {
        cart.products[id].quantity++
      } else {
        cart.products[id] = {
          id,
          quantity: 1,
          pricePerUnit: price,
        }
      }
      return { ...cart }
    })
  }

  const checkout = () => {
    initiateCheckout({
      lineItems: cartItems.map(({ id, quantity }) => {
        return {
          price: id,
          quantity,
        }
      }),
    })
  }

  return (
    <Context.Provider value={{ cart, subtotal, quantity, addToCart, checkout }}>
      {children}
    </Context.Provider>
  )
}

export const useCart = () => useContext(Context)
