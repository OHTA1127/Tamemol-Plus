import React from 'react'
import { headers, cookies } from 'next/headers'
import { Database } from '@/database.types'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Box, Text } from '@chakra-ui/react'

async function UnbuyMoney() {
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

  return (
    <Box>
      <Text>我慢した金額</Text>
      <Text>{totalSum}</Text>
    </Box>
  )
}

export default React.memo(UnbuyMoney)
