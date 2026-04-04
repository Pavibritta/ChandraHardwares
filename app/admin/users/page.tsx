import React from 'react'
import { Search,Pencil, Trash2 } from "lucide-react";

import Image from 'next/image';

const users = () => {
const users = [
    {
      id: 1,
      user: "Pavithra",
      email: "pavithrarajase1@gmail.com",
      status: "Active",
      joinedDate:
        "04/03/2026",   
    },
    {
      id: 2,
      user: "Priya",
      email: "priya@gmail.com",
      status: "Active",
      joinedDate:
        "04/03/2026", 
    },
    {
      id: 3,
      user: "Kumar",
      email: "kumar@gmail.com",
      status: "Active",
      joinedDate:
        "04/03/2026", 
    },
    {
      id: 4,
      user: "Ramya",
      email: "ramya@gmail.com",
      status: "Active",
      joinedDate:
        "04/03/2026", 
    },
  ];
  return (
    <>
    <div className='mt-20 bg-gray-50 px-3 py-2'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-xl text-primary'>Products</h1>
        <div className="relative  mx-auto w-full max-w-xl">
                <Search size={18} className="absolute  top-1/2 right-5 -translate-y-1/2 text-gray-700 cursor-pointer"/>
                <input type="search" placeholder="Search Users..." className="w-full outline-none shadow rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary px-3 py-2 max-w-xl"/>
              </div>
      </div>
      
      
<div className="w-full mt-5">
  <div className="shadow-sm rounded-lg border border-gray-100">

    {/* Important wrapper */}
    <div className="w-full max-w-full overflow-x-scroll">
      
      {/* Force table width */}
      <table className="w-[900px] min-w-[900px]">
        
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-4 py-3 text-left">User</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Joined Date</th>
          </tr>
        </thead>

        <tbody className="text-gray-600 text-sm">
          {users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-secondary/20 transition">

              <td className="px-4 py-3">
                {user.user}
              </td>

              <td className="px-4 py-3 whitespace-nowrap">
                {user.email}
              </td>

              <td className="px-4 py-3 whitespace-nowrap">
                {user.status}
              </td>

              <td className="px-4 py-3 whitespace-nowrap">
                {user.joinedDate}
              </td>

              <td className="px-4 py-3 flex gap-2">
                <button className="bg-primary rounded p-2">
                  <Pencil size={15} className="text-secondary" />
                </button>

                <button className="bg-primary rounded p-2">
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
  )
}

export default users