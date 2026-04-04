"use client";
import React from 'react'
import { useRouter } from 'next/navigation';

const addcategory = () => {
  const router=useRouter()
  const handleAddcategory=()=>{
   router.push("/admin/categories")
  }
  return (
     <div className="min-h-screen  flex items-center justify-center px-4 mt-20">

      {/* Card */}
      <div className="bg-primary w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8">

        {/* Title */}
       <h1 className='text-center text-secondary font-bold text-xl mb-6'>Add Category</h1>
      
         <input
            type="file"
            accept='image/*'
            className="w-full  px-5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base mb-4 text-white"
          />
          
          <input
            type="text"
            placeholder="Enter Category Name"
            className="w-full px-5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base mb-4 placeholder:text-white text-white"
          />
        
        
        {/* Button */}
        <div className='flex gap-6'>

          <button className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer" onClick={()=>{handleAddcategory()}}>
          Add Category
        </button>

        <button className="w-full bg-white hover:bg-white/90 text-primary py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer" onClick={()=>router.push("/admin/categories")}>
          Cancel
        </button>
        </div>
        
        
      </div>
    </div>
  )
}

export default addcategory