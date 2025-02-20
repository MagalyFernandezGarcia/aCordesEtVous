import { useEffect, useState } from "react";
import { fetchDisplayById } from "../../Services/getServices";
import {
  Amenagement,
  AmenagementPost,
  AmenagementPut,
} from "../../Types/amenagements";
import "./updateFormAmenagement.css";
import { updateDisplay } from "../../Services/updateServices";
import { uploadMedia } from "../../Services/servicesAPI/uploadMedias";
import { fetchCurrentUser } from "../../Services/autServices";
import { Photo } from "../../Types/pods";
import { deletePhoto } from "../../Services/deleteService";
import { useNavigate } from "react-router";
import FormDisplay from "../../Container/Forms/FormDisplay";
import { createDisplay } from "../../Services/postServices";


const UpdateFormAmenagement = ({ podId }: { podId: number | undefined }) => {
  const [display, setDisplay] = useState<Amenagement>();

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
        const result = await fetchDisplayById(podId);
        
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
      uploadMedia(file, podId, display.title.rendered);
    }
  };

  const handleSubmitUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number | undefined
  ) => {
    e.preventDefault();

    if (display) {
      const existingPhotos = display.photos;

      const formData = new FormData(e.currentTarget);

      const uploadedFiles = formData.get("photos") as File | null;

      const uploadedImages = [];
      if (uploadedFiles && uploadedFiles.size > 0 && podId) {
        const uploadedImage = await uploadMedia(
          uploadedFiles,
          podId,
          display.title.rendered
        );
        uploadedImages.push(uploadedImage);
      }
      const mergedPhotos =
        uploadedImages.length > 0
          ? [...existingPhotos, ...uploadedImages]
          : existingPhotos;

      if (id) {
        const data: AmenagementPut = {
          id,
          title: formData.get("wpTitle")?.toString() ?? "",
          nom_de_lambiance: formData.get("podTitle")?.toString() ?? "",
          content: "",

          photos: mergedPhotos.map((photo) => photo.ID),
        };

        await updateDisplay(id, data);
      }
    }
    navigate("/nosidees");
  };

  const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const podData: AmenagementPost = {
      title: formData.get("wpTitle")?.toString() ?? "",
      nom_de_lambiance: formData.get("podTitle")?.toString() ?? "",
      content: "",
      
      status: "publish",
    };

    const pod = await createDisplay(podData);
    

    const uploadedFiles = formData.getAll("photos") as File[];

    if (uploadedFiles.length > 0) {
      const uploadedImages = await Promise.all(
        uploadedFiles.map((file) =>
          uploadMedia(file, pod.id, pod.title.rendered)
        )
      );

      const updatedPodData = {
        ...pod,
        photos: uploadedImages.map((photo) => photo.ID),
      };

      await updateDisplay( pod.id, updatedPodData);
    }

    navigate("/nosidees");
  };

  const removePhoto = (photoId: string) => {
    if (display) {
      const updatedPhotos: Photo[] = display.photos.filter(
        (photo) => parseInt(photo.ID) !== parseInt(photoId)
      );
      setDisplay({ ...display, photos: updatedPhotos });
    }
    deletePhoto(parseInt(photoId));
  };
  if ( display === undefined) {
    {
      return (
        <FormDisplay
          onHandleFileChange={handleFileChange}
          onHandleSubmit={handleSubmitPost}
        />
      );
    }
  }

  if (auth === "admin" && display) {
    return (
      <FormDisplay
        onHandleFileChange={handleFileChange}
        onHandleSubmit={handleSubmitUpdate}
        display={display}
        onRemovePhoto={removePhoto}
      />
    );
  }

 
};

export default UpdateFormAmenagement;
