"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';



// Types
interface BrandsData {
  _id: string;
  name: string;
  status: string;
  description: string;
  image: string;
}

const Brands = () => {
  const [brands, setBrands] = useState<BrandsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/brands");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("brands", data);
        setBrands(data);
        setError(null);
      } catch (error) {
        console.log("error", error);
        setError(error instanceof Error ? error.message : "Failed to fetch brands");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading trusted brands...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className="text-red-600">Error loading brands: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500 text-lg">No brands available at the moment.</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold my-4 text-secondary">
              Our Trusted Brands
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Partnering with industry-leading brands to bring you the best quality products
            </p>
          </motion.div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 bg-gray-100 flex items-center justify-center p-6">
                  <div className="relative w-32 h-32">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2 text-secondary group-hover:text-primary transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {brand.description}
                  </p>
                  <div className="mt-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      brand.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {brand.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="brands-carousel"
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand._id}>
                <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
                  <div className="relative h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="relative w-28 h-28">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2 text-secondary">
                    {brand.name}
                  </h3>
                  <p className="text-gray-600 text-sm text-center line-clamp-3">
                    {brand.description}
                  </p>
                  <div className="mt-3 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      brand.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {brand.status}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

       
      </div>

      <style jsx>{`
        .brands-carousel :global(.swiper-pagination-bullet-active) {
          background-color: #your-primary-color;
        }
      `}</style>
    </section>
  );
};

export default Brands;