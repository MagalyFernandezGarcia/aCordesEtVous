import { useEffect, useState } from "react";
import { fetchEventsList } from "../../Services/getServices";
import { Evenement } from "../../Types/evenements";
import "./events.css";
import ModalEvent from "./modal/ModalEvents";

const Events = ({
  onSetCurrentPage,
}: {
  onSetCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [passedEvent, setPassedEvent] = useState<Evenement[]>([]);
  const [actualEvent, setActualEvent] = useState<Evenement[]>([]);
  const [imageEvent, setImageEvent] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isPassedSelected, setIsPassedSelected] = useState(false);

  useEffect(() => {
    onSetCurrentPage("Evènements");
    const fetchData = async () => {
      let ignore = false;

      const result = await fetchEventsList();

      const sortedResult = [...result].sort((a, b) => a.id - b.id);
      const todayMonth = new Date().getMonth();
      const todayYear = new Date().getFullYear();

      const { passedEvents, actualEvents } = sortedResult.reduce<{
        passedEvents : Evenement[];
        actualEvents : Evenement[]
      }>(
        (acc, event) => {
          const eventMonth = new Date(event.date_de_l_evenement).getMonth();
          const eventYear = new Date(event.date_de_l_evenement).getFullYear();
      
          
          if (eventYear < todayYear || (eventYear === todayYear && eventMonth < todayMonth)) {
            acc.passedEvents.push(event);
          } else {
            acc.actualEvents.push(event);
          }
      
          return acc;
        },
        { passedEvents: [], actualEvents: [] } 
      );

      if (!ignore) {
        setPassedEvent(passedEvents);
        setActualEvent(actualEvents);
      }

      return () => {
        ignore = true;
      };
    };

    fetchData();
  }, []);

  const handleArrayEvent = () => {
    

    setIsPassedSelected((prev) => !prev);
  };

  return (
    <main className="eventsPage">
      <h1 className="eventsTitle desktopOnly">Evènements</h1>
      {openModal && (
        <ModalEvent imgEvent={imageEvent} onOpenModal={setOpenModal} />
      )}
      
      <section className="listChoices">
        
        <button className={`btnEvent ${isPassedSelected && "nonActiveBtn"}`} onClick={() => handleArrayEvent()}>
          Evènements à venir
        </button>
        <button className={`btnEvent ${!isPassedSelected && "nonActiveBtn"}`} onClick={() => handleArrayEvent()}>
          Evènements passé
        </button>
      </section>
      <section className="eventsContainer">
        {isPassedSelected ? (
          <DisplayEvents
            events={passedEvent}
            onSetImgEvent={setImageEvent}
            onSetOpenModal={setOpenModal}
          />
        ) : (
          <DisplayEvents
            events={actualEvent}
            onSetImgEvent={setImageEvent}
            onSetOpenModal={setOpenModal}
          />
        )}
      </section>
    </main>
  );
};

export default Events;

const DisplayEvents = ({
  events,
  onSetImgEvent,
  onSetOpenModal,
}: {
  events: Evenement[];
  onSetImgEvent: React.Dispatch<React.SetStateAction<string>>;
  onSetOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {events.map((event) => {
        const displayDateBeginnig = new Date(
          event.date_de_l_evenement
        ).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
        });

        const displayDateEnd = new Date(event.date_de_fin).toLocaleDateString(
          "fr-FR",
          {
            day: "numeric",
            month: "long",
          }
        );
        const handleClickImg = () => {
          onSetImgEvent(event.banniere.guid);
          onSetOpenModal(true);
        };

        return (
          <div key={event.id} className="cardEvent">
            <button className="btnImg" onClick={handleClickImg}>
              <img src={event.banniere.guid} alt="" className="banniere" />
            </button>
            <p className="titleEvent">{event.nom_de_levenement}</p>
            <div className="infoEvent">
              <p>
                {event.date_de_fin
                  ? displayDateBeginnig + " au " + displayDateEnd
                  : displayDateBeginnig}
              </p>
              <p>
                {event.heure_de_fin
                  ? event.heure_de_debut.slice(0, 5) +
                    " - " +
                    event.heure_de_fin.slice(0, 5)
                  : event.heure_de_debut.slice(0, 5)}
              </p>
            </div>
            <p className="descriptionEvent">{event.description}</p>
          </div>
        );
      })}
    </>
  );
};
