'use client'
import { Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function MonthData() {
  const [currentMonth, setCurrentMonth] = useState('')

  useEffect(() => {
    const currentDate = new Date()
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
    const currentMonthName = monthNames[currentDate.getMonth()]
    setCurrentMonth(currentMonthName)
  }, [])

  return (
    <Text fontSize="md" fontWeight="bold" pt={2} pl={3} color="white">
      {currentMonth}月の達成率
    </Text>
  )
}

export default React.memo(MonthData)
