import { useEffect, useState } from "react";
import { fetchMaterialsList } from "../../Services/getServices";
import { Material } from "../../Types/materials";
import "./materialsLocation.css";
import { Link } from "react-router-dom";
import { fetchCurrentUser } from "../../Services/autServices";
import DeleteModal from "../../Container/DeleteModal/DeleteModal";
import { deleteMaterial } from "../../Services/deleteService";

const MaterialsLocation = ({
  onSetCurrentPage,

  onSetPodId,
}: {
  onSetCurrentPage: React.Dispatch<React.SetStateAction<string>>;

  onSetPodId: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [auth, setAuth] = useState("");
  const [modalDelete, setModalDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(0);

  useEffect(() => {
    onSetCurrentPage("Materiel");
    const fetchData = async () => {
      let ignore = false;

      const result = await fetchMaterialsList();
      const resultAuth = await fetchCurrentUser();

      if (!ignore) {
        setMaterials(result);
        setAuth(resultAuth?.name ?? "");
      }

      return () => {
        ignore = true;
      };
    };

    fetchData();
  }, [modalDelete]);

  const displayMaterials = materials.map((material) => {
    return (
      <div key={material.id} className="cardLocation">
        {modalDelete && itemToDelete === material.id && (
          <DeleteModal
            onModalDelete={setModalDelete}
            onDelete={() => deleteMaterial(material.id)}
          />
        )}
        <img
          src={material.image_de_lobjet.guid}
          alt={material.title.rendered}
          className="locationImg"
        />
        <div className="updateMaterialContainer">
          <h2>{material.title.rendered}</h2>
		  {auth === "admin" &&  <div className="btnContainer">
            <button className="linkBtn">
              <Link
                to="/updateMaterial"
                onClick={() => onSetPodId(material.id)}
              >
                <img
                  src="/pen.svg"
                  alt="update icon"
                  className="updateIconMaterial"
                />
              </Link>
            </button>
            <button
              className="deleteBtn"
              onClick={() => {
                setModalDelete(true);
                setItemToDelete(material.id);
              }}
            >
              <img src="/trash.svg" alt="delete icon" className="deleteIcon" />
            </button>
          </div>}
         
        </div>
        <p className="materialDescription">{material.description}</p>
        <div className="priceContainer">
          <p>{material.prix}€</p>
          <p>{material.prix_description}</p>
        </div>
      </div>
    );
  });

  return (
    <main>
      <h1 className="locationTitle desktopOnly">
        Location de matériel{" "}
        {auth === "admin" && (
          <Link to="/updateMaterial" onClick={() => onSetPodId(undefined)}>
            <img src="/plus.svg" alt="update icon" className="addIcon" />
          </Link>
        )}
      </h1>
      <section className="cardsContainer">{displayMaterials}</section>
    </main>
  );
};

export default MaterialsLocation;
