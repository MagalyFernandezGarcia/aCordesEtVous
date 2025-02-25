import { useEffect, useState } from "react";
import { Tarifs } from "../../Types/tarifs";
import { fetchPackageList, fetchTarifsList } from "../../Services/getServices";
import { Package } from "../../Types/package";
import "./tarifsPage.css";
import { Link } from "react-router-dom";
import { fetchCurrentUser } from "../../Services/autServices";
import { deletePackage, deleteTarif } from "../../Services/deleteService";
import DeleteModal from "../../Container/DeleteModal/DeleteModal";

const TarifsPage = ({
  onSetCurrentPage,
  onSetPodId,
}: {
  onSetCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  onSetPodId: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  const [tarifsArray, setTarifsArray] = useState<Tarifs[]>([]);
  const [packageArray, setPackageArray] = useState<Package[]>([]);
  const [auth, setAuth] = useState("");
  const [modalDelete, setModalDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(0);

  useEffect(() => {
    onSetCurrentPage("Tarifs");
    const fetchData = async () => {
      let ignore = false;

      const resultTarifs = await fetchTarifsList();
      const resultPackage = await fetchPackageList();
      const resultAuth = await fetchCurrentUser();
      if (!ignore) {
        setTarifsArray(resultTarifs);
        setPackageArray(resultPackage);
        setAuth(resultAuth?.name ?? "");
      }

      return () => {
        ignore = true;
      };
    };

    fetchData();
  }, [modalDelete]);

  const { forfaits, tarifsGuinguette } = packageArray.reduce<{
    forfaits: Package[];
    tarifsGuinguette: Package[];
  }>(
    (acc, packages) => {
      if (packages.composition.includes("bar")) {
        acc.forfaits.push(packages);
      } else {
        acc.tarifsGuinguette.push(packages);
      }
      return acc;
    },
    { forfaits: [], tarifsGuinguette: [] }
  );

  const forfaitsDisplay = forfaits.map((tarif) => {
    return (
      <div key={tarif.id} className="tarifsContainer">
        {modalDelete && itemToDelete === tarif.id && (
          <DeleteModal
            onModalDelete={setModalDelete}
            onDelete={() => deletePackage(tarif.id)}
          />
        )}
        <div className="updateTarifCOntainer">
          {auth === "admin" && (
            <div className="btnContainer">
              <button className="linkBtn">
                <Link to="/updatePackages" onClick={() => onSetPodId(tarif.id)}>
                  <img
                    src="/pen.svg"
                    alt="update icon"
                    className="updateIconTarif"
                  />
                </Link>
              </button>

              <button
                className="deleteBtn"
                onClick={() => {
                  setModalDelete(true);
                  setItemToDelete(tarif.id);
                }}
              >
                <img
                  src="/trash.svg"
                  alt="delete icon"
                  className="deleteIconTarif"
                />
              </button>
            </div>
          )}

          <p>{tarif.duree}</p>
        </div>

        <p>{tarif.prix} €</p>
      </div>
    );
  });
  const guinguette = tarifsGuinguette.map((tarif) => {
    return (
      <div key={tarif.id} className="tarifsContainer">
        {modalDelete && itemToDelete === tarif.id && (
          <DeleteModal
            onModalDelete={setModalDelete}
            onDelete={() => deleteTarif(tarif.id)}
          />
        )}
        <div className="updateTarifCOntainer">
          {auth === "admin" && (
            <div className="btnContainer">
              <button className="linkBtn">
                <Link to="/updateTarifs" onClick={() => onSetPodId(tarif.id)}>
                  <img
                    src="/pen.svg"
                    alt="update icon"
                    className="updateIconTarif"
                  />
                </Link>
              </button>

              <button
                className="deleteBtn"
                onClick={() => {
                  setModalDelete(true);
                  setItemToDelete(tarif.id);
                }}
              >
                <img
                  src="/trash.svg"
                  alt="delete icon"
                  className="deleteIconTarif"
                />
              </button>
            </div>
          )}

          <p>{tarif.composition}</p>
        </div>
        <p>{tarif.prix} €</p>
      </div>
    );
  });

  const salle = tarifsArray.map((tarif) => {
    return (
      <div key={tarif.id} className="tarifsContainer">
        {modalDelete && itemToDelete === tarif.id && (
          <DeleteModal
            onModalDelete={setModalDelete}
            onDelete={() => deleteTarif(tarif.id)}
          />
        )}
        <div className="updateTarifCOntainer">
          {auth === "admin" && (
            <div className="btnContainer">
              <button className="linkBtn">
                <Link to="/updateTarifs" onClick={() => onSetPodId(tarif.id)}>
                  <img
                    src="/pen.svg"
                    alt="update icon"
                    className="updateIconTarif"
                  />
                </Link>
              </button>

              <button
                className="deleteBtn"
                onClick={() => {
                  setModalDelete(true);
                  setItemToDelete(tarif.id);
                }}
              >
                <img
                  src="/trash.svg"
                  alt="delete icon"
                  className="deleteIconTarif"
                />
              </button>
            </div>
          )}

          <p>{tarif.title.rendered}</p>
        </div>
        <p>{tarif.prix} €</p>
      </div>
    );
  });

  return (
    <main className="tarifPage">
      <section>
        <h2 className="tarifPageTitle">Salle</h2>
        {salle}
      </section>
      <section>
        <h2 className="tarifPageTitle">Guinguette</h2>
        {guinguette}
      </section>
      <section>
        <h2 className="tarifPageTitle">Forfaits</h2>
        {forfaitsDisplay}
      </section>
    </main>
  );
};

export default TarifsPage;
