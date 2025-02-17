import { useEffect, useState } from "react";
import FormSchedule from "../Container/Forms/FormSchedule";
import { Horaire, HorairePut } from "../Types/horaires";
import { fetchScheduleById } from "../Services/getServices";
import { fetchCurrentUser } from "../Services/autServices";
import { updateSchedule } from "../Services/updateServices";
import { uploadMedia } from "../Services/servicesAPI/uploadMedias";


const UpdateFormSchedule = ({podId} : {podId : number | undefined}) => {
    const [auth, setAuth]= useState("")
    const [schedule, setSchedule]= useState<Horaire>()

    useEffect(() => {
        const fetchData = async () => {
          let ignore = false;
          if (podId) {
            
    
            const result = await fetchScheduleById(podId);
            const resultAuth = await fetchCurrentUser()
            if (!ignore) {
              setSchedule(result);
              setAuth(resultAuth?.name ?? "")
            }
          }
    
          return () => {
            ignore = true;
          };
        };
        fetchData();
      }, []);

    const handleSubmit =async ( e: React.FormEvent<HTMLFormElement>,
      id?: number)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const uploadedFiles = formData.get("scheduleImg") as File | null
        const uploadedImages = [];
              if (uploadedFiles && podId && schedule) {
                const uploadedImage = await uploadMedia(uploadedFiles, podId, schedule.title.rendered);
                uploadedImages.push(uploadedImage);
              }
        if(id){
              const data: HorairePut = {
                id,
                title: {
                  rendered: formData.get("nameWP")?.toString() ?? ""},
                
                jours: formData.get("days")?.toString(),
                heure: formData.get("hours")?.toString(),
                precision :formData.get("precision")?.toString(),
                image_de_lhoraire : uploadedImages[0].ID.toString()
          
              };
              
          
              updateSchedule(id,data)
            }
    
      }
      if (auth && schedule) {
        return (<FormSchedule schedule={schedule} onHandleSubmit={handleSubmit} podId={podId}/>);
        
      }

    
};

export default UpdateFormSchedule;