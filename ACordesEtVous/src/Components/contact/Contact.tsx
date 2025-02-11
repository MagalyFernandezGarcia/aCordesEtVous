import { useEffect } from "react";
import "./contact.css";

const Contact = ({
  onSetCurrentPage,
}: {
  onSetCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  useEffect(() => {
    onSetCurrentPage("Contact");
  }, []);

  return (
    <>
      <h1 className="contactTitle desktopOnly">Contactez-nous</h1>
      <main className="contactPage">
        <section className="leftSection">
            <div className="address">
          <p>Place de Corde 21,</p>
          <p>7910 Frasnes-Lez-Anvaing</p>
          </div>
          <div className="contactInfo">
            <img src="mail.svg" alt="enveloppe" className="logoContact" />
            <p>acordes.vous@gmail.com</p>
          </div>
          <div className="contactInfo">
            <img src="phone.svg" alt="téléphone" className="logoContact" />
            <p>0477/19.82.45</p>
          </div>
        </section>
        <section >
          <img src="map.png" alt="carte de la localisation" className="map" />
        </section>
        <section className="socialMedia mobileOnly">
            <a href="https://www.facebook.com/profile.php?id=61560461489968" target="_blank"><img src="fb.svg" alt="facebook logo" className="socialMediaLogo"/></a>
            <a href=""><img src="instagram.png" alt="instagram logo" className="socialMediaLogo insta"/></a>
        </section>
      </main>
    </>
  );
};

export default Contact;
