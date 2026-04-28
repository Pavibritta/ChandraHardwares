"use client"
import React, { useEffect, useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const brands = () => {
  // const brands = [
  //   {
  //     id: 1,
  //     img: "/Asian Paints.jpg",
  //     brandName: "Asian Paints",
  //     status: "Active",
  //     description:
  //       "offers a comprehensive range of products including interior and exterior paints",
  //   },
  //   { id: 2, img: "/cera.png", brandName: "Cera", status: "Active", description:
  //       "offers a comprehensive range of products including interior and exterior paints", },
  //   { id: 3, img: "/neycer.jpg", brandName: "Neycer", status: "Active", description:
  //       "offers a comprehensive range of products including interior and exterior paints", },
  //   { id: 4, img: "/kiscol.png", brandName: "Kiscol", status: "Active", description:
  //       "offers a comprehensive range of products including interior and exterior paints", },
   
  //   {
  //     id: 5,
  //     img: "/tata-steel-logo.png",
  //     brandName: "Tata Steel",
  //     status: "Active",
  //      description:
  //       "offers a comprehensive range of products including interior and exterior paints",
  //   },
  // ];
   type Brands ={
    _id:string,
    name:string,
    status:string,
    description:string,
    image:string
   }
  const [brands,setBrands]=useState<Brands []>([])
  const [search, setSearch] = useState("");
  const filteredBrands = brands.filter((b) =>
  b.name.toLowerCase().includes(search.toLowerCase()) ||
  b.status.toLowerCase().includes(search.toLowerCase())
);
  useEffect(()=>{
    const fetchBrands = async ()=>{
      try{
        const response= await fetch("/api/brands")
      
      const data= await response.json()
      console.log("brands",data)
      setBrands(data)
      }catch(error){
        console.log("error",error)
      }
      
    }
    fetchBrands()
  },[])

  // handle delete
  const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Are you sure to delete this brand?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/brands/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // remove from UI
      setBrands((prev) => prev.filter((b) => b._id !== id));
    }
  } catch (error) {
    console.log("Delete error:", error);
  }
};
  return (
    <>
      <div className="w-full mt-20 bg-gray-50 px-3 py-2">
        <div className="flex justify-between">
          <h1 className="font-bold text-xl text-primary">Brands</h1>
          <div className="relative  mx-auto w-full max-w-xl">
          <Search
            size={18}
            className="absolute  top-1/2 right-5 -translate-y-1/2 text-gray-700 cursor-pointer"
          />
          <input
  type="search"
  placeholder="Search Brands..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full outline-none shadow rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary px-3 py-2 max-w-xl"
/>
          
        </div>
          <Link href="/admin/addbrand">
          <button className="bg-secondary text-white rounded shadow px-3 py-2 font-bold hover:bg-secondary/80 transition-all ease-in-out duration-300 cursor-pointer">
            + Add Brand
          </button>
          </Link>
          
        </div>

        
        <div className="w-full mt-5">
          <div className="shadow-sm rounded-lg border border-gray-100">
            {/* Important wrapper */}
            <div className="w-full max-w-full overflow-x-scroll">
              {/* Force table width */}
              <table className="w-[900px] min-w-[900px]">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">Logo</th>
                    <th className="px-4 py-3 text-left">Brand Name</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="text-gray-600 text-sm">
                  {filteredBrands.map((brand) => (
                    <tr
                      key={brand._id}
                      className="border-t hover:bg-secondary/20 transition"
                    >
                      <td className="px-4 py-3">
                                      <Image
                                        src={brand.image}
                                        alt={brand.name}
                                        width={40}
                                        height={40}
                                        className="rounded object-cover"
                                      />
                                    </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        {brand.name}
                      </td>

                      <td>
  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
    {brand.status}
  </span>
</td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        {brand.description}
                      </td>

                      <td className="px-4 py-3 flex gap-2">
                       <Link href={`/admin/addbrand?id=${brand._id}`}>
  <button className="bg-primary rounded p-2">
    <Pencil size={15} className="text-secondary" />
  </button>
</Link>

                        <button
  className="bg-primary rounded p-2"
  onClick={() => handleDelete(brand._id)}
>
  <Trash2 size={15} className="text-secondary" />
</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default brands;
