import { Database } from '@/database.types'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import ProductItem from './product-item'
import {
  Box,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
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
    .range(0, 5)

  //現在の日付を取得
  const currentDate = new Date()

  //現在の月と年を取得
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  //今月のデータのみを取得する
  const currentMonthProducts = products?.filter((product) => {
    if (product.date) {
      //product.date の文字列を JavaScript の Date オブジェクトに変換する
      const productDate = new Date(product.date)

      const productMonth = productDate.getMonth() + 1
      const productYear = productDate.getFullYear()

      return productMonth === currentMonth && productYear === currentYear
    }
    return false
  })

  return (
    <Box bg="white" borderRadius="10px" shadow="2xl" h="500px" p={5}>
      <Stack>
        <Text
          as="b"
          bgClip="text"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          fontSize={{ base: 'xl', md: '2xl' }}
        >
          Product List
        </Text>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>商品名</Th>
                <Th>カテゴリー</Th>
                <Th>価格</Th>
                <Th>我慢中はチェック！</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentMonthProducts?.map((product) => (
                <ProductItem key={product.id} {...product} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  )
}

export default React.memo(ProductList)
