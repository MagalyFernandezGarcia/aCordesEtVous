import "./footer.css";

const Footer = () => {
	return (
		<footer className="footerContainer mobileFooter">
			<div className="footerLinks">
				<p>Nos Réseaux</p>
				<div className="logoContainer">
					<img className="socialLogo" src="facebook.svg" alt="facebook logo" />
					<img className="socialLogo" src="insta.svg" alt="instagram logo" />
				</div>
			</div>
			<div className="footerLinks">
				<p>Mentions légales</p>
				<p>RGPD</p>
			</div>
		</footer>
	);
};

export default Footer;
