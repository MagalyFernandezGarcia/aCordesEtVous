import { Link } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import "./header.css";
const Header = ({currentPage} : {currentPage :string}) => {
	return (
		<header className="headerContainer">
			<section className="linkContainer">
			<Link to="/"><img className="logo" src="logo.jpg" alt="logo" /></Link>
			<h1 className="currentPage desktop">A Cordes et Vous</h1>
				
				<h1 className="currentPage mobile">{currentPage}</h1>
			</section>
			<section className="linkContainer desktop ">
				<Link to="/nosidees">Salle</Link>
				<p>Guingette</p>
				<p>Evénements</p>
				<p>Matériel</p>
				<p>Contact</p>
			</section>
			<section className="mobile">
				<BurgerMenu />
			</section>
		</header>
	);
};

export default Header;
