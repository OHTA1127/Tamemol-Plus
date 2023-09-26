import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
} from '@chakra-ui/react'

type Props = {
  onClose: () => void
  isOpen: boolean
  onClickHome: () => void
  onClickSummary: () => void
  onClickPastData: () => void
}

export default function MenuDrawer({
  onClose,
  isOpen,
  onClickHome,
  onClickPastData,
  onClickSummary,
}: Props) {
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button w="100%" onClick={onClickHome}>
              TOP
            </Button>
            <Button w="100%" onClick={onClickSummary}>
              Summary
            </Button>
            <Button w="100%" onClick={onClickPastData}>
              Past Data
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
