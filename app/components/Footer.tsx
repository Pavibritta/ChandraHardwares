import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-3 w-full max-w-8xl bg-primary">
        <div className="px-10 py-5">
          <Image
            src="/chandra hardware finals copy 1.png"
            alt="logo"
            height={50}
            width={150}
          />
          <p className="text-white">
            Your trusted hardware shop for all construction needs.
          </p>
        </div>

        <div className="px-10 py-5">
          <h1 className="text-white">Quick Links</h1>
          <ul className="mt-5 text-secondary font-bold flex flex-col gap-5">
            <li>
              <Link
                href="/"
                className="hover:bg-secondary/15 px-3 py-2 rounded transition-all ease-in-out duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="hover:bg-secondary/15 px-3 py-2 rounded transition-all ease-in-out duration-300"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="hover:bg-secondary/15 px-3 py-2 rounded transition-all ease-in-out duration-300"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/brands"
                className="hover:bg-secondary/15 px-3 py-2 rounded transition-all ease-in-out duration-300"
              >
                Brands
              </Link>
            </li>
          </ul>
        </div>

        <div className="px-10 py-5">
          <h1 className="text-white">Categories</h1>
          <ul className="mt-5 text-secondary font-bold flex flex-col gap-5">
            <li>
              <Link
                href="/"
                className="hover:bg-secondary/15 px-3 py-2 rounded transition-all ease-in-out duration-300"
              >
                Electricals
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:bg-secondary/15 px-3 py-2 rounded transition-all ease-in-out duration-300"
              >
                Plumbing
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:bg-secondary/15 px-3 py-2 rounded transition-all ease-in-out duration-300"
              >
                Painting
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:bg-secondary/15 px-3 py-2 rounded transition-all ease-in-out duration-300"
              >
                Construction
              </Link>
            </li>
          </ul>
        </div>

        <div className="px-10 py-5">
          <h1 className="text-white">Contact</h1>
          <div className="font-bold text-secondary mt-5">
            No 7/367,Main Road, Venkateswarapuram, Tirunelveli-627854,
            Tamilnadu.
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
