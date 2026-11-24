import { ProductsByCategoryFetcher } from "../../../lib/ProductsByCategoryFetcher";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  let products: Product[] = [];
  let isFetchFailed = false;

  try {
    products = await ProductsByCategoryFetcher(category);
  } catch (error) {
    console.error(`Failed to load products for category "${category}":`, error);
    isFetchFailed = true;
  }

  if (!isFetchFailed && products.length === 0) {
    notFound();
  }
  return (
    <div className="container mx-auto lg:py-4 p-6">
      <div className=" w-full shadow-lg h-16 items-center flex bg-white flex-row my-8 text-center ">
        <div className="bg-primary w-2 h-full "> </div>
        <h1 className="md:text-2xl  text-md capitalize text-gray-400 font-bold px-10 ">
          Products in {category}
        </h1>
      </div>

      {isFetchFailed && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
          Products could not be loaded right now. Please try again shortly.
        </div>
      )}

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5
       gap-4 my-4"
      >
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
