import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import Reset from "./components/pages/Reset";
import Dashboard from "./components/pages/Dashboard";
import { ChakraProvider } from '@chakra-ui/react'




function App() {
  return (
    <>
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/sign-up" exact Component={SignUp} />
          <Route path="/login" exact Component={Login} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
