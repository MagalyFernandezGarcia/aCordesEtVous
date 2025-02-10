import { slide as Menu } from "react-burger-menu";
import "./burgerMenu.css";
import { useState } from "react";

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
					<a href="/" className="menu-item" onClick={closeMenu}>
						Accueil
					</a>
				</li>
				<li>
					<a href="/services" className="menu-item" onClick={closeMenu}>
						Services
					</a>
				</li>
				<li>
					<a href="/nosidees" className="menu-item" onClick={closeMenu}>
						Salle
					</a>
				</li>
				<li>
					<a href="/guinguette" className="menu-item" onClick={closeMenu}>
						Guingette
					</a>
				</li>
				<li>
					<a href="/evenements" className="menu-item" onClick={closeMenu}>
						Evénements
					</a>
				</li>
				<li>
					<a href="/about" className="menu-item" onClick={closeMenu}>
						Matériel
					</a>
				</li>
				<li>
					<a href="/about" className="menu-item" onClick={closeMenu}>
						Tarifs
					</a>
				</li>
				<li>
					<a href="/contact" className="menu-item" onClick={closeMenu}>
						Contact
					</a>
				</li>
			</ul>
		</Menu>
	);
};

export default BurgerMenu;
