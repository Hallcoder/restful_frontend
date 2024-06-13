// src/components/Layout.js
import React from "react";
import { Roboto } from 'next/font/google';


const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
});

const Layout = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default Layout;
