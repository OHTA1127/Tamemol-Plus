'use client'
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

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
  selectMonth: number
}

function SummaryBuyTable({ productData, selectMonth }: Props) {
  const [buyProductList, setBuyProductList] = useState<Product[]>([])

  useEffect(() => {
    if (productData) {
      const buyProducts = productData.filter((item) => {
        if (item.status === true) {
          const itemDate = item.date ? new Date(item.date) : null
          if (itemDate) {
            const itemMonth = itemDate.getMonth() + 1
            if (itemMonth === selectMonth) {
              return true
            }
          }
        }
        return false
      })
      setBuyProductList(buyProducts)
    } else {
      setBuyProductList([])
    }
  }, [productData, selectMonth])

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>商品名</Th>
            <Th>カテゴリー</Th>
            <Th>価格</Th>
          </Tr>
        </Thead>
        <Tbody>
          {buyProductList.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.category}</Td>
              <Td>{item.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
export default React.memo(SummaryBuyTable)
