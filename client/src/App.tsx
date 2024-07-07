import React from "react";
import Navbar from "./components/ui/Navbar";
import Banner from "./components/ui/Banner";
import Footer from "./components/ui/Footer";
import Freebook from "./components/Freebook";
export default function App() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Freebook />
      <Footer />
    </div>
  );
}
