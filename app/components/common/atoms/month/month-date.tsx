'use client'
import { Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type Props = {
  fontSize: number
  text: string
}

function MonthData({ fontSize, text }: Props) {
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
    <Text fontSize={fontSize}>
      {currentMonth}
      {text}
    </Text>
  )
}

export default React.memo(MonthData)
