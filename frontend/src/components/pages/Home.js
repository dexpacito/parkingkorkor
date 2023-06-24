import "../../App.css";
import React from "react";
import Footer from "../Footer";
import Map from "./Map";

function Home() {
  return (
    <div className="home-container">
      <p className="Home-heading">Park Smarter, Not Harder</p>
      <p className="Home-text">
        Let Parkingkorkor find the best parking solutions for you.
      </p>
      <Map />
      <Footer />
    </div>
  );
}

export default Home;
