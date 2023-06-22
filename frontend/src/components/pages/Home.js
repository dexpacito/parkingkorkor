import "../../App.css";
import SearchSection from "../SearchSection";
import React from "react";
import Footer from "../Footer";
import Map from "./Map";

function Home() {
  return (
    <>
      <SearchSection />
      <Map /> {/* Add the Map component */}
      <Footer />
    </>
  );
}

export default Home;
