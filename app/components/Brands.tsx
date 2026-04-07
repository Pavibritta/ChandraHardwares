import React from 'react'
import Image from 'next/image'

const Brands = () => {
   const brands=[{id:1,img:"/Asian Paints.jpg"},
    {id:2,img:"/cera.png"},
    {id:3,img:"/neycer.jpg"},
    {id:4,img:"/kiscol.png"},
    {id:5,img:"/tata-steel-logo.png"}
   ]
  return (
    <>
    <h2 className="text-2xl font-bold mb-6 text-secondary mt-10 text-center" >Our Trusted Brands</h2>

     <div className="grid md:grid-cols-4 grid-cols-2 gap-10 p-5 max-w-8xl mx-auto">
  {brands.map((brand) => (
    <div key={brand.id} className="flex justify-center">
      <Image
        src={brand.img}
        alt="image"
        height={100}
        width={100}
        className="rounded-lg shadow-md"
      />
    </div>
  ))}
</div>
    </>
  )
}

export default Brands