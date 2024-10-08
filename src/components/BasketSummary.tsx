"use client";

import { useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import Link from "next/link";
import Image from "next/image";
import { currencyFormatter } from "../utils";
const BasketSummary = () => {
  const { basket } = useContext(BasketContext);

  let totalPrice: number = 0;

  for (const product of basket) {
    totalPrice += product.price * product.quantity;
  }

  if (basket.length === 0) {
    return "";
  }

  return (
    <div className="lg:block hidden py-6 max-h-80 shadow-lg w-80 bg-white text-slate-500 container mx-auto  top-10 right-0 overflow-y-auto z-50 absolute ">
      <div>
        <h1 className="text-lg font-bold mb-6 justify-center flex">
          Recently Added Products
        </h1>
      </div>

      <div className="mt-4 ">
        {basket.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-4 border-b text-xs gap-4 justify-center items-center"
          >
            <div>
              <Image
                unoptimized
                height={100}
                width={100}
                src={item.thumbnail}
                alt={item.title}
                className="h-max w-20 object-contain "
              />
            </div>
            <div>{item.title}</div>
            <div> {item.quantity}</div>

            <div className="text-primary">{currencyFormatter(item.price)}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-end text-lg p-4 text-primary">
        {currencyFormatter(totalPrice)}
      </div>
      <div className="flex justify-center mt-8  ">
        <Link
          className=" bg-primary p-2 rounded hover:bg-orange-700 duration-100 text-white w-max"
          href="/basket"
        >
          View My Shopping Cart
        </Link>
      </div>
    </div>
  );
};

export default BasketSummary;
