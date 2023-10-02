import Footer from '../components/common/organisms/layout/footer'
import Header from '../components/common/organisms/layout/header'

export default function RecordLayout({
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
