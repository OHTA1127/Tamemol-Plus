'use client'
import { HamburgerIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

type Props = {
  onOpen: () => void
}

export default function MenuIconButton({ onOpen }: Props) {
  return (
    <IconButton
      aria-label="メニューボタン"
      icon={<HamburgerIcon />}
      size="sm"
      variant="unstyled"
      display={{ base: 'block', md: 'none' }}
      onClick={onOpen}
      bgGradient="linear(to-r, cyan.400, blue.500)"
    />
  )
}
