"use client";

import ProductCard from "@/components/ProductCard";
import { Product } from "../../lib/types";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "../../lib/ProductFetcher";

function SearchResults() {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          const results = await searchProducts(query);
          if (results.length === 0) {
            setErrorMessage(`No products found for "${query}".`);
          } else {
            setProducts(results);
            setErrorMessage(null);
          }
        } catch (error) {
          setErrorMessage("An error occurred while searching for products.");
        }
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div>
      {errorMessage ? (
        <div className="flex justify-center items-center text-center h-64">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 items-center rounded relative max-w-xl text-center shadow-lg">
            <strong className="font-bold">Oops! </strong>
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 my-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
