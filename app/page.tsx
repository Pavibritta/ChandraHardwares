import Image from "next/image";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Brands from "./components/Brands";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <>
    <div className="relative min-h-screen bg-[url('/HeroImage.png')] bg-cover bg-center py-10">
      {/* Dark Overlay - improves text readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        
        {/* Badge/Tagline */}
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 bg-secondary/20 backdrop-blur-sm text-secondary font-semibold text-sm rounded-full">
            Welcome to HardwareHub
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="max-w-4xl font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center px-4 mb-6 leading-tight">
          Quality Tools & Materials
          <span className="text-secondary"> for Every Project</span>
        </h1>
        
        {/* Subtitle */}
        <p className="max-w-2xl text-gray-200 font-medium text-base sm:text-lg md:text-xl text-center mb-12 px-4">
          Shop paints, electrical items, plumbing tools, and construction materials at the best price.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Link href="/shop">
          <button className="group bg-secondary hover:bg-secondary/90 text-white px-8 py-3.5 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer">
            Shop Now
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
          </button>
          </Link>
          
          <Link href="/categories">
           <button className="group bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
            Explore Categories
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
          </button>
          </Link>
         
        </div>

      
        
      </div>
      
    </div>
    <Categories/>
    <Products/>
    <Brands/>
    </>
  );
}