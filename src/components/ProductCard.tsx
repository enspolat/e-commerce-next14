import Image from "next/image";
import { Product } from "../lib/types";
import Link from "next/link";

export default function ProductCard({ product }: any) {
  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <Image
        height={100}
        width={100}
        src={product.thumbnail}
        alt={product.title}
        className="h-full object-contain mb-4"
      />
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-gray-500">{product.price} $</p>
      <div className="flex justify-between items-center">
        <Link
          href={`/product/${product.id}`}
          className=" bg-primary text-white px-4 py-2  hover:bg-orange-600"
        >
          Detaylar
        </Link>
        <button className="bg-orange-800 hover:bg-orange-700 w-8 h-8 text-white ">
          +
        </button>
      </div>
    </div>
  );
}
