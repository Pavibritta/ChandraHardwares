"use client";
import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {productSchema} from "../../shared/validationschemas/category.schema"
import {z} from "zod"
import { useSearchParams } from "next/navigation";

const AddProduct  = () => {
  const router=useRouter()
  const searchParams = useSearchParams();
const id = searchParams.get("id");
const [preview, setPreview] = useState("");
const isEdit = !!id;
  type productForm=z.infer<typeof productSchema>
  const {register,handleSubmit,setValue,formState:{errors}}=useForm({resolver:zodResolver(productSchema)})
  const handleAddProduct = async (data: productForm) => {
  const formdata = new FormData();

  // only append image if selected
  if (data.image && data.image.length > 0) {
    formdata.append("image", data.image[0]);
  }

  formdata.append("name", data.name);
  formdata.append("categoryId", data.categoryId);
  formdata.append("brand", data.brand);
  formdata.append("stock", String(data.stock));
  formdata.append("price", String(data.price));
  formdata.append("description", data.description);

  try {
    const url = id ? `/api/products/${id}` : `/api/products`;
    const method = id ? "PUT" : "POST";

    const result = await fetch(url, {
      method,
      body: formdata,
    });

    if (result.ok) {
      router.push("/admin/products");
    }
  } catch (error) {
    console.log(error);
  }
};
type Category = {
  _id: string;
  name: string;
  image: string;
};
  //get categories
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

    useEffect(() => {
  if (!id) return;

  const fetchProduct = async () => {
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();

    // set values
    setValue("name", data.name);
    setValue("brand", data.brand);
    setValue("stock", data.stock);
    setValue("price", data.price);
    setValue("description", data.description);
    setValue("categoryId", data.category?._id);
    setPreview(data.image); 
  };

  fetchProduct();
}, [id, setValue]);
  return (
     <div className="min-h-screen  flex items-center justify-center px-4 mt-20">

      {/* Card */}
      <form className="bg-primary w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8"onSubmit={handleSubmit(handleAddProduct)}>

        {/* Title */}
       <h1 className='text-center text-secondary font-bold text-xl mb-6'>Add Product</h1>
      {preview && (
  <img
    src={preview}
    alt="Product"
    className="w-24 h-24 object-cover rounded mb-3"
  />
)}
         <input
            type="file"
            accept='image/*'
            {...register("image")}
            className="w-full  px-5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base mb-4 text-white"
          />
          {errors.image?.message && (
  <p className="text-red-500 text-sm">
    {errors.image.message as string}
  </p>
)}
          <input
            type="text"
            placeholder="Enter Product Name"
            {...register("name")}
            className="w-full px-5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base mb-4 placeholder:text-white text-white"
          />
        {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

        
          
       <select
  {...register("categoryId", { required: "Category is required" })}
  className="w-full px-5 py-2.5 rounded-lg border border-gray-300 bg-primary text-white focus:ring-2 focus:ring-primary outline-none mb-4"
>
  <option value="" className="bg-white text-black">
    Select Category
  </option>

  {categories.map((cat) => (
    <option
      key={cat._id}
      value={cat._id}
      className="bg-white text-black"
    >
      {cat.name}
    </option>
  ))}
</select>

{errors.categoryId && (
  <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
)}
          
         <input
            type="text"
            placeholder="Enter Product Brand"
            {...register("brand")}
            className="w-full px-5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base mb-4 placeholder:text-white text-white"
          />
          {errors.brand && (
            <p className="text-red-500 text-sm">{errors.brand.message}</p>
          )}
           <input
            type="number"
            placeholder="Enter Product Stock"
            {...register("stock",{valueAsNumber:true})}
            min={1}
            className="w-full px-5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base mb-4 placeholder:text-white text-white"
          />
{errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
          <input
            type="number"
            placeholder="Enter Product Price"
            {...register("price",{valueAsNumber:true})}
            min={1}
            className="w-full px-5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base mb-4 placeholder:text-white text-white"
          />
        {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        <textarea placeholder="Enter Product description" className="w-full px-5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base mb-4 placeholder:text-white text-white"{...register("description")}></textarea>
        {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        {/* Button */}
        <div className='flex gap-6'>

          <button type ="submit"className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer" >
          {isEdit ? "Update Product" : "Add Product"}
        </button>

        <button className="w-full bg-white hover:bg-white/90 text-primary py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer" onClick={()=>router.push("/admin/products")}>
          Cancel
        </button>
        </div>
        
        
      </form>
    </div>
  )
}

export default AddProduct 