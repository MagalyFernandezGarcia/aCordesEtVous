import { useEffect, useState } from "react";
import { Tarifs } from "../../Types/tarifs";
import { fetchPackageList, fetchTarifsList } from "../../Services/getServices";
import { Package } from "../../Types/package";
import "./tarifsPage.css"

const TarifsPage = ({
  onSetCurrentPage,
}: {
  onSetCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [tarifsArray, setTarifsArray] = useState<Tarifs[]>([]);
  const [packageArray, setPackageArray] = useState<Package[]>([]);

  useEffect(() => {
    onSetCurrentPage("Tarifs");
    const fetchData = async () => {
      let ignore = false;

      const resultTarifs = await fetchTarifsList();
      const resultPackage = await fetchPackageList();
      if (!ignore) {
        setTarifsArray(resultTarifs);
        setPackageArray(resultPackage);
      }

      return () => {
        ignore = true;
      };
    };

    fetchData();
  }, []);

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
        <div>
        <p>{tarif.composition}</p>
        <p>{tarif.duree}</p>
        </div>
        
        <p>{tarif.prix} €</p>
      </div>
    );
  });
  const guinguette = tarifsGuinguette.map((tarif) => {
    return (
      <div key={tarif.id} className="tarifsContainer">
        <p>{tarif.composition}</p>
        <p>{tarif.prix} €</p>
      </div>
    );
  });

  const salle = tarifsArray.map((tarif) => {
    return (
      <div key={tarif.id} className="tarifsContainer">
        <p>{tarif.title.rendered}</p>
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
