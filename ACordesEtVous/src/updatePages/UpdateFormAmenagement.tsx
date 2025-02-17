import { useEffect, useState } from "react";
import { fetchDisplayById } from "../Services/getServices";
import { Amenagement, AmenagementPut } from "../Types/amenagements";

import { updateDisplay } from "../Services/updateServices";
import { uploadMedia } from "../Services/servicesAPI/uploadMedias";
import { fetchCurrentUser } from "../Services/autServices";
import { Photo } from "../Types/pods";
import { deletePhoto } from "../Services/deleteService";


const UpdateFormAmenagement = ({
  
  podId,
}: {
 
  podId: number | undefined;
}) => {
  const [display, setDisplay] = useState<Amenagement>();
 

  const [auth, setAuth] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let ignore = false;
      if (podId) {
        

        const result = await fetchDisplayById(podId);
        const resultAuth = await fetchCurrentUser()
        setAuth(resultAuth?.name ?? "")
        if (!ignore) {
          setDisplay(result);
        }
      }

      return () => {
        ignore = true;
      };
    };
    fetchData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && podId && display) {
      uploadMedia(file, podId,display.title.rendered );
    } 
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    
    if (display) {
      const existingPhotos = display.photos;

      const formData = new FormData(e.currentTarget);

      const uploadedFiles = formData.get("photos") as File | null;

      let uploadedImages = [];
      if (uploadedFiles && uploadedFiles && podId) {
        const uploadedImage = await uploadMedia(uploadedFiles, podId, display.title.rendered);
        uploadedImages.push(uploadedImage);
      }
      const mergedPhotos = [...existingPhotos, ...uploadedImages];

      
	  

      const data: AmenagementPut = {
        id,
        title: formData.get("wpTitle")?.toString() ?? "",
        nom_de_lambiance: formData.get("podTitle")?.toString() ?? "",
        content: "",

        photos: mergedPhotos.map((photo) => photo.ID),
      };

      

      updateDisplay(id, data);
    }
  };

  const removePhoto = (photoId: string) => {
    if (display){
      const updatedPhotos : Photo[] = display.photos.filter((photo) => parseInt(photo.ID) !== parseInt(photoId))
      setDisplay({ ...display, photos: updatedPhotos } );
    
    }
      deletePhoto(parseInt(photoId))

     


  }

  if (auth === "admin" && display) {
    return (
      <form
        className="formUpdate"
        onSubmit={(e) => handleSubmit(e, display.id)}
      >
        <h1 className="formTitle">Modifier l'ambiance </h1>
        <div >
          <label htmlFor="wpTitle">Titre pour WordPress : </label>
          <input
            type="text"
            id="wpTitle"
            name="wpTitle"
            defaultValue={display.title.rendered}
          />
        </div>
        <div>
          <label htmlFor="podTitle">Nom de l'ambiance : </label>
          <input
            type="text"
            id="podTitle"
            name="podTitle"
            defaultValue={display.nom_de_lambiance}
          />
        </div>
        
        <div>
          {display.photos.map((photo) => {
            return (
              <div>
              <img
                key={photo.ID}
                src={photo.guid}
                alt="aménagement"
                className="photo"
              />
               <span className="deletePhoto" onClick={() => removePhoto(photo.ID)}>
        &times;
      </span>
              </div>
            );
          })}
        </div>
        <div>
          <label htmlFor="photos">Ajouter une photo : </label>
          <input
            type="file"
            id="photos"
            name="photos"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="formSubmit">
          valider
        </button>
      </form>
    );
  }

  return <div>oups</div>;
};

export default UpdateFormAmenagement;
