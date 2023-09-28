'use client'

import useStore from '@/store'
import supabase from '@/utils/supabase'
import { Button, FormLabel, Input } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export default function EditProduct() {
  const router = useRouter()
  const { editedProduct } = useStore()
  const { loginUser } = useStore()
  const updateProduct = useStore((status) => status.updateEditProduct)
  const reset = useStore((status) => status.resetEditProduct)

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    //タスクの新規作成
    if (editedProduct.id === '') {
      const { error } = await supabase
        .from('products')
        .insert({
          name: editedProduct.name,
          category: editedProduct.category,
          price: editedProduct.price,
          status: true,
          user_id: loginUser.id,
          date: editedProduct.date,
        })
        .select()
      router.refresh()
      reset()
    } else {
      //タスクの編集
      const {} = await supabase
        .from('products')
        .update({
          name: editedProduct.name,
          category: editedProduct.category,
          price: editedProduct.price,
        })
        .eq('id', editedProduct.id)
        .select()
      router.refresh()
      reset()
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <FormLabel fontWeight="bold">商品名</FormLabel>
      <Input
        type="text"
        size="lg"
        mb="8"
        placeholder="New Product ?"
        required
        value={editedProduct.name || ''}
        onChange={(e) => {
          updateProduct({ ...editedProduct, name: e.target.value })
        }}
      />
      <FormLabel fontWeight="bold">カテゴリー</FormLabel>
      <Input
        type="text"
        size="lg"
        mb="8"
        placeholder="New Product ?"
        variant="outline"
        required
        value={editedProduct.category || ''}
        onChange={(e) => {
          updateProduct({ ...editedProduct, category: e.target.value })
        }}
      />
      <FormLabel fontWeight="bold">金額</FormLabel>
      <Input
        type="number"
        size="lg"
        mb="8"
        placeholder="How many ?"
        variant="outline"
        required
        value={editedProduct.price !== null ? editedProduct.price : ''}
        onChange={(e) => {
          updateProduct({ ...editedProduct, price: e.target.valueAsNumber })
        }}
      />
      <FormLabel fontWeight="bold">日付</FormLabel>
      <Input
        type="date"
        size="lg"
        mb="8"
        required
        value={editedProduct.date || ''}
        onChange={(e) => {
          updateProduct({ ...editedProduct, date: e.target.value })
        }}
      />
      {/* <FormLabel fontWeight="bold">我慢</FormLabel>
      <Input
        type="checkbox"
        size="lg"
        mb="8"
        required
        checked={editedProduct.status}
        onChange={(e) => {
          updateProduct({ ...editedProduct, status: e.target.checked })
        }}
      /> */}
      <div>
        <Button type="submit">
          {editedProduct.id === '' ? 'Create' : 'Update'}
        </Button>
      </div>
    </form>
  )
}
