import { useEffect, useState } from "react";

import { Amenagement } from "../../Types/amenagements";
import "./displaysPage.css";
import { Tarifs } from "../../Types/tarifs";

import { Package } from "../../Types/package";

import DisplayPageModal from "./modal/DisplayPageModal";
import {
  fetchDisplayList,
  fetchPackageList,
  fetchTarifsList,
} from "../../Services/getServices";
import { Link } from "react-router-dom";
import { fetchCurrentUser } from "../../Services/autServices";

const DisplaysPage = ({
  onSetCurrentPage,

  onsetPodId,
}: {
  onSetCurrentPage: React.Dispatch<React.SetStateAction<string>>;

  onsetPodId: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  const [displays, setDisplays] = useState<Amenagement[]>([]);
  const [tarifs, setTarifs] = useState<Tarifs[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [galleryId, setGalleryId] = useState(0);
  const [auth, setAuth] = useState("");

  useEffect(() => {
    onSetCurrentPage("Quelques idées");
    const fetchData = async () => {
      let ignore = false;

      const resultDispalys = await fetchDisplayList();
      const resultTarifs = await fetchTarifsList();
      const resultPackages = await fetchPackageList();
      const resultAuth = await fetchCurrentUser();
      if (!ignore) {
        setDisplays(resultDispalys);

        setTarifs(resultTarifs);
        setPackages(resultPackages);
        setAuth(resultAuth?.name ?? "");
      }

      return () => {
        ignore = true;
      };
    };

    fetchData();
  }, []);

  const sortedPackage = packages.filter((packages) =>
    packages.composition.includes("bar")
  );

  const amenagements = displays.map((display) => {
    if (display)
      return (
        <div key={display.id} className="galleryContainer">
          <div className="displayTitle">
            <h2>{display.nom_de_lambiance}</h2>

            {auth === "admin" && (
            <button className="linkBtn">
              <Link to="/updateDisplay" onClick={() => onsetPodId(display.id)}>
                <img src="/pen.svg" alt="update icon" className="updateIcon" />
              </Link>
            </button>)}
          </div>
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
        <div className="titlePen">
          {auth === "admin" && (
            <button className="linkBtn">
              <Link to="/updateTarifs" onClick={() => onsetPodId(tarif.id)}>
                <img src="/pen.svg" alt="update icon" className="updateIcon" />
              </Link>
            </button>
          )}
          <p>{tarif.tarif_duree}</p>
        </div>
        <p className="price">{tarif.prix} €</p>
      </div>
    );
  });

  const packagesList = sortedPackage.map((forfait) => {
    return (
      <div key={forfait.id} className="tarifContainer">
        <div className="titlePen">
          {auth === "admin" && (
            <button className="linkBtn">
              <Link to="/updatePackages" onClick={() => onsetPodId(forfait.id)}>
                <img src="/pen.svg" alt="update icon" className="updateIcon" />
              </Link>
            </button>
          )}
          <p>
            {forfait.composition} ({forfait.duree})
          </p>
        </div>
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
      <h1 className="titleDisplays desktopOnly">
        {" "}
        Salle{" "}
        <button className="linkBtn">
          <Link to="/updateDisplay" onClick={() => onsetPodId(undefined)}>
            <img src="/plus.svg" alt="plus icon" className="addIcon" />
          </Link>
        </button>
      </h1>
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
                  <div>
                    {auth === "admin" && (
                      <button className="linkBtn">
                        <Link
                          to="/updateDisplay"
                          onClick={() => onsetPodId(display.id)}
                        >
                          <img
                            src="/pen.svg"
                            alt="update icon"
                            className="updateIcon"
                          />
                        </Link>
                      </button>
                    )}

                    <p className="displayName">{display.nom_de_lambiance}</p>
                  </div>
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
          <h2 className="titleTarifs ">
            Tarifs{" "}
            <button className="linkBtn">
              <Link to="/updateTarifs" onClick={() => onsetPodId(undefined)}>
                <img src="/plus.svg" alt="update icon" className="addIcon" />
              </Link>
            </button>
          </h2>
          <div className="containerTarifs">{tarifsList}</div>
          <h2 className="titleTarifs">Forfaits</h2>
          <div className="containerTarifs">{packagesList}</div>
        </section>
      </section>
      <section className="more">
        <p>Vous n'avez pas trouvé une disposition selon votre idée ?</p>
        <p>
          Contactez-nous pour en discuter et modeler la salle selon vos envies
        </p>
        <p className="contactDisplay">acordes.vous@gmail.com</p>
        <p className="contactDisplay">0477/19.82.45</p>
      </section>
    </main>
  );
};

export default DisplaysPage;
