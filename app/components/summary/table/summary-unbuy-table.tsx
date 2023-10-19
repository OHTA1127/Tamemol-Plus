'use client'
import { Database } from '@/database.types'
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import DeleteButton from '../../common/atoms/button/delete-button'
import './summary-table-paginate.css'

type Product = Database['public']['Tables']['products']['Row']

type Props = {
  productData: Product[] | null
  selectMonth: number
}

function SummaryUnbuyTable({ productData, selectMonth }: Props) {
  const [unBuyProductList, setUnBuyProductList] = useState<Product[]>([])

  useEffect(() => {
    if (productData) {
      const unBuyProducts = productData.filter((item) => {
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
      setUnBuyProductList(unBuyProducts)
    } else {
      setUnBuyProductList([])
    }
  }, [productData, selectMonth])

  //1ページに何個表示するか
  const productsPerPage = 5

  //表示される最初の商品
  const [productsOffset, setProductsOffset] = useState(0)

  //次のページの最初に表示される商品
  const endOffset = productsOffset + productsPerPage

  const currentProducts = unBuyProductList?.slice(productsOffset, endOffset)
  const pageCount = unBuyProductList
    ? Math.ceil(unBuyProductList?.length / productsPerPage)
    : 0

  const handlePageClick = (e: { selected: number }) => {
    const newOffset = unBuyProductList
      ? (e.selected * productsPerPage) % unBuyProductList?.length
      : 0
    setProductsOffset(newOffset)
  }

  return (
    <Box bg="white" borderRadius="10px" shadow="2xl" h="500px" w="550px" p={3}>
      <Text
        pb={6}
        as="b"
        bgClip="text"
        bgGradient="linear(to-r, cyan.400, blue.500)"
        fontSize={{ base: 'xl', md: '2xl' }}
      >
        我慢した商品
      </Text>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>商品名</Th>
              <Th>カテゴリー</Th>
              <Th>価格</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentProducts.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.category}</Td>
                <Td>{item.price?.toLocaleString()}</Td>
                <Td>
                  <DeleteButton itemId={item.id} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {unBuyProductList.length >= 7 && (
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageClick}
          marginPagesDisplayed={4} // 先頭と末尾に表示するページ数
          pageRangeDisplayed={2} // 現在のページの前後をいくつ表示させるか
          containerClassName="pagination justify-center" // ul(pagination本体)
          pageClassName="page-item" // li
          pageLinkClassName="page-link rounded-full" // a
          activeClassName="active" // active.li
          activeLinkClassName="active" // active.li < a
          // 戻る・進む関連
          previousClassName="page-item" // li
          nextClassName="page-item" // li
          previousLabel={'<'} // a
          previousLinkClassName="previous-link"
          nextLabel={'>'} // a
          nextLinkClassName="next-link"
          // 先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくする
          disabledClassName="disabled-button d-none"
          // 中間ページの省略表記関連
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
        />
      )}
    </Box>
  )
}
export default React.memo(SummaryUnbuyTable)
