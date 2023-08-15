import {
  Body,
  IdealHasNever,
  Pagination,
  Sidebar,
  TopBanner,
} from "@/components";
import queryString from "query-string";
const Shop = async ({ searchParams }: { searchParams: any }) => {
  const urlParam = {
    category: searchParams.category,
    brand: searchParams.brand,
    "price[gte]": searchParams.minimum,
    "price[lte]": searchParams.maximum,
    fields: "_id,img,price,reviews,name",
    page: searchParams?.page || 1,
    limit: searchParams?.limit || 9,
  };

  const searchQuery = queryString.stringify(urlParam);

  const uri = `http://localhost:5000/api/v1/product?${searchQuery}`;
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
