import { Link } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import "./header.css";

const Header = ({ currentPage }: { currentPage: string }) => {
	return (
		<header className="headerContainer">
			<section className="logoHomeContainer">
				<Link to="/" className="linkContainer">
					<img
						className="logo"
						src="https://acordesetvous.faaaster.dev/wp-content/uploads/2025/02/logo.jpg"
						alt="logo"
					/>

					<h1 className="currentPage desktop">A Cordes et Vous</h1>
				</Link>

				<h1 className="currentPage mobile">{currentPage}</h1>
			</section>
			<section className="linkContainer desktop ">
				<Link to="/nosidees">Salle</Link>
				<Link to="/guinguette">Guingette</Link>
				<Link to="/evenements">Evénements</Link>
				<Link to="/materiel">Matériel</Link>
				<Link to="/contact">Contact</Link>
				<Link to="/login">Admin</Link>
			</section>
			<section className="mobile">
				<BurgerMenu />
			</section>
		</header>
	);
};

export default Header;
