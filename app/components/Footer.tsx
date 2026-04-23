import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-10 md:grid-cols-4 grid-cols-2">

        {/* Logo + About */}
        <div>
          <Image
            src="/chandra hardware finals copy 1.png"
            alt="logo"
            height={50}
            width={150}
          />
          <p className="mt-4 text-sm text-gray-200 leading-6">
            Your trusted hardware shop for construction, electrical,
            and plumbing needs. Quality products at the best price.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
            Quick Links
          </h2>
          <ul className="flex flex-col gap-3 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "Categories", path: "/categories" },
              { name: "Shop", path: "/shop" },
              { name: "Brands", path: "/brands" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  href={item.path}
                  className="hover:text-secondary transition-all duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
            Categories
          </h2>
          <ul className="flex flex-col gap-3 text-sm">
            {["Electricals", "Plumbing", "Painting", "Construction"].map(
              (cat, i) => (
                <li key={i}>
                  <Link
                    href="/shop"
                    className="hover:text-secondary transition-all duration-300"
                  >
                    {cat}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
            Contact
          </h2>
          <p className="text-sm text-gray-200 leading-6">
            No 7/367, Main Road,
            <br />
            Venkateswarapuram,
            <br />
            Tirunelveli - 627854,
            <br />
            Tamil Nadu, India
          </p>

          {/* Optional phone/email */}
          <div className="mt-4 text-sm">
            <p>📞 +91 98765 43210</p>
            <p>📧 support@chandrahardware.com</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 text-center py-4 text-sm text-gray-300">
        © {new Date().getFullYear()} Chandra Hardware. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;