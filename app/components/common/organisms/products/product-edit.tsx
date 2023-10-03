'use client'

import useStore from '@/store'
import supabase from '@/utils/supabase'
import { Box, Button, FormLabel, Input, Select } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export default function EditProduct() {
  const router = useRouter()
  const { editedProduct } = useStore()
  const { loginUser } = useStore()
  const updateProduct = useStore((state) => state.updateEditProduct)
  const reset = useStore((state) => state.resetEditProduct)

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
    <Box bgColor="white">
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
        <Select
          name="商品カテゴリー"
          required
          placeholder="Select category"
          size="lg"
          mb="8"
          value={editedProduct.category || ''}
          onChange={(e) => {
            updateProduct({ ...editedProduct, category: e.target.value })
            console.log(e.target.value)
          }}
        >
          <option value="">選択してください</option>
          <option value="食料品">食料品</option>
          <option value="衣類">衣類</option>
          <option value="遊び">遊び</option>
          <option value="趣味">趣味</option>
          <option value="雑貨">雑貨</option>
          <option value="その他">その他</option>
        </Select>

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
        <div>
          <Button type="submit">
            {editedProduct.id === '' ? 'Create' : 'Update'}
          </Button>
        </div>
      </form>
    </Box>
  )
}
