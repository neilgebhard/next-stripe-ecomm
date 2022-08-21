import Head from 'next/head'
import { useCart } from '../contexts/cart'

import products from '../products.json'

export default function Home() {
  const { addToCart } = useCart()

  return (
    <div>
      <Head>
        <title>E-commerce (Next.js, Stripe)</title>
        <meta
          name='description'
          content='An e-commerce store made with Next.js and Stripe'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='max-w-6xl mx-auto px-3'>
        <h1 className='text-xl font-bold mb-6'>Shop</h1>
        <section>
          <ul className='grid grid-cols-4 gap-2'>
            {products.map((product) => {
              const { id, title, image, description, price } = product
              return (
                <li key={id}>
                  <div className='card bg-base-100 shadow-xl'>
                    <a href='#'>
                      <figure>
                        <img src={image} alt={title} />
                      </figure>
                    </a>
                    <div className='card-body'>
                      <h2 className='card-title'>{title}</h2>
                      <p>${price}</p>
                      <p>{description}</p>
                      <div className='card-actions justify-end'>
                        <button
                          className='btn btn-primary'
                          onClick={() => addToCart({ id, price, image, title })}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </main>
    </div>
  )
}
