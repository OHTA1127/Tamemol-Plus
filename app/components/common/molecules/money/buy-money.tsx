import { Database } from '@/database.types'
import { Box, Stack, Text } from '@chakra-ui/react'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import React from 'react'

async function BuyMoney() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: product } = await supabase
    .from('products')
    .select()
    .order('created_at', { ascending: true })

  //現在の日付を取得
  const currentDate = new Date()

  //現在の月と年を取得
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  //初期値の変数を０にする
  let totalSum = 0

  //今月の我慢の合計金額を計算
  //productがnullでない時に実行
  if (product) {
    for (const item of product) {
      //dataが存在し、かつstatusがtrueの時に実行
      if (item.date && item.status === false) {
        const itemDate = new Date(item.date)
        const itemMonth = itemDate.getMonth() + 1
        const itemYear = itemDate.getFullYear()

        if (itemMonth === currentMonth && itemYear === currentYear) {
          totalSum += item.price || 0
        }
      }
    }
  } else {
    console.log('Product is null')
  }

  //数字を三桁区切りの文字列に変更
  const formattedTotalSum = totalSum.toLocaleString()

  return (
    <Box
      w="360px"
      h="120px"
      bgGradient="linear(to-r, 
        #79F1A4, #0E5CAD)"
      borderRadius="10px"
      shadow="2xl"
      p={2}
    >
      <Stack>
        <Text fontSize="md" fontWeight="bold" pt={2} pl={3} color="white">
          買った金額
        </Text>
        <Text textAlign="center" fontSize="5xl" fontWeight="bold" color="white">
          ¥ {formattedTotalSum}
        </Text>
      </Stack>
    </Box>
  )
}

export default React.memo(BuyMoney)
