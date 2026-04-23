"use client"
import React,{useState,useEffect} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Categories = () => {
  type Category = {
  _id: string;
  name: string;
  image: string;
};
const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();

        console.log("data:", data);

        // safe handling
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);
  const router = useRouter();
  
  return <>
 <h2 className="text-2xl font-bold mb-6 text-secondary mt-10">Shop By Categories</h2>
 <div className="grid  md:grid-cols-4  grid-cols-2 gap-10 max-w-8xl w-full p-10 items-center">
 {categories.map((item) => (
  <div key={item._id} className="relative cursor-pointer">
    <Image
      src={item.image}
      alt={item.name}
      width={500}
      height={500}
      className="rounded-lg "
      onClick={() => router.push(`/shop?category=${item._id}`)}
    />
    <h1 className="absolute left-5 bottom-4 right-5 font-bold text-white text-2xl">{item.name}</h1>
  </div>
))}
 </div>
  </>;
};

export default Categories;
