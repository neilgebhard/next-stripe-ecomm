import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCart } from '../contexts/cart'

import products from '../products.json'

export default function Home() {
  const { subtotal, quantity, addToCart, checkout } = useCart()

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

      <main>
        <h1>E-commerce (Next.js, Stripe)</h1>
        <section>
          <div>
            <strong>Items:</strong> {quantity}
          </div>
          <div>
            <strong>Total:</strong> ${subtotal}
          </div>
          <button onClick={checkout}>Check Out</button>
        </section>
        <section>
          <ul>
            {products.map((product) => {
              const { id, title, image, description, price } = product
              return (
                <li key={id}>
                  <a href='#'>
                    <img src={image} alt={title} />
                    <h3>{title}</h3>
                    <p>${price}</p>
                    <p>{description}</p>
                  </a>
                  <button onClick={() => addToCart({ id, price })}>
                    Add to cart
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      </main>
    </div>
  )
}
