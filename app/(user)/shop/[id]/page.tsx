"use client";

import { useParams } from "next/navigation";
import { useEffect,useState } from "react";
import products from '../../../data/products.json'
import Image from "next/image";
import { useAuth } from "app/context/AuthContext";

const ProductDetail = () => {
  const params = useParams();

  console.log("params:", params);

  const id = params?.id; // ✅ correct

  console.log("id", id);

  const { user } = useAuth();
  type Products={
    _id:string,
    name:string,
    image:string,
    category:string,
    brand:string,
    stock:number,
    price:number,
    description:string
  
  }
  
  const [products,setProducts]=useState<Products[]>([])
  useEffect(()=>{
  const fetchProducts=async ()=>{
    try{
      const res=await fetch('/api/products')
      const data=await res.json()
      console.log("products",data)
      setProducts(data)
    }catch(error){
  console.log(error)
    }
  }
  fetchProducts()
  },[])

  const product = products.find((p) => p._id === id);
console.log("product",product)
  if (!product) {
    return <p className="text-center mt-20">Product not found</p>;
  }

  return (
    <div className="p-10 max-w-5xl mx-auto mt-30">
      <div className="grid md:grid-cols-2 gap-10">

        {/* Image */}
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-lg"
        />

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            {product.name}
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