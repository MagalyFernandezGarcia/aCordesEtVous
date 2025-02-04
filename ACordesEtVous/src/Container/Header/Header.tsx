import BurgerMenu from "../BurgerMenu/BurgerMenu";
import "./header.css";
const Header = () => {
	return (
		<header className="headerContainer">
			<section className="linkContainer">
				<img className="logo" src="logo.jpg" alt="logo" />
				<h1 className="currentPage">A Cordes et Vous</h1>
			</section>
			<section className="linkContainer desktop ">
				<p>Salle</p>
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
