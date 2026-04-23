import React, { Suspense } from 'react'
import Products from '../../components/Products'
export const dynamic = "force-dynamic";
const shop = () => {
  return (
    <>
    <Suspense>
       <Products/>
    </Suspense>
   
    </>
  )
}

export default shop