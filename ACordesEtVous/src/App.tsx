import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/homePage/HomePage";
import Footer from "./Container/Footer/Footer";
import Header from "./Container/Header/Header";
import DisplaysPage from "./Components/displaysPage/DisplaysPage";

// function App() {
//   return (
//     <>

//     <Header/>
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/displays" element={<DisplaysPage />} />
//     </Routes>
//     <Footer />
//     </>
//   );
// }
function App() {
  return (
    <section className="app">
      <section className="header">
        <Header />
      </section>
      <section className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/displays" element={<DisplaysPage />} />
        </Routes>
      </section>
      <section className="footer">
        <Footer />
      </section>
    </section>
  );
}

export default App;
