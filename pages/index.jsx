import Head from 'next/head'
import { useCart } from '../contexts/cart'
import Stripe from 'stripe'
import { formatPrice } from '../lib'
import Image from 'next/image'

export const getStaticProps = async () => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

  const { data: products } = await stripe.products.list({
    expand: ['data.default_price'],
  })

  return { props: { products } }
}

export default function Home({ products }) {
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

      <main className='max-w-6xl mx-auto px-3 mt-10'>
        <h1 className='text-xl font-bold mb-6'>Shop</h1>
        <section>
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2'>
            {products.map((product) => {
              const { id, name, images, description, default_price } = product
              const price = default_price.unit_amount / 100
              const image = images[0]
              return (
                <li key={id}>
                  <div className='card bg-base-100 shadow-xl border border-gray-100'>
                    <a className='p-4' href='#'>
                      <figure className='relative h-64'>
                        <Image
                          src={image}
                          alt={name}
                          layout='fill'
                          objectFit='cover'
                        />
                      </figure>
                    </a>
                    <div className='card-body'>
                      <h2 className='text-xl'>{name}</h2>
                      <p className='card-title text-xl'>{formatPrice(price)}</p>
                      <p className='text-gray-600'>{description}</p>
                      <div className='card-actions mt-4'>
                        <button
                          className='btn btn-primary'
                          onClick={() =>
                            addToCart({
                              id,
                              price,
                              image,
                              name,
                              price_id: default_price.id,
                            })
                          }
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
