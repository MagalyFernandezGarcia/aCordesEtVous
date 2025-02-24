import { useEffect, useState } from "react";
import FormEvent from "../Container/Forms/FormEvent";
import { Evenement, EvenementPost, EvenementPut } from "../Types/evenements";
import { fetchCurrentUser } from "../Services/autServices";
import { fetchEventById } from "../Services/getServices";
import { uploadMedia } from "../Services/servicesAPI/uploadMedias";
import { updateEvent } from "../Services/updateServices";
import { useNavigate } from "react-router-dom";
import { Photo } from "../Types/pods";
import { deletePhoto } from "../Services/deleteService";
import { createEvent } from "../Services/postServices";

const UpdateFormEvents = ({ podId }: { podId: number | undefined }) => {
  const [event, setEvent] = useState<Evenement>();

  const [auth, setAuth] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let ignore = false;
	  const resultAuth = await fetchCurrentUser();
	  if (!ignore) {
		setAuth(resultAuth?.name ?? "");
		
	  }
      if (podId) {
        const result = await fetchEventById(podId);
        if (!ignore) {
          
          setEvent(result);
        }
      }

      return () => {
        ignore = true;
      };
    };
    fetchData();
  }, []);

  const handleSubmitPut = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number | undefined
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const uploadedFiles = formData.get("img") as File | null;

    const uploadedImages = [];
    if (uploadedFiles && uploadedFiles.size > 0 && podId && event) {
      const uploadedImage = await uploadMedia(
        uploadedFiles,
        podId,
        event.title.rendered
      );
      uploadedImages.push(uploadedImage);
    }
    if (id) {
      const data: EvenementPut = {
        id,
        title: {
          rendered: formData.get("nameWP")?.toString() ?? "",
        },

        nom_de_levenement: formData.get("eventName")?.toString(),
        date_de_l_evenement: formData.get("beginDate")?.toString(),
        date_de_fin: formData.get("endDate")?.toString(),
        heure_de_debut: formData.get("beginHour")?.toString(),
        heure_de_fin: formData.get("endHour")?.toString(),
        description: formData.get("description")?.toString(),
      };
      if (uploadedImages.length > 0) {
        data.banniere = uploadedImages[0].ID.toString();
      }

      await updateEvent(id, data);
    }
    navigate("/evenements");
  };

  const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    

    const data: EvenementPost = {
      title: formData.get("nameWP")?.toString() ?? "",
	  nom_de_levenement :formData.get("eventName")?.toString() ??"",
      date_de_l_evenement: formData.get("beginDate")?.toString(),
      date_de_fin: formData.get("endDate")?.toString(),
      heure_de_debut: formData.get("beginHour")?.toString(),
      heure_de_fin: formData.get("endHour")?.toString(),
      description: formData.get("description")?.toString() ?? "",
	  status: "publish"
    };
    const pod = await createEvent(data);
	const uploadedFile = formData.get("img") as File ;
	
	
	if (uploadedFile.size> 0) {
				  const uploadedImages = await uploadMedia(uploadedFile, pod.id, pod.title.rendered)
					
				
			
				  const updatedPodData = {
					...pod,
					banniere: uploadedImages.ID,
				  };
			
				  await updateEvent( pod.id, updatedPodData);
				}
				navigate("/evenements")
  };
  const removePhoto = (photoId: string) => {
    if (event) {
      const updatedPhotos: Photo = event.banniere;
      setEvent({ ...event, banniere: updatedPhotos });
    }
    deletePhoto(parseInt(photoId));
  };

  if (auth === "admin" && event) {
    return (
      <FormEvent
        event={event}
        onHandleSubmit={handleSubmitPut}
        onRemovePhoto={removePhoto}
      />
    );
  }

  if (auth === "admin" && !event) {
    return <FormEvent onHandleSubmit={handleSubmitPost} />;
  }
};

export default UpdateFormEvents;
