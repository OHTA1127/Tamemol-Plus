import supabase from '@/utils/supabase'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  fontSize?: string
  mobileFontSize?: string
  height?: string
  width?: string
  mobileHeight?: string
  mobileWidth?: string
  itemId: string
}

function DeleteButton({
  fontSize,
  mobileFontSize,
  height,
  width,
  mobileHeight,
  mobileWidth,
  itemId,
}: Props) {
  const router = useRouter()

  async function deleteMutate(id: string) {
    await supabase.from('products').delete().eq('id', id)
    router.refresh()
  }
  return (
    <Button
      fontSize={{ base: mobileFontSize, md: fontSize }}
      w={{ base: mobileWidth, md: width }}
      h={{ base: mobileHeight, md: height }}
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
