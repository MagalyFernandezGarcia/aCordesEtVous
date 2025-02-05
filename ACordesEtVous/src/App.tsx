import "./App.css";
import HomePage from "./Components/homePage/HomePage";
import Footer from "./Container/Footer/Footer";
import Header from "./Container/Header/Header";

function App() {
  return (
    <section className="app">
      <section className="header">
        <Header />
      </section>
      <section className="main">
        <HomePage />
      </section>
      <section className="footer">
        <Footer />
      </section>
    </section>
  );
}

export default App;
