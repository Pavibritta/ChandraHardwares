"use client";

import { useParams } from "next/navigation";
import { useEffect,useState } from "react";
import products from '../../../data/products.json'
import Image from "next/image";
import { useAuth } from "app/context/AuthContext";
import Link from "next/link";

const ProductDetail = () => {
  const params = useParams();
const [loading, setLoading] = useState(true);
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
      setLoading(true)
      const res=await fetch('/api/products')
      const data=await res.json()
      console.log("products",data)
      setProducts(data)
    }catch(error){
  console.log(error)
    }finally {
      setLoading(false); // ✅ important
    }
  }
  fetchProducts()
  },[])

  const product = products.find((p) => p._id === id);
console.log("product",product)
if (loading) {
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  );
}
  if (!product) {
    return <p className="text-center mt-20">Product not found</p>;
  }

  const handleAddToCart = async () => {
  try {
    const res = await fetch("/api/cart", {
      method: "POST",
      credentials: "include", // 🔥 important
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product._id,
        quantity: 1,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to add");
    }

    alert("Added to cart ✅");

    // 👉 redirect to cart page
    window.location.href = "/cart";

  } catch (err) {
    console.log(err);
    alert("Error adding to cart");
  }
};
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

          
          {user ? (
            <button className="bg-secondary text-white px-6 py-3 rounded-lg" onClick={handleAddToCart}>
              Add To Cart
            </button>
          ) : (
            <Link href="/login"className="text-red-500 cursor-pointer">
              Please login to add to cart
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;