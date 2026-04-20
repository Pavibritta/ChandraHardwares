"use client";

import { useParams } from "next/navigation";
import products from '../../../data/products.json'
import Image from "next/image";
import { useAuth } from "app/context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <p className="text-center mt-20">Product not found</p>;
  }

  return (
    <div className="p-10 max-w-5xl mx-auto mt-30">
      <div className="grid md:grid-cols-2 gap-10">

        {/* Image */}
        <Image
          src={product.img}
          alt={product.productName}
          width={400}
          height={400}
          className="rounded-lg"
        />

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            {product.productName}
          </h1>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <h2 className="text-2xl font-bold text-secondary mb-6">
            ₹ {product.price}
          </h2>

          {/* ✅ Add to Cart only if user */}
          {user ? (
            <button className="bg-secondary text-white px-6 py-3 rounded-lg">
              Add To Cart
            </button>
          ) : (
            <p className="text-red-500">
              Please login to add to cart
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;