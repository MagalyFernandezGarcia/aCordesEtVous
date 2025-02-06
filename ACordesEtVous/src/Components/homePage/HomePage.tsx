import { useEffect, useState } from "react";
import { fetchCardList } from "../../Services/cardsServices";
import { Card } from "../../Types/cards";
import "./homePage.css";
import { Link } from "react-router-dom";

const HomePage = ({
  onSetCurrentPage,
}: {
  onSetCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    onSetCurrentPage("Accueil");
    const fetchData = async () => {
      let ignore = false;

      const result = await fetchCardList();
      if (!ignore) {
        setCards(result);
      }

      return () => {
        ignore = true;
      };
    };

    fetchData();
  }, []);

  const normalizeString = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase();

  const sortedCards = [...cards].sort((a, b) => a.id - b.id);

  const cardList = sortedCards.map((card) => {
    return (
      <div key={card.id} className="card">
        <Link to={`/${normalizeString(card.title.rendered)}`}>
          <h2 className="cardTitle">{card.titre}</h2>
        </Link>
        <img
          className="cardImage"
          src={card.image_de_la_carte.guid}
          alt="illustration du service"
        />
      </div>
    );
  });

  return (
    <>
      <main className="homePage ">
        <section className="upSection">
          <h1 className="slogan onlyDesktop">
            Une salle, plusieurs ambiances{" "}
          </h1>
          <div className="sloganContainer onlyMobile">
            <h1 className="slogan">Une salle,</h1>
            <h1 className="slogan">plusieurs ambiances</h1>
          </div>
          <ul className="info">
            <li>Capacité : 100 personnes</li>
            <li>A louer avec ou sans service au bar</li>
          </ul>
          <button className="onlyMobile moreBtn">Plus d'infos</button>
        </section>
        <section className="downSection onlyDesktop">{cardList}</section>
      </main>
    </>
  );
};

export default HomePage;
