"use client";
import React  from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {brandSchema} from "../../shared/validationschemas/category.schema"
import {email, z} from "zod"
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from 'react';
const AddBrand  = () => {
  const router=useRouter()
  const searchParams = useSearchParams();
const id = searchParams.get("id");
const isEdit = !!id;
const [preview, setPreview] = useState("");
  type BrandSchema= z.infer<typeof brandSchema>
  const {register,handleSubmit,setValue,formState:{errors}}=useForm({resolver:zodResolver(brandSchema)})
 const handleAddBrand = async (data: BrandSchema) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("status", data.status);
  formData.append("description", data.description);

  // only if new image selected
  if (data.image?.[0]) {
  formData.append("image", data.image[0]);
}

  try {
    const url = id ? `/api/brands/${id}` : `/api/brands`;
    const method = id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      body: formData,
    });

    if (res.ok) {
      router.push("/admin/brands");
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
  if (!id) return;

  const fetchBrand = async () => {
    const res = await fetch(`/api/brands/${id}`);
    const data = await res.json();

    setValue("name", data.name);
    setValue("status", data.status);
    setValue("description", data.description);

    setPreview(data.image); // ✅ show existing image
  };

  fetchBrand();
}, [id, setValue]);
  return (
     <div className="min-h-screen  flex items-center justify-center px-4 mt-20">

      {/* Card */}
      <form className="bg-primary w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8" onSubmit={handleSubmit(handleAddBrand) }>

        {/* Title */}
       <h1 className='text-center text-secondary font-bold text-xl mb-6'>{isEdit ? "Edit Brand" : "Add Brand"}</h1>
     {preview && (
  <img
    src={preview}
    alt="Brand"
    className="w-24 h-24 object-cover rounded mb-3 border"
  />
)}
<input
  type="file"
  accept="image/*"
  {...register("image")}
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // ✅ NEW preview
    }
  }}
   className="w-full  px-5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base mb-4 text-white"
/>
         
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
          <input
            type="text"
            placeholder="Enter Brand Name"
            {...register("name")}
            className="w-full px-5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base mb-4 placeholder:text-white text-white"
          />
        {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

        
          
          <input
            type="text"
            placeholder="Enter Brand Status"
            {...register("status")}
            className="w-full px-5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base mb-4 placeholder:text-white text-white"
          />
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
         <textarea
            
            placeholder="Enter Brand Description"
            {...register("description")}
            className="w-full px-5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base mb-4 placeholder:text-white text-white"
          ></textarea>
           {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        
        {/* Button */}
        <div className='flex gap-6'>

          <button type='submit' className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer" >
          {isEdit ? "Update Brand" : "Add Brand"}
        </button>

        <button className="w-full bg-white hover:bg-white/90 text-primary py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer" onClick={()=>router.push("/admin/brands")}>
          Cancel
        </button>
        </div>
        
        
      </form>
    </div>
  )
}

export default AddBrand 