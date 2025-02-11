import { useEffect, useState } from "react";
import { fetchMaterialsList } from "../../Services/getServices";
import { Material } from "../../Types/materials";
import "./materialsLocation.css";

const MaterialsLocation = ({
  onSetCurrentPage,
}: {
  onSetCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    onSetCurrentPage("Accueil");
    const fetchData = async () => {
      let ignore = false;

      const result = await fetchMaterialsList();

      if (!ignore) {
        setMaterials(result);
      }

      return () => {
        ignore = true;
      };
    };

    fetchData();
  }, []);

  const displayMaterials = materials.map((material) => {
    return (
      <div key={material.id} className="cardLocation">
        <img
          src={material.image_de_lobjet.guid}
          alt="photo du matériel"
          className="locationImg"
        />
        <h2>{material.title.rendered}</h2>
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
      <h1 className="locationTitle">Location de matériel</h1>
      <section className="cardsContainer">{displayMaterials}</section>
    </main>
  );
};

export default MaterialsLocation;
