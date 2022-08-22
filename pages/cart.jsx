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
              {cart.map(({ id, image, title, price, quantity }) => (
                <tr key={id}>
                  <td>
                    <img className='h-48' src={image} alt={title} />
                  </td>
                  <td>
                    <p className='font-semibold text-lg'>{title}</p>
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
