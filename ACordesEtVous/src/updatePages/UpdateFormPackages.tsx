import { useEffect, useState } from "react";
import { Package } from "../Types/package";
import { fetchCurrentUser } from "../Services/autServices";
import { fetchPackageById } from "../Services/getServices";
import FormPackages from "../Container/Forms/FormPackages";


const UpdateFormPackages = ( {podId } : {podId : number | undefined}) => {

    const [auth, setAuth] = useState("");
    const [forfait, setForfait] = useState<Package>();

useEffect(() => {
    const fetchData = async () => {
      let ignore = false;
      if (podId) {
        

        const result = await fetchPackageById(podId);
        const resultAuth = await fetchCurrentUser()
        if (!ignore) {
          setForfait(result);
          setAuth(resultAuth?.name ?? "")
        }
      }

      return () => {
        ignore = true;
      };
    };
    fetchData();
  }, []);

  if (auth === "admin" && forfait) {
    return (
      <FormPackages forfait={forfait} onHandleSubmit={() => {}}/>
  )
    
  }


    
}

export default UpdateFormPackages