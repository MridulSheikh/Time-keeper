import { Blog, HomeBanner, IdealHasNever, Nav, OurBestSellers, SwissEssence } from '@/components'
import { Footer } from '@/components/Footer'
import OurBrands from '@/components/OurBrands'

const getBrandData = async () =>{
  const res = await fetch('https://free-time-server.onrender.com/api/v1/Brand',{cache: 'no-cache'})
  return res.json();
}

const getProducts = async () =>{
  const res = await fetch(`https://free-time-server.onrender.com/api/v1/product?page=1&limit=4`,{cache: 'no-cache'})
  return res.json();
}

const getData = async () => {
      const brand = await getBrandData();
      const product = await getProducts();
      return{
        products : product.data,
        brands : brand.data,
      }
}
export default async function Home() {
  const {products, brands} = await getData();
  return (
    <div className="">
      <Nav />
      <HomeBanner />
      <OurBestSellers products={products.products} />
      <IdealHasNever />
      <SwissEssence />
      <OurBrands brands={brands} />
      <Blog />
      <Footer />
    </div>
  )
}
