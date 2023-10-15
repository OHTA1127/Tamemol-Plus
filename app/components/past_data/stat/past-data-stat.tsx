import {
  Center,
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

    const difference = trueTotal - falseTotal
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

    const rate = (trueTotal - falseTotal) / 100

    return rate
  }

  return (
    <StatGroup>
      <Stat
        bg="white"
        borderRadius="10px"
        shadow="2xl"
        w="500px"
        h="350px"
        p={6}
      >
        <StatLabel
          as="b"
          bgClip="text"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          fontSize={{ base: 'xl', md: '2xl' }}
        >
          Result
        </StatLabel>
        <Center>
          <StatNumber
            bgClip="text"
            // bgGradient="linear(to-r, cyan.400, blue.500)"
            bgGradient={
              TotalCalculate(productData) >= 0
                ? 'linear(to-r, cyan.400, blue.500)'
                : 'linear(to-r, pink.400, red.500)'
            }
            fontSize={{ base: '60px', md: '100px' }}
          >
            {TotalCalculate(productData) >= 0 ? '+' : ''}¥
            {TotalCalculate(productData)}
          </StatNumber>
        </Center>
        <StatHelpText fontSize={{ base: '30px', md: '50px' }}>
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
