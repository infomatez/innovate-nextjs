import Image from "next/image";
import React from "react";
import { Link } from "react-scroll";
import logoImage from '@/public/Logo-Main-image.png'
const Footer = () => {
  return (
    <div className="bg-black-600">
      <div className="flex justify-center items-center w-full h-auto py-3">
        <div className="bg-gray-300 w-[80%] h-[2px]"></div>
      </div>
      <footer className="text-white py-5">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 mb-8 lg:mb-0 flex flex-col items-center">
              <Image src={logoImage} alt="logo image" />
            </div>
            <div className="w-full lg:w-1/3 mb-8 lg:mb-0 flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold mb-4">Categories</h2>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-300">Technology</a>
                </li>
                <li className="mb-2">
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    to="Blogs"
                    duration={400}
                    offset={-50}
                    className="cursor-pointer"
                  >
                    Blogs
                  </Link>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="hover:text-gray-300"
                  >
                    Hall of Fame
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4">Pune,India</p>
              <p className="mb-4">Email: support@blogerbase.com</p>
            </div>
          </div>
          <hr className="border-gray-600 my-8" />
          <p className="text-center">
            Copyright &copy; 2023 BlogerBase.
            <a href="#" className="hover:text-gray-300 ml-2">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300 ml-2">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </div>

  );
};

export default Footer;
