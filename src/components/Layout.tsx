// src/components/Layout.js
import React from "react";
import { Roboto } from 'next/font/google';
import SideBarNavigation from "./SideBarNavigation";


const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
});

const Layout = ({ children }) => {
  return (
    <div className="flex justify-around">
      <SideBarNavigation />
    <div className="flex-">
    <div className="flex-1 w-full">{children}</div>
      <p className="bottom-2 bottom-0 fixed  m-auto flex w-9/12 m-2 text-center justify-center items-center">
        Copyright &copy; Apotre Mwenedata 2024
      </p>
    </div>
    </div>
  );
};

export default Layout;
