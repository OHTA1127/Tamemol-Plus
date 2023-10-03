import { Database } from '@/database.types'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import ProductItem from './product-item'
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

async function ProductList() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const { data: products } = await supabase
    .from('products')
    .select()
    .order('created_at', { ascending: true })

  return (
    <TableContainer>
      <Table bgColor="white">
        <Thead>
          <Tr>
            <Th>商品名</Th>
            <Th>カテゴリー</Th>
            <Th>価格</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products?.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default React.memo(ProductList)
