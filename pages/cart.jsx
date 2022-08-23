import Image from 'next/image'
import { useCart } from '../contexts/cart'
import { formatPrice } from '../lib'

const Cart = () => {
  const { cart, subtotal, quantity, deleteFromCart, checkout } = useCart()

  return (
    <main className='max-w-6xl mx-auto px-3 mt-10'>
      <h1 className='text-2xl font-bold mb-3'>Shopping Cart</h1>
      {cart.length > 0 ? (
        <div className='overflow-x-auto border-t border-t-gray-100'>
          <table className='table w-full'>
            <tbody className='divide-y'>
              {cart.map(({ id, image, name, price, quantity }) => (
                <tr key={id}>
                  <td>
                    <div className='relative h-48 w-48'>
                      <Image
                        src={image}
                        alt={name}
                        layout='fill'
                        objectFit='cover'
                      />
                    </div>
                  </td>
                  <td>
                    <p className='font-semibold text-lg'>{name}</p>
                    <p>Qty: {quantity}</p>
                    <p>
                      <button
                        className='text-primary hover:underline'
                        onClick={() => deleteFromCart(id)}
                      >
                        Delete
                      </button>
                    </p>
                  </td>
                  <td className='font-bold text-xl'>{formatPrice(price)}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td className='text-xl'>
                  <div>
                    <span className='font-bold'>{subtotal}</span>{' '}
                    <span>({quantity} items)</span>
                  </div>
                  <div className='mt-2'>
                    <button
                      className='btn btn-active btn-primary'
                      onClick={checkout}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div>There are no items in your cart!</div>
      )}
    </main>
  )
}

export default Cart
