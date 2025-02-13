import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/homePage/HomePage";
import Footer from "./Container/Footer/Footer";
import Header from "./Container/Header/Header";
import DisplaysPage from "./Components/displaysPage/DisplaysPage";
import { useState } from "react";
import ServicesPage from "./Components/servicePage/ServicesPage";
import Guinguette from "./Components/guinguette/Guinguette";
import Events from "./Components/events/Events";
import MaterialsLocation from "./Components/materialsLocation/MaterialsLocation";
import Contact from "./Components/contact/Contact";
import TarifsPage from "./Components/tarifsPage/TarifsPage";
import Login from "./Container/login/Login";

import UpdateFormAmenagement from "./Container/upDateForm/UpdateFormAmenagement";

function App() {
	const [currentPage, setCurrentPage] = useState("");
	const [auth, setAuth] = useState("");
	const [podId, setPodId] = useState<number>();
	return (
		<section className="app">
			<section className="header">
				<Header currentPage={currentPage} />
			</section>
			<section className="main">
				<Routes>
					<Route
						path="/"
						element={<HomePage onSetCurrentPage={setCurrentPage} />}
					/>
					<Route
						path="/nosidees"
						element={
							<DisplaysPage
								onSetCurrentPage={setCurrentPage}
								auth={auth}
								onsetPodId={setPodId}
							/>
						}
					/>
					<Route
						path="/services"
						element={<ServicesPage onSetCurrentPage={setCurrentPage} />}
					/>
					<Route
						path="/guinguette"
						element={<Guinguette onSetCurrentPage={setCurrentPage} />}
					/>
					<Route
						path="/evenements"
						element={<Events onSetCurrentPage={setCurrentPage} />}
					/>
					<Route
						path="/materiel"
						element={<MaterialsLocation onSetCurrentPage={setCurrentPage} />}
					/>
					<Route
						path="/contact"
						element={<Contact onSetCurrentPage={setCurrentPage} />}
					/>
					<Route
						path="/tarifs"
						element={<TarifsPage onSetCurrentPage={setCurrentPage} />}
					/>
					<Route path="/login" element={<Login onSetAuth={setAuth} />} />
					<Route
						path="updateDisplay"
						element={<UpdateFormAmenagement auth={auth} podId={podId} />}
					/>
				</Routes>
			</section>
			<section className="footer">
				<Footer />
			</section>
		</section>
	);
}

export default App;
