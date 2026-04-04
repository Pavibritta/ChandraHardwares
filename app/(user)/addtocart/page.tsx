import React from 'react'
import Image from 'next/image'
import { X } from "lucide-react";

const addtocart = () => {
  return (
    <>
    <h1 className='text-center font-bold text-secondary mt-30'>Your Cart</h1>
    <div className='grid md:grid-cols-2 grid-cols-1 gap-10 w-full h-screen max-w-6xl mx-auto my-10'>
      <div className='flex gap-5 shadow bg-white rounded-xl relative items-start'>
        <X className='absolute right-7 top-7 text-red-700' size={22}/>
        <Image src='/Switches.jpg' alt='switch' height={5} width={200}/>

        <div className='flex flex-col gap-5 py-5'>
          <h2>Luminous Zelio+ 1100 Home Inverter</h2>
          <p>Brand:Luminous Zelio</p>
          <p>Price:₹6500</p>
          <div className='flex gap-10'>
            <p> [ + ]  1  [ - ]  </p> 
            <p className='text-primary font-bold'>₹6500</p>
          </div>

          <button className="group bg-secondary hover:bg-secondary/90 text-white px-8 py-3.5 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer">
            Shop Now
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
      <div className='bg-white rounded shadow px-3 py-5 flex flex-col items-center gap-10'>
           <h1 className='text-secondary font-bold text-center' >Order Summary </h1>

           <div className='flex flex-col gap-10'>
            <p>Sub Total :₹6500</p>
            <p>Delivery :₹100</p>
            <p>Total :₹6600</p>
           </div>

           <button className="group bg-secondary hover:bg-secondary/90 text-white px-8 py-3.5 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer">
            Order Now
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
          </button>
      </div>
    </div>
    </>
  )
}

export default addtocart