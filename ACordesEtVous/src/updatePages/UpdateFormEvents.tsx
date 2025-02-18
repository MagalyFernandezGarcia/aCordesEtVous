import { useEffect, useState } from "react";
import FormEvent from "../Container/Forms/FormEvent"
import { Evenement } from "../Types/evenements";
import { fetchCurrentUser } from "../Services/autServices";
import { fetchEventById } from "../Services/getServices";


const UpdateFormEvents =({podId} :{podId : number | undefined})=>{

    const [event, setEvent] = useState<Evenement>();
     
    
      const [auth, setAuth] = useState("");
    
      useEffect(() => {
        const fetchData = async () => {
          let ignore = false;
          if (podId) {
            
    
            const result = await fetchEventById(podId);
            const resultAuth = await fetchCurrentUser()
            if (!ignore) {
                setAuth(resultAuth?.name ?? "")
              setEvent(result);
            }
          }
    
          return () => {
            ignore = true;
          };
        };
        fetchData();
      }, []);

      const handleSubmit =( e: React.FormEvent<HTMLFormElement>,
        id: number)=>{
            e.preventDefault();


      }

      if(auth === "admin" && event){
    return( <FormEvent event={event} onHandleSubmit={handleSubmit}/>)
}
}

export default UpdateFormEvents