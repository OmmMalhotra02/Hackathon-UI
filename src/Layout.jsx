import React, {Component} from 'react'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from 'react-router-dom';
import FrameWrapper from './FrameWrapper';
function Layout() {
  return (
    // <FrameWrapper>
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
    // </FrameWrapper>
  );
}

export default Layout
