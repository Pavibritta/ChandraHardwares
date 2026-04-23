"use client";
import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {categorySchema} from "../../shared/validationschemas/category.schema"
import {email, z} from "zod"
import { useSearchParams } from "next/navigation";
const addcategory = () => {
  const router=useRouter()
  const searchParams = useSearchParams();
const id = searchParams.get("id");
const isEdit = !!id;
const [preview, setPreview] = useState("");
type CategotyForm=z.infer<typeof categorySchema>
  const {register,handleSubmit,setValue,formState:{errors}} =useForm({resolver:zodResolver(categorySchema)})
  const handleAddcategory = async (data: CategotyForm) => {
  const formData = new FormData();

  formData.append("name", data.name);

  if (data.image?.[0]) {
    formData.append("image", data.image[0]);
  }

  try {
    const url = id ? `/api/categories/${id}` : `/api/categories`;
    const method = id ? "PUT" : "POST";

    const result = await fetch(url, {
      method,
      body: formData,
    });

    if (result.ok) {
      router.push("/admin/categories");
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
  if (!id) return;

  const fetchCategory = async () => {
    const res = await fetch(`/api/categories/${id}`);
    const data = await res.json();

    setValue("name", data.name);
    setPreview(data.image);
  };

  fetchCategory();
}, [id, setValue]);
  return (
     <div className="min-h-screen  flex items-center justify-center px-4 mt-20">

      {/* Card */}
      <form className="bg-primary w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8" onSubmit={handleSubmit(handleAddcategory)}>

        {/* Title */}
       <h1 className='text-center text-secondary font-bold text-xl mb-6'>{isEdit ? "Edit Category" : "Add Category"}</h1>
      {preview && (
  <img
    src={preview}
    alt="Category"
    className="w-24 h-24 object-cover rounded mb-3"
  />
)}
         <input
            type="file"
            accept='image/*'
            {...register("image")}
            onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }}
            className="w-full  px-5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base mb-4 text-white"
          />
         {errors.image?.message && (
  <p className="text-red-500 text-sm">
    {errors.image.message as string}
  </p>
)}
          <input
            type="text"
            placeholder="Enter Category Name"
            {...register("name")}
            className="w-full px-5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base mb-4 placeholder:text-white text-white"
          />
        {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        
        {/* Button */}
        <div className='flex gap-6'>

          <button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer">
         {isEdit ? "Update Category" : "Add Category"}
        </button>

        <button className="w-full bg-white hover:bg-white/90 text-primary py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer" onClick={()=>router.push("/admin/categories")}>
          Cancel
        </button>
        </div>
        
        
      </form>
    </div>
  )
}

export default addcategory