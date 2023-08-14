import {
  Body,
  IdealHasNever,
  Pagination,
  Sidebar,
  TopBanner,
} from "@/components";
const Shop = async ({ searchParams }: { searchParams: any }) => {
  const uri = `http://localhost:5000/api/v1/product?limit=${
    searchParams?.limit || 9
  }&page=${searchParams?.page || 1}&fields=_id,img,price,reviews,name${
    searchParams?.category && `&category=${searchParams?.category}`
  }`;
  const res = await fetch(uri, { cache: "no-store" });
  const products = await res.json();
  return (
    <div>
      <TopBanner page="Shop" route={"home / shop"} />
      <div className="relative grid lg:grid-cols-12 gap-x-5  max-w-screen-2xl mx-auto my-10 px-4 ">
        <Sidebar />
        {/* @ts-expect-error Server Component */}
        <Body products={products?.data?.products} />
      </div>
      <Pagination
        page={parseInt(searchParams?.page) || 1}
        pageCount={parseInt(products.data?.pagecount)}
      />
      <IdealHasNever />
    </div>
  );
};

export default Shop;
