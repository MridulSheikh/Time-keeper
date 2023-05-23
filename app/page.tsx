import { Blog, HomeBanner, IdealHasNever, OurBestSellers, SwissEssence } from '@/components'

export default function Home() {
  return (
    <main className="">
      <HomeBanner />
      <OurBestSellers />
      <IdealHasNever />
      <SwissEssence />
      <Blog />
    </main>
  )
}
