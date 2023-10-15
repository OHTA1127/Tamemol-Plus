import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import React from 'react'

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

type Props = {
  productData: Product[] | null
}

function PastDataStat({ productData }: Props) {
  function TotalCalculate(productData: Product[] | null) {
    if (productData === null) {
      return 0
    }

    //statusがtrueの商品の合計金額を計算
    const trueTotal = productData
      .filter((product) => product.status === true)
      .reduce((total, product) => total + (product.price || 0), 0)

    //statusがfalseの商品の合計金額を計算
    const falseTotal = productData
      .filter((product) => product.status === false)
      .reduce((total, product) => total + (product.price || 0), 0)

    const difference = falseTotal - trueTotal
    return difference
  }

  //我慢した金額と買った金額の割合を計算
  function RateCalculate(productData: Product[] | null) {
    if (productData === null) {
      return 0
    }

    //statusがtrueの商品の合計金額を計算
    const trueTotal = productData
      .filter((product) => product.status === true)
      .reduce((total, product) => total + (product.price || 0), 0)

    //statusがfalseの商品の合計金額を計算
    const falseTotal = productData
      .filter((product) => product.status === false)
      .reduce((total, product) => total + (product.price || 0), 0)

    const rate = (falseTotal - trueTotal) / 100

    return rate
  }

  return (
    <StatGroup>
      <Stat
        bg="white"
        borderRadius="10px"
        shadow="2xl"
        w="500px"
        h="400px"
        p={6}
      >
        <StatLabel>Result</StatLabel>
        <StatNumber>
          {TotalCalculate(productData) >= 0 ? '+' : '-'}¥
          {TotalCalculate(productData)}
        </StatNumber>
        <StatHelpText>
          <StatArrow
            type={RateCalculate(productData) > 0 ? 'increase' : 'decrease'}
          />
          {RateCalculate(productData)}%
        </StatHelpText>
      </Stat>
    </StatGroup>
  )
}
export default React.memo(PastDataStat)
