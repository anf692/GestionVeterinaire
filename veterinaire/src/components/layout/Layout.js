// src/components/layout/Layout.js

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "../../index.css";

export default function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <main className="content">
          <Outlet /> 
        </main>
      </div>
      <Footer />
    </div>
  );
}
