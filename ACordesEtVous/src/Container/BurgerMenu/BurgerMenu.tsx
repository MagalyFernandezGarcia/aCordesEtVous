import { slide as Menu } from "react-burger-menu";
import "./burgerMenu.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleStateChange = (state: { isOpen: boolean }) => {
		setIsOpen(state.isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<Menu right isOpen={isOpen} onStateChange={handleStateChange}>
			<ul>
				<li>
					<Link to="/" className="menu-item" onClick={closeMenu}>
						Accueil
					</Link>
				</li>
				<li>
					<Link to="/services" className="menu-item" onClick={closeMenu}>
						Services
					</Link>
				</li>
				<li>
					<Link to="/nosidees" className="menu-item" onClick={closeMenu}>
						Salle
					</Link>
				</li>
				<li>
					<Link to="/guinguette" className="menu-item" onClick={closeMenu}>
						Guingette
					</Link>
				</li>
				<li>
					<Link to="/evenements" className="menu-item" onClick={closeMenu}>
						Evénements
					</Link>
				</li>
				<li>
					<Link to="/materiel" className="menu-item" onClick={closeMenu}>
						Matériel
					</Link>
				</li>
				<li>
					<Link to="/tarifs" className="menu-item" onClick={closeMenu}>
						Tarifs
					</Link>
				</li>
				<li>
					<Link to="/contact" className="menu-item" onClick={closeMenu}>
						Contact
					</Link>
				</li>
				<li>
					<Link to="/login" className="menu-item login" onClick={closeMenu}>
						Admin
					</Link>
				</li>
			</ul>
		</Menu>
	);
};

export default BurgerMenu;
