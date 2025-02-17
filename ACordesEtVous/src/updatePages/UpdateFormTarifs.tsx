import { useEffect, useState } from "react";
import { TarifPut, Tarifs } from "../Types/tarifs";
import { fetchTarifById } from "../Services/getServices";
import { updateTarif } from "../Services/updateServices";
import { fetchCurrentUser } from "../Services/autServices";
import FormTarifs from "../Container/Forms/FormTarifs";

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
    id?: number
  ) => {
    e.preventDefault();
    console.log('passed on form"');
    

    const formData = new FormData(e.currentTarget);
    console.log("formData Entries:");
for (const [key, value] of formData.entries()) {
  console.log(key, value);
}

    
    if(id){
      const data: TarifPut = {
        id,
        title: {
          rendered: formData.get("wpTitle")?.toString() ?? ""},
        
        tarif_duree : formData.get("podTitle")?.toString(),
        prix :formData.get("price")?.toString(),
  
      };
      
  
      updateTarif(id,data)
    }

    
  };

  if (auth === "admin" && tarif) {
    return (
      <FormTarifs tarif={tarif} onHandleSubmit={handleSubmit} />
    );
  }

  return <div>oups</div>;
};

export default UpdateFormTarifs;
