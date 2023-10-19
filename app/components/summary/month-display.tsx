'use client'
import { Database } from '@/database.types'
import { Box, Spacer, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import SummaryPieChart from './chart/summary-pie-chart'
import SummaryBuyMonth from './data/summary-buy-month'
import SummaryMonthData from './data/summary-month-data'
import SummaryUnbuyMoney from './data/summary-unbuy-money'
import SummaryUnbuyResult from './data/summary-unbuy-result'
import SummaryBuyTable from './table/summary-buy-table'
import SummaryUnbuyTable from './table/summary-unbuy-table'

type Product = Database['public']['Tables']['products']['Row']

type Profile = Database['public']['Tables']['profile']['Row']

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
      <Wrap p={{ base: 4, md: 10 }} justifyContent="center">
        <WrapItem>
          {' '}
          <SummaryMonthData
            selectMonth={selectMonth}
            handlePreviousMonth={handlePreviousMonth}
            handleNextMonth={handleNextMonth}
          />
        </WrapItem>
        <Spacer />
        <WrapItem>
          {' '}
          <SummaryUnbuyMoney
            productData={productData}
            selectMonth={selectMonth}
          />
        </WrapItem>
        <Spacer />
        <WrapItem>
          {' '}
          <SummaryBuyMonth
            productData={productData}
            selectMonth={selectMonth}
          />
        </WrapItem>
        <Spacer />
        <WrapItem>
          <SummaryUnbuyResult
            productData={productData}
            userProfile={userProfile}
            selectMonth={selectMonth}
          />
        </WrapItem>
      </Wrap>
      <Wrap p={{ base: 4, md: 10 }} justifyContent="center">
        <WrapItem>
          {' '}
          <SummaryUnbuyTable
            productData={productData}
            selectMonth={selectMonth}
          />
        </WrapItem>
        <Spacer />
        <WrapItem>
          {' '}
          <SummaryBuyTable
            productData={productData}
            selectMonth={selectMonth}
          />
        </WrapItem>
        <Spacer />
        <WrapItem>
          {' '}
          <SummaryPieChart
            userProfile={userProfile}
            productData={productData}
            selectMonth={selectMonth}
          />
        </WrapItem>
      </Wrap>
    </Box>
  )
}

export default React.memo(MonthDisplay)
