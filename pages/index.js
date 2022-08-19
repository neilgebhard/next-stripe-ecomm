import Head from 'next/head'

const products = [
  {
    id: 'price_1LYPulCV5Wn3uhAp8iSNc2v2',
    title: 'T-shirt',
    description: 'White in color, high quality material, machine washable.',
    image: '/images/tshirt.jpg',
    price: 20.0,
  },
  {
    id: 'price_1LYPulCV5Wn3uhAp8iSNc2v2',
    title: 'T-shirt',
    description: 'White in color, high quality material, machine washable.',
    image: '/images/tshirt.jpg',
    price: 20.0,
  },
  {
    id: 'price_1LYPulCV5Wn3uhAp8iSNc2v2',
    title: 'T-shirt',
    description: 'White in color, high quality material, machine washable.',
    image: '/images/tshirt.jpg',
    price: 20.0,
  },
]

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
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}
