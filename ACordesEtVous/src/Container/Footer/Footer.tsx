import "./footer.css";

const Footer = () => {
	return (
		<footer className="footerContainer mobileFooter">
			<div className="footerLinks">
				<div className="logoContainer">
					<a
						href="https://www.facebook.com/profile.php?id=61560461489968"
						target="_blank"
					>
						<img
							className="socialLogo"
							src="https://acordesetvous.faaaster.dev/wp-content/uploads/2025/02/facebook.png"
							alt="facebook logo"
						/>
					</a>
					<img
						className="socialLogo"
						src="https://acordesetvous.faaaster.dev/wp-content/uploads/2025/02/insta.png"
						alt="instagram logo"
					/>
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
