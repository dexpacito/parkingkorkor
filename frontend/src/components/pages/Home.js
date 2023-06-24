import "../../App.css";
import React from "react";
import Footer from "../Footer";
import Map from "./Map";

function Home() {
  return (
    <>
      <Map /> {/* Add the Map component */}
      <Footer />
    </>
  );
}

export default Home;
