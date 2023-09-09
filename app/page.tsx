import { Blog, HomeBanner, IdealHasNever, Nav, OurBestSellers, SwissEssence } from '@/components'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="">
      <Nav />
      <HomeBanner />
      <OurBestSellers />
      <IdealHasNever />
      <SwissEssence />
      <Blog />
      <Footer />
    </div>
  )
}
