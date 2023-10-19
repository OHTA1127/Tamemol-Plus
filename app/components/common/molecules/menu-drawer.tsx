import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react'
import React from 'react'

type Props = {
  onClose: () => void
  isOpen: boolean
  onClickHome: () => void
  onClickSummary: () => void
  onClickPastData: () => void
}

function MenuDrawer({
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
          <DrawerBody p={0}>
            <Center>
              <Button
                fontWeight="extrabold"
                color="white"
                w="60%"
                bgGradient="linear(to-r, cyan.400, blue.500)"
                onClick={onClickHome}
                marginY={5}
              >
                TOP
              </Button>
            </Center>
            <Center>
              <Button
                fontWeight="extrabold"
                color="white"
                w="60%"
                bgGradient="linear(to-r, cyan.400, blue.500)"
                onClick={onClickSummary}
                mb={5}
              >
                Summary
              </Button>
            </Center>
            <Center>
              <Button
                fontWeight="extrabold"
                color="white"
                w="60%"
                bgGradient="linear(to-r, cyan.400, blue.500)"
                onClick={onClickPastData}
              >
                Stats
              </Button>
            </Center>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default React.memo(MenuDrawer)
