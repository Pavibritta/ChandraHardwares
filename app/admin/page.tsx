import React from 'react'
import { Package,ShoppingCart,Users,IndianRupee  } from 'lucide-react'

const dashboard = () => {
  return (
    <>
    <div className=' bg-gray-50 mt-20 px-3 py-2'>
        <div className='grid md:grid-cols-4 grid-cols-2 gap-6'>
           <div className='bg-white shadow rounded border border-gray-300 px-3 py-2 hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer'>
            <div className='flex gap-6 items-center justify-center'>
              <Package size={28} className='text-secondary'/>
               <h1 className='text-xl text-primary font-bold'>Total Products</h1>
            </div>
           
            <p className='text-center text-secondary font-bold text-2xl'>300</p>
           </div>
           <div className='bg-white shadow rounded border border-gray-300 px-3 py-2 hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer'>
            <div className='flex gap-6 items-center justify-center'>
              <ShoppingCart size={28} className='text-secondary'/>
               <h1 className='text-xl text-primary font-bold'>Total Orders</h1>
            </div>
           
            <p className='text-center text-secondary font-bold text-2xl'>100</p>
           </div>
           <div className='bg-white shadow rounded border border-gray-300 px-3 py-2 hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer'>
            <div className='flex gap-6 items-center justify-center'>
              <Users size={28} className='text-secondary'/>
               <h1 className='text-xl text-primary font-bold'>Total Users</h1>
            </div>
           
            <p className='text-center text-secondary font-bold text-2xl'>500</p>
           </div>
           <div className='bg-white shadow rounded border border-gray-300 px-3 py-2 hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer'>
            <div className='flex gap-6 items-center justify-center'>
              <IndianRupee size={28} className='text-secondary'/>
               <h1 className='text-xl text-primary font-bold'>Total Revenue</h1>
            </div>
           
            <p className='text-center text-secondary font-bold text-2xl'>₹1500</p>
           </div>
        </div>
    </div>
    </>
  )
}

export default dashboard