import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import MonthDate from '../../atoms/month/month-date'
import { Database } from '@/database.types'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'

async function ProductResult() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: profile } = await supabase.from('profile').select()
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

  const profileGoalMoney = profile?.[0]?.goal_money || 1000

  const achievementRate = ((totalSum / profileGoalMoney) * 100).toFixed(1)

  return (
    <Flex>
      <Flex bgColor="white">
        <MonthDate fontSize={40} text="月の我慢" />
        <Text>達成率 {achievementRate}</Text>
      </Flex>
    </Flex>
  )
}

export default React.memo(ProductResult)
