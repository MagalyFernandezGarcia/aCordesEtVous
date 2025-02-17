import { useEffect, useState } from "react";
import { TarifPut, Tarifs } from "../../Types/tarifs";
import { fetchTarifById } from "../../Services/getServices";
import { updateTarif } from "../../Services/updateServices";
import { fetchCurrentUser } from "../../Services/autServices";

const UpdateFormTarifs = ({
  
  podId,
}: {
  
  podId: number | undefined;
}) => {
  const [tarif, setTarif] = useState<Tarifs>();
  const [auth, setAuth] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let ignore = false;
      if (podId) {
        

        const result = await fetchTarifById(podId);
        const resultAuth = await fetchCurrentUser()
        if (!ignore) {
          setTarif(result);
          setAuth(resultAuth?.name ?? "")
        }
      }

      return () => {
        ignore = true;
      };
    };
    fetchData();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    console.log('passed on form"');
    

    const formData = new FormData(e.currentTarget);
    console.log("formData Entries:");
for (const [key, value] of formData.entries()) {
  console.log(key, value);
}

    
    

    const data: TarifPut = {
      id,
      title: {
        rendered: formData.get("wpTitle")?.toString() ?? ""},
      
      tarif_duree : formData.get("podTitle")?.toString(),
      prix :formData.get("price")?.toString(),

    };
    console.log("dataForm", data);
    

    updateTarif(id,data)
  };

  if (auth === "admin" && tarif) {
    return (
      <form className="formUpdate" onSubmit={(e) => handleSubmit(e, tarif.id)}>
        <h1 className="formTitle">Modifier l'ambiance </h1>
        <div>
          <label htmlFor="wpTitle">Titre pour WordPress</label>
          <input type="text" id="wpTitle" name="wpTitle" defaultValue={tarif.title.rendered} />
        </div>
        <div>
          <label htmlFor="podTitle">Durée</label>
          <input type="text" id="podTitle" name="podTitle" defaultValue={tarif.tarif_duree} />
        </div>
        <div>
          <label htmlFor="price">Prix</label>
          <input type="number" id="price" name="price" defaultValue={tarif.prix} />
        </div>

        <button type="submit" className="formSubmit">
          valider
        </button>
      </form>
    );
  }

  return <div>oups</div>;
};

export default UpdateFormTarifs;
