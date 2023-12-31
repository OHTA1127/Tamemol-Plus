import { Database } from '@/database.types'
import { Box, Stack, Text } from '@chakra-ui/react'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import React from 'react'
import ProductTable from './product-table'

async function ProductList() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const { data: products } = await supabase
    .from('products')
    .select()
    .order('created_at', { ascending: true })

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
    <Box
      bg="white"
      borderRadius="10px"
      shadow="2xl"
      h={{ base: '250px', md: '500px' }}
      w={{ base: '350px', md: '750px' }}
      p={3}
    >
      <Stack>
        <Text
          as="b"
          bgClip="text"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          fontSize={{ base: 'sm', md: '2xl' }}
        >
          商品一覧
        </Text>
        <ProductTable currentMonthProducts={currentMonthProducts} />
      </Stack>
    </Box>
  )
}

export default React.memo(ProductList)
