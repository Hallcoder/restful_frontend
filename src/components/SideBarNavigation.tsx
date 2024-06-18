// src/components/SideBarNavigation.js
import Link from 'next/link';
import React from 'react';
import Logo from "../../public/assets/images/logo.png"
import Image from 'next/image';

const SideBarNavigation = () => {
  return (
    <div className="fixed left-0 bg-gray-800 text-white h-screen w-2/12 flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-24 bg-gray-700">
        <Image src={Logo} alt="Logo" className="h-20 w-20 rounded-md object-cover" />
      </div>
      {/* Navigation Links */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="py-4">
          <Link href="/books" className="block px-6 py-3 hover:bg-gray-700">Books</Link>
        </div>
        {/* Profile Link */}
        <div className="px-6 py-3 border-t border-gray-700">
          <Link href="/profile" className="block text-sm text-gray-400 hover:text-white">
            <p className='cursor-pointer'>Go to Profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBarNavigation;
