import React from 'react'
import PieChart from './pie-chart'
import { Database } from '@/database.types'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'

async function PieChartContainer() {
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

  function calculateTotalSumByCategory(category: string) {
    let foodTotalSum = 0

    if (product) {
      for (const item of product) {
        //dataが存在し、かつstatusがtrueの時に実行
        if (item.date && item.status === false && item.category === category) {
          const itemDate = new Date(item.date)
          const itemMonth = itemDate.getMonth() + 1
          const itemYear = itemDate.getFullYear()

          if (itemMonth === currentMonth && itemYear === currentYear) {
            foodTotalSum += item.price || 0
          }
        }
      }
    } else {
      console.log('Product is null')
    }
    return foodTotalSum
  }

  const foodTotalSum = calculateTotalSumByCategory('食料品')
  const clotheTotalSum = calculateTotalSumByCategory('衣類')
  const playTotalSum = calculateTotalSumByCategory('遊び')
  const hobbyTotalSum = calculateTotalSumByCategory('趣味')
  const sundriesTotalSum = calculateTotalSumByCategory('雑貨')
  const otherTotalSum = calculateTotalSumByCategory('その他')

  if (
    foodTotalSum !== 0 ||
    clotheTotalSum !== 0 ||
    playTotalSum !== 0 ||
    hobbyTotalSum !== 0 ||
    sundriesTotalSum !== 0 ||
    otherTotalSum !== 0
  ) {
    return (
      <PieChart
        foodData={foodTotalSum}
        clotheData={clotheTotalSum}
        playData={playTotalSum}
        hobbyData={hobbyTotalSum}
        sundriesData={sundriesTotalSum}
        otherData={otherTotalSum}
      />
    )
  } else {
    return <p>買ったものはありません</p>
  }

}

export default React.memo(PieChartContainer)
