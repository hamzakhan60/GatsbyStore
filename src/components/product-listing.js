import React from "react";
import { ProductCard } from "./product-card";

export function ProductListing({ products }) {
  // Check if products exist and map them
  console.log(products);
  return (
    <div className="flex border border-red-800 flex-wrap justify-center">
      {products?.map((  product ) => (
        <ProductCard key={product} product={product} />
      ))}
    </div>
  );
}
