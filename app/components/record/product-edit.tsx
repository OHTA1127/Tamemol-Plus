'use client'

import useStore from '@/store'
import supabase from '@/utils/supabase'
import { Box, Button, Center, FormLabel, Input, Select } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { FormEvent } from 'react'

function EditProduct() {
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
    <Box
      bgColor="white"
      w={{ base: '160px', md: '450px' }}
      h={{ base: '350px', md: '500px' }}
      borderRadius="10px"
      shadow="2xl"
      p={4}
    >
      <form onSubmit={submitHandler}>
        <FormLabel fontWeight="bold">商品名</FormLabel>
        <Input
          type="text"
          size={{ base: 'sm', md: 'lg' }}
          mb={{ base: '1', md: '8' }}
          placeholder="記録する商品"
          required
          value={editedProduct.name || ''}
          onChange={(e) => {
            updateProduct({ ...editedProduct, name: e.target.value })
          }}
        />
        <FormLabel fontWeight="bold">カテゴリー</FormLabel>
        <Select
          fontSize={10}
          name="商品カテゴリー"
          required
          placeholder="カテゴリーを選択"
          size={{ base: 'sm', md: 'lg' }}
          mb={{ base: '1', md: '8' }}
          value={editedProduct.category || ''}
          onChange={(e) => {
            updateProduct({ ...editedProduct, category: e.target.value })
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
          size={{ base: 'sm', md: 'lg' }}
          mb={{ base: '1', md: '8' }}
          placeholder="価格"
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
          size={{ base: 'sm', md: 'lg' }}
          required
          value={editedProduct.date || ''}
          onChange={(e) => {
            updateProduct({ ...editedProduct, date: e.target.value })
          }}
        />
        <Center>
          <Button
            type="submit"
            color="white"
            background="blue.700"
            _hover={{ background: 'blue.500' }}
            m={4}
          >
            {editedProduct.id === '' ? '記録' : '更新'}
          </Button>
        </Center>
      </form>
    </Box>
  )
}

export default React.memo(EditProduct)
