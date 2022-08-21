import { createContext, useContext, useEffect, useState } from 'react'
import { initiateCheckout } from '../lib/payments'
import { formatPrice } from '../lib'

const Context = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart'))
    if (cartData) {
      setCart(JSON.parse(localStorage.getItem('cart')))
    }
  }, [])

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])

  let subtotal = formatPrice(
    cart.reduce((acc, { price, quantity }) => {
      return acc + price * quantity
    }, 0)
  )

  const quantity = cart.reduce((acc, { quantity }) => {
    return acc + quantity
  }, 0)

  const addToCart = ({ id, price, image, title }) => {
    setCart((cart) => {
      const item = cart.find((cart) => cart.id === id)

      if (item) {
        item.quantity++
      } else {
        cart.push({
          id,
          price,
          image,
          title,
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

  const deleteFromCart = (id) => {
    setCart((cart) => {
      const newCart = cart.filter((item) => item.id !== id)
      return newCart
    })
  }

  return (
    <Context.Provider
      value={{ cart, subtotal, quantity, addToCart, deleteFromCart, checkout }}
    >
      {children}
    </Context.Provider>
  )
}

export const useCart = () => useContext(Context)
