'use client'
import { Flex, Box } from '@chakra-ui/react'
import SummaryMonthData from './data/summary-month-data'
import SummaryUnbuyMoney from './data/summary-unbuy-money'
import React, { useState } from 'react'
import SummaryBuyMonth from './data/summary-buy-month'
import SummaryUnbuyTable from './table/summary-unbuy-table'
import SummaryBuyTable from './table/summary-buy-table'
import SummaryPieChart from './chart/summary-pie-chart'
import SummaryUnbuyResult from './data/summary-unbuy-result'

type Product = {
  category: string | null
  created_at: string
  date: string | null
  detail: string | null
  id: string
  name: string | null
  price: number | null
  status: boolean
  user_id: string | null
}

type Profile = {
  created_at: string
  goal_money: number | null
  id: string
  name: string | null
  user_id: string | null
}

type Props = {
  productData: Product[] | null
  userProfile: Profile[] | null
}

function MonthDisplay({ productData, userProfile }: Props) {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()

  const [currentMonthIndex, setCurrentMonthIndex] = useState(currentMonth)

  const monthNames = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ]
  const selectMonth = Number(monthNames[currentMonthIndex])

  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      if (newIndex < 0) {
        return 11
      }
      return newIndex
    })
  }

  const handleNextMonth = () => {
    setCurrentMonthIndex((prevIndex) => {
      const newIndex = prevIndex + 1
      if (newIndex > 11) {
        return 0
      }
      return newIndex
    })
  }

  return (
    <Box>
      <Flex>
        <SummaryMonthData
          selectMonth={selectMonth}
          handlePreviousMonth={handlePreviousMonth}
          handleNextMonth={handleNextMonth}
        />
        <SummaryUnbuyMoney
          productData={productData}
          selectMonth={selectMonth}
        />
        <SummaryBuyMonth productData={productData} selectMonth={selectMonth} />
        <SummaryUnbuyResult
          productData={productData}
          userProfile={userProfile}
          selectMonth={selectMonth}
        />
      </Flex>
      <Flex>
        <SummaryUnbuyTable
          productData={productData}
          selectMonth={selectMonth}
        />
        <SummaryBuyTable productData={productData} selectMonth={selectMonth} />
        <SummaryPieChart productData={productData} selectMonth={selectMonth} />
      </Flex>
    </Box>
  )
}

export default React.memo(MonthDisplay)
