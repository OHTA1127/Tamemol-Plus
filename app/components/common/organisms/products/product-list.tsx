import { Database } from '@/database.types'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import ProductItem from './product-item'

export default async function ProductList() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const { data: products } = await supabase
    .from('products')
    .select()
    .order('created_at', { ascending: true })
  console.log(products)

  return (
    <>
      {products?.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </>
  )
}
