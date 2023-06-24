import "../../App.css";
import React from "react";
import Footer from "../Footer";
import Map from "./Map";

function Home() {
  return (
    <div className="home-container">
      <Map />
      <Footer />
    </div>
  );
}

export default Home;
