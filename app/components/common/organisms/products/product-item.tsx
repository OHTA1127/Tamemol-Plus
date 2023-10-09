'use client'

import { Database } from '@/database.types'
import useStore from '@/store'
import supabase from '@/utils/supabase'
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import './product-paginate.css'

type Product = Database['public']['Tables']['products']['Row']
type Props = {
  currentMonthProducts: Product[] | undefined
}

function ProductItem({ currentMonthProducts }: Props) {
  const router = useRouter()
  const updateProduct = useStore((state) => state.updateEditProduct)
  const resetProduct = useStore((status) => status.resetEditProduct)

  //1ページに何個表示するか
  const productsPerPage = 5

  //表示される最初の商品
  const [productsOffset, setProductsOffset] = useState(0)

  //次のページの最初に表示される商品
  const endOffset = productsOffset + productsPerPage

  const currentProducts = currentMonthProducts?.slice(productsOffset, endOffset)
  const pageCount = currentMonthProducts
    ? Math.ceil(currentMonthProducts?.length / productsPerPage)
    : 0

  const handlePageClick = (e: { selected: number }) => {
    const newOffset = currentMonthProducts
      ? (e.selected * productsPerPage) % currentMonthProducts?.length
      : 0
    setProductsOffset(newOffset)
  }

  //商品のステータス更新
  async function updateMutate(id: string, status: boolean) {
    await supabase.from('products').update({ status: status }).eq('id', id)
    resetProduct()
    router.refresh()
  }

  //商品データの削除
  async function deleteMutate(id: string) {
    await supabase.from('products').delete().eq('id', id)
    router.refresh()
  }

  return (
    <>
      {currentProducts && currentProducts.length ? (
        <>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>商品名</Th>
                  <Th>カテゴリー</Th>
                  <Th>価格</Th>
                  <Th>我慢中はチェック！</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentProducts.map((currentProduct) => (
                  <Tr key={currentProduct.id}>
                    <Td>{currentProduct.name}</Td>
                    <Td>{currentProduct.category}</Td>
                    <Td>{currentProduct.price}</Td>
                    <Td>
                      <input
                        type="checkbox"
                        checked={currentProduct.status}
                        onChange={(e) =>
                          updateMutate(
                            currentProduct.id,
                            !currentProduct.status
                          )
                        }
                      />
                    </Td>
                    <Td>
                      <Button
                        color="white"
                        background="blue.700"
                        _hover={{ background: 'blue.500' }}
                        onClick={() => {
                          updateProduct({
                            id: currentProduct.id,
                            name: currentProduct.name,
                            price: currentProduct.price,
                            category: currentProduct.category,
                            date: currentProduct.date,
                            status: currentProduct.status,
                          })
                        }}
                      >
                        編集
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        color="white"
                        background="blue.700"
                        _hover={{ background: 'blue.500' }}
                        onClick={() => {
                          deleteMutate(currentProduct.id)
                        }}
                      >
                        削除
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            marginPagesDisplayed={2} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
            pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
            containerClassName={'pagination'} // ページネーションであるulに着くクラス名
          />
        </>
      ) : (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>商品名</Th>
                <Th>カテゴリー</Th>
                <Th>価格</Th>
                <Th>我慢中はチェック！</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default React.memo(ProductItem)
