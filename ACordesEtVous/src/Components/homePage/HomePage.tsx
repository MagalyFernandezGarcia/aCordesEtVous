import { useEffect, useState } from "react";
import { fetchCardList } from "../../Services/cardsServices";
import { Card } from "../../Types/cards";
import "./homePage.css";

const HomePage = () => {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
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

    const cardList = cards.map((card) => {
        return (
            <div key={card.id} className="card">
                <h2>{card.titre}</h2>
                <img className="cardImage" src={card.image_de_la_carte.guid} alt="illustration du service" />
            </div>
        )
    })

  return (
    <>
    <main className="homePage " >
      <section className="upSection">
        <h1 className="slogan onlyDesktop">Une salle, plusieurs ambiances </h1>
        <div className="sloganContainer onlyMobile" >
            <h1 className="slogan">Une salle,</h1>
            <h1 className="slogan">plusieurs ambiances</h1>
        </div>
        <ul className="info">
            <li>Capacité : 100 personnes</li>
            <li>A louer avec ou sans service au bar</li>
        </ul>
      </section>
      <section className="downSection onlyDesktop">
        {cardList}
        </section>
    </main>
    
    </>
    
  );
};

export default HomePage;
