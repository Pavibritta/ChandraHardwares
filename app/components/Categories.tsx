"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Categories = () => {
  const router = useRouter();
  const categories = [{ id: 1, img: "/Electrical.png", name: "Electricals" },
    { id: 2, img: "/Painting.png", name: "Painting" },
    { id: 3, img: "/Plumbing.png", name: "Plumbing" },
    { id: 4, img: "/Construction.png", name: "Construction" }
  ];
  return <>
 <h2 className="text-2xl font-bold mb-6 text-secondary mt-10">Shop By Categories</h2>
 <div className="grid  md:grid-cols-4  grid-cols-2 gap-10 max-w-8xl w-full p-10 items-center">
 {categories.map((item) => (
  <div key={item.id} className="relative cursor-pointer">
    <Image
      src={item.img}
      alt={item.name}
      width={500}
      height={500}
      className="rounded-lg "
      onClick={() => router.push(`/shop?category=${item.name}`)}
    />
    <h1 className="absolute left-5 bottom-4 right-5 font-bold text-white text-2xl">{item.name}</h1>
  </div>
))}
 </div>
  </>;
};

export default Categories;
