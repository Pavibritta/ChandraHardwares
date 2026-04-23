/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // ✅ important
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://chandrahardwares.onrender.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
