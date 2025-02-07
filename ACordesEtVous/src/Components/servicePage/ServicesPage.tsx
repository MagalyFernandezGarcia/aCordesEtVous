import { useState, useEffect } from "react";
import { fetchCardList } from "../../Services/getServices";
import { Card } from "../../Types/cards";
import "./servicesPage.css";
import { Link } from "react-router";
const ServicesPage = ({
  onSetCurrentPage,
}: {
  onSetCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [events, setEvents] = useState<Card[]>([]);

  useEffect(() => {
    onSetCurrentPage("Nos services");
    const fetchData = async () => {
      let ignore = false;

      const result = await fetchCardList();
      if (!ignore) {
        setEvents(result);
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

  const sortedEvents = events.sort((a, b) => a.id - b.id);
  const displayEvents = sortedEvents.map((event) => {
    return (
        <Link  to={`/${normalizeString(event.title.rendered)}`} key={event.id}><section className="serviceContainer" >
        <h2 className="titleService">{event.titre}</h2>
        <img src={event.image_de_la_carte.guid} alt="illustration du service"  className="photoService"/>
      </section></Link>
    );
  });

  return <main className="servicesPage">{displayEvents}</main>;
};

export default ServicesPage;
