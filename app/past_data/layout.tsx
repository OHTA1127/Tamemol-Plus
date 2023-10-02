import Footer from '../components/common/organisms/layout/footer'
import Header from '../components/common/organisms/layout/header'

export default function PastDataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
