//グローバルなステートを管理するファイル

import { create } from 'zustand'

type EditProduct = {
  id: string
  name: string | null
  price: number | null
  category: string | null
  status: boolean
}

type LoginUser = {
  id: string | undefined
  email: string | undefined
}

type State = {
  editedProduct: EditProduct
  updateEditProduct: (payload: EditProduct) => void
  resetEditProduct: () => void
  loginUser: LoginUser
  updateLoginUser: (payload: LoginUser) => void
  resetLoginUser: () => void
}

const useStore = create<State>((set) => ({
  editedProduct: { id: '', name: '', price: null, category: '', status: true },
  updateEditProduct: (payload) =>
    set({
      editedProduct: payload,
    }),
  resetEditProduct: () =>
    set({
      editedProduct: {
        id: '',
        name: '',
        price: null,
        category: '',
        status: true,
      },
    }),
  loginUser: { id: '', email: '' },
  updateLoginUser: (payload) =>
    set({
      loginUser: payload,
    }),
  resetLoginUser: () => set({ loginUser: { id: '', email: '' } }),
}))
export default useStore
