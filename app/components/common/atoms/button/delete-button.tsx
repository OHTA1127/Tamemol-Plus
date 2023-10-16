import supabase from '@/utils/supabase'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  itemId: string
}

function DeleteButton({ itemId }: Props) {
  const router = useRouter()

  async function deleteMutate(id: string) {
    await supabase.from('products').delete().eq('id', id)
    router.refresh()
  }
  return (
    <Button
      color="white"
      background="blue.700"
      _hover={{ background: 'blue.500' }}
      onClick={() => {
        deleteMutate(itemId)
      }}
    >
      削除
    </Button>
  )
}
export default React.memo(DeleteButton)
