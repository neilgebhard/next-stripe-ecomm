import Head from 'next/head'

import { initiateCheckout } from '../lib/payments'

import products from '../products.json'

export default function Home() {
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
                <button
                  onClick={() =>
                    initiateCheckout({
                      lineItems: [{ price: id, quantity: 1 }],
                    })
                  }
                >
                  Buy now
                </button>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}
