import { useEffect, useState } from "react";
import { fetchDisplayList } from "../../Services/amenagementService";
import { Amenagement } from "../../Types/amenagements";
import "./displaysPage.css";

const DisplaysPage = () => {
  const [displays, setDisplays] = useState<Amenagement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let ignore = false;

      const result = await fetchDisplayList();
      if (!ignore) {
        setDisplays(result);
      }

      return () => {
        ignore = true;
      };
    };

    fetchData();
  }, []);

  const amenagements = displays.map((display) => {
    return (
      <div key={display.id} className="galleryContainer">
        <h2>{display.nom_de_lambiance}</h2>
        <div className="gallery">
          {display.photos.map((photo) => {
            return (
              <img
                key={photo.ID}
                src={photo.guid}
                alt="illustration du service"
                className="photo"
              />
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <main className="displaysPage">
      <h1 className="titleDisplays"> Salle</h1>
      <section className="content">
        <section className="leftSide">{amenagements}</section>
        <section className="rightSide"></section>
      </section>
    </main>
  );
};

export default DisplaysPage;
