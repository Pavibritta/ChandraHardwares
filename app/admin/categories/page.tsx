import React from 'react'
import Link from 'next/link'
import { Search ,Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'

const categories = () => {
   const categories = [{ id: 1, img: "/Electrical.png", name: "Electrical" },
    { id: 2, img: "/Painting.png", name: "Painting" },
    { id: 3, img: "/Plumbing.png", name: "Plumbing" },
    { id: 4, img: "/Construction.png", name: "Construction" }
  ];
  return (
    <div>
       <div className='flex justify-between mt-30'>
        <h1 className='font-bold text-xl text-primary'>Categories</h1>
        <div className="relative mx-auto w-full max-w-xl">
                <Search size={18} className="absolute  top-1/2 right-5 -translate-y-1/2 text-gray-700 cursor-pointer"/>
                <input type="search" placeholder="Search Category..." className="w-full outline-none shadow rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary px-3 py-2 max-w-xl"/>
              </div>
        <Link href="/admin/addcategory">
        <button className='bg-secondary text-white rounded shadow px-3 py-2 font-bold hover:bg-secondary/80 transition-all ease-in-out duration-300 cursor-pointer'>+ Add Category</button>
        </Link>
        
      </div>
      
      <div className="grid  md:grid-cols-2  grid-cols-1 gap-10 max-w-8xl w-full p-10">
       {categories.map((item) => (
        <div key={item.id} className="relative cursor-pointer">
          <Image
            src={item.img}
            alt={item.name}
            width={500}
            height={500}
            className="rounded-lg "
          />
          <h1 className="absolute left-5 bottom-4 right-5 font-bold text-white text-2xl">{item.name}</h1>
          <Pencil size={18} className='absolute right-15 top-4  font-bold text-white text-2xl'/>
          <Trash2 size={18} className='absolute right-3 top-4  font-bold text-white text-2xl'/>
        </div>
      ))}
       </div>
    </div>
  )
}

export default categories