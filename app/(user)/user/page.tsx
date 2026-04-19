import Image from "next/image";
import Categories from "../../components/Categories";
import Products from "../../components/Products";
import Brands from "../../components/Brands";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="relative min-h-screen   py-10">
      
      
      <Products/>
    </div>
    
    </>
  );
}