import { Flex } from '@chakra-ui/react'
import EditProduct from '../components/common/organisms/products/product-edit'
import ProductList from '../components/common/organisms/products/product-list'

export default async function Record() {
  return (
    <Flex>
      <EditProduct />
      <ProductList />
    </Flex>
  )
}
