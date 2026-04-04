import React from 'react'
import { Search,Pencil, Trash2 } from "lucide-react";

import Image from 'next/image';

const orders = () => {
const orders = [
    {
       id: 1,
    customer: "Pavithra",
    date: "04/03/2026",
    amount: "₹1500",
    status: "delivered",
    payment: "Online",
    },
    {
        id: 2,
    customer: "Pavithra",
    date: "04/03/2026",
    amount: "₹1500",
    status: "delivered",
    payment: "Online",
    },
    {
        id: 3,
    customer: "Pavithra",
    date: "04/03/2026",
    amount: "₹1500",
    status: "delivered",
    payment: "Online",
    },
    {
        id: 4,
    customer: "Pavithra",
    date: "04/03/2026",
    amount: "₹1500",
    status: "delivered",
    payment: "Online",
    },
  ];
  return (
    <>
    <div className='mt-20 bg-gray-50 px-3 py-2'>
      <div className='flex gap-3'>
        <h1 className='font-bold text-xl text-primary'>Order Management</h1>
        
              <div className="relative flex-1">
                <Search size={18} className="absolute  top-1/2 right-5 -translate-y-1/2 text-gray-700 cursor-pointer"/>
                <input type="search" placeholder="Search Orders..." className="w-full outline-none shadow rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary px-3 py-2"/>
              </div>
              <select name="" id="" className=" outline-none shadow rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary px-3 py-2 ">
                <option value="">Date</option>
              </select>
              <select name="" id="" className=" outline-none shadow rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary px-3 py-2 ">
                <option value="">All Brands</option>
              </select>
           
      </div>
      
      

       <table className='border border-gray-100 w-full rounded-lg shadow-sm mt-3 p-3 overflow-x-auto'>
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
    <tr>
      <th className="px-4 py-3 text-left">Order Id</th>
      <th className="px-4 py-3 text-left">Customer Name</th>
      <th className="px-4 py-3 text-left">Date</th>
      <th className="px-4 py-3 text-left">Amount</th>
      <th className="px-4 py-3 text-left">Status</th>
      <th className="px-4 py-3 text-left">Payment</th>
      <th className="px-4 py-3 text-left">Actions</th>
    </tr>
  </thead>

  <tbody className='text-gray-600 text-sm'>

    {orders.map((order)=>(
      <tr className='border-t hover:bg-secondary/20 transition cursor-pointer' key={order.id}>
        
        <td className='px-4 py-3'>{order.id}</td>
        <td className='px-4 py-3'>{order.customer}</td>
        <td className='px-4 py-3'>{order.date}</td>
        <td className='px-4 py-3'>{order.amount}</td>
        <td className='px-4 py-3'>{order.status}</td>
        <td className='px-4 py-3'>{order.payment}</td>
        <td className='px-4 py-3 flex gap-3'>
          <button className='bg-primary rounded px-2 py-2 cursor-pointer'><Pencil className='text-secondary' size={15}/></button>
          <button className='bg-primary rounded px-2 py-2 cursor-pointer'><Trash2 className='text-secondary' size={15}/></button>
        </td>
      </tr>
    ))}
      
  </tbody>


        </table>       

    </div>
    
      
    </>
  )
}

export default orders