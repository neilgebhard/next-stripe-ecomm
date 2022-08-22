import Link from 'next/link'
import { useCart } from '../contexts/cart'

const Nav = () => {
  const { quantity, subtotal, checkout } = useCart()

  return (
    <div className='navbar max-w-6xl mx-auto bg-base-100 px-4 py-2'>
      <div className='flex-1'>
        <Link href='/'>
          <a className='font-bold normal-case text-xl'>
            <span className='text-green-600'>Next</span>
            <span className='text-blue-600'>Stripe</span>
            <span className='text-red-600'>Store</span>
          </a>
        </Link>
      </div>
      <div className='flex-none'>
        <div className='dropdown dropdown-end'>
          <label tabIndex='0' className='btn btn-ghost btn-circle'>
            <div className='indicator'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
              <span className='badge badge-sm indicator-item'>{quantity}</span>
            </div>
          </label>
          <div
            tabIndex='0'
            className='mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow'
          >
            <div className='card-body'>
              <span className='text-lg'>
                <strong>{quantity}</strong> item{quantity > 1 ? 's' : ''}
              </span>
              <span>
                Subtotal: <strong>{subtotal}</strong>
              </span>
              <div className='card-actions mt-3'>
                <Link href='/cart'>
                  <a className='btn btn-primary btn-block'>View cart</a>
                </Link>
                <button
                  className='btn btn-primary btn-block'
                  onClick={checkout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
