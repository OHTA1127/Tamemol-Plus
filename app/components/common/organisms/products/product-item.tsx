'use client'

import { Database } from '@/database.types'
import useStore from '@/store'
import supabase from '@/utils/supabase'
import { Button, Td, Tr } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

type Product = Database['public']['Tables']['products']['Row']

export default function ProductItem(product: Product) {
  const router = useRouter()
  const updateProduct = useStore((state) => state.updateEditProduct)
  const resetProduct = useStore((status) => status.resetEditProduct)

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
    <Tr>
      <Td>{product.name}</Td>
      <Td>{product.category}</Td>
      <Td>{product.price}</Td>
      <Td>
        <input
          type="checkbox"
          checked={product.status}
          onChange={(e) => updateMutate(product.id, !product.status)}
        />
      </Td>
      <Td>
        <Button
          onClick={() => {
            updateProduct({
              id: product.id,
              name: product.name,
              price: product.price,
              category: product.category,
              date: product.date,
              status: product.status,
            })
          }}
        >
          編集
        </Button>
      </Td>
      <Td>
        <Button
          onClick={() => {
            deleteMutate(product.id)
          }}
        >
          削除
        </Button>
      </Td>
    </Tr>
  )
}
