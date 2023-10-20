import { Database } from '@/database.types'
import { Box, Stack, Text } from '@chakra-ui/react'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import React from 'react'

export default async function UnbuyMoney() {
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
      if (item.date && item.status) {
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
      w={{ base: '165px', md: '360px' }}
      h={{ base: '70px', md: '120px' }}
      bgGradient="linear(to-r, pink.400, purple.500)"
      borderRadius="10px"
      shadow="2xl"
      p={{ base: 0, md: 2 }}
    >
      <Stack>
        <Text
          fontSize={{ base: 'xs', md: 'md' }}
          fontWeight="bold"
          pt={2}
          pl={3}
          color="white"
        >
          我慢した金額
        </Text>
        <Text
          textAlign="center"
          fontSize={{ base: 'xl', md: '5xl' }}
          fontWeight="bold"
          color="white"
        >
          ¥ {formattedTotalSum}
        </Text>
      </Stack>
    </Box>
  )
}

