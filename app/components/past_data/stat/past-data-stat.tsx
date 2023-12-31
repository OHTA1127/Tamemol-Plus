import { Database } from '@/database.types'
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

type Product = Database['public']['Tables']['products']['Row']

type UserProfile = Database['public']['Tables']['profile']['Row']

type Props = {
  userProfile: UserProfile[] | null
  productData: Product[] | null
}

function PastDataStat({ userProfile, productData }: Props) {
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

  const userName =
    userProfile && userProfile[0] && userProfile[0].name
      ? userProfile[0].name
      : 'ゲスト'

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
          fontWeight="bold"
          bgClip="text"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          fontSize={{ base: 'xl', md: '2xl' }}
        >
          {userName}の結果
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
            <span style={{ fontSize: '45px' }}>¥</span>
            {TotalCalculate(productData) >= 0 ? '+' : ''}
            {TotalCalculate(productData).toLocaleString()}
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
