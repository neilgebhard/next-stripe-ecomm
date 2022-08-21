import { createContext, useContext, useEffect, useState } from 'react'
import { initiateCheckout } from '../lib/payments'

const Context = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')))
  }, [])

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])

  const subtotal = cart.reduce((acc, { price, quantity }) => {
    return acc + price * quantity
  }, 0)

  const quantity = cart.reduce((acc, { quantity }) => {
    return acc + quantity
  }, 0)

  const addToCart = ({ id, price }) => {
    setCart((cart) => {
      const item = cart.find((cart) => cart.id === id)

      if (item) {
        item.quantity++
      } else {
        cart.push({
          id,
          price,
          quantity: 1,
        })
      }

      return [...cart]
    })
  }

  const checkout = () => {
    initiateCheckout({
      lineItems: cart.map(({ id, quantity }) => {
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
