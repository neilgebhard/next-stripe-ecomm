import { useState } from 'react'
import { initiateCheckout } from '../lib/payments'

const defaultCart = {
  products: {},
}

export default function useCart() {
  const [cart, setCart] = useState(defaultCart)

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

  return {
    cart,
    subtotal,
    quantity,
    addToCart,
    checkout,
  }
}
