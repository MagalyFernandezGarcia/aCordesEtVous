import { useEffect, useState } from "react";
import { fetchDisplayList } from "../../Services/amenagementService";
import { Amenagement } from "../../Types/amenagements";
import "./displaysPage.css";
import { Tarifs } from "../../Types/tarifs";
import { fetchTarifsList } from "../../Services/tarifServices";
import { Package } from "../../Types/package";
import { fetchPackageList } from "../../Services/packageServices";
import DisplayPageModal from "./modal/DisplayPageModal";

const DisplaysPage = () => {
  const [displays, setDisplays] = useState<Amenagement[]>([]);
  const [tarifs, setTarifs] = useState<Tarifs[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [galleryId, setGalleryId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let ignore = false;

      const resultDispalys = await fetchDisplayList();
      const resultTarifs = await fetchTarifsList();
      const resultPackages = await fetchPackageList();
      if (!ignore) {
        setDisplays(resultDispalys);

        setTarifs(resultTarifs);
        setPackages(resultPackages);
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

  const tarifsList = tarifs.map((tarif) => {
    return (
      <div key={tarif.id} className="tarifContainer">
        <p>{tarif.title.rendered}</p>
        <p className="price">{tarif.prix} €</p>
      </div>
    );
  });

  const packagesList = packages.map((forfait) => {
    return (
      <div key={forfait.id} className="tarifContainer">
        <p>
          {forfait.composition} ({forfait.duree})
        </p>
        <p className="price">{forfait.prix} €</p>
      </div>
    );
  });

  const showGallery = (id: number) => {
    setGalleryId(id);
    setOpenModal(true);
  };

  return (
    <main className="displaysPage">
      <h1 className="titleDisplays desktopOnly"> Salle</h1>
      <p className="text mobileOnly">La salle qui s'adapte à vos envies</p>
      <section className="content">
        <section className="leftSide">
          <div className="desktopOnly">{amenagements}</div>
          <div className=" container mobileOnly">
            {displays.map((display, id) => {
              return (
                <div className="galleryContainer" key={display.id}>
                  <button className="photoBtn" onClick={() => showGallery(id)}>
                    <img
                      className="photo"
                      src={display.photos[0].guid}
                      alt="exemple de disposition"
                    />
                  </button>
                  <p className="displayName">{display.nom_de_lambiance}</p>
                </div>
              );
            })}
          </div>

          {openModal && (
            <DisplayPageModal
              gallery={displays[galleryId]}
              onOpenModal={setOpenModal}
            />
          )}
        </section>
        <section className="rightSide desktopOnly">
          <h2 className="titleTarifs ">Tarifs</h2>
          <div>{tarifsList}</div>
          <h2 className="titleTarifs">Forfaits</h2>
          <div>{packagesList}</div>
        </section>
      </section>
    </main>
  );
};

export default DisplaysPage;
