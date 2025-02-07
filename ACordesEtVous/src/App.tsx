import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/homePage/HomePage";
import Footer from "./Container/Footer/Footer";
import Header from "./Container/Header/Header";
import DisplaysPage from "./Components/displaysPage/DisplaysPage";
import { useState } from "react";
import ServicesPage from "./Components/servicePage/ServicesPage";


function App() {
  const [currentPage,setCurrentPage] =useState("")
  return (
    <section className="app">
      <section className="header">
        <Header currentPage={currentPage} />
      </section>
      <section className="main">
        <Routes>
          <Route path="/" element={<HomePage  onSetCurrentPage={setCurrentPage}/>} />
          <Route path="/nosidees" element={<DisplaysPage onSetCurrentPage={setCurrentPage} />} />
          <Route path="/services" element={<ServicesPage onSetCurrentPage={setCurrentPage} />} /> 
        </Routes>
      </section>
      <section className="footer">
        <Footer />
      </section>
    </section>
  );
}

export default App;
