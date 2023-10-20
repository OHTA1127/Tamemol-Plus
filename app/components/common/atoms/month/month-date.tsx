'use client'
import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function MonthData() {
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
    <Text
      fontSize={{ base: 'xs', md: 'md' }}
      fontWeight="bold"
      pt={2}
      pl={3}
      color="white"
    >
      {currentMonth}月の達成率
    </Text>
  )
}
