import { useEffect, useState } from "react";
import { Material, MaterialPost, MaterialPut } from "../Types/materials";
import { fetchMaterialById } from "../Services/getServices";
import { fetchCurrentUser } from "../Services/autServices";
import FormMaterial from "../Container/Forms/FormMaterial";
import { uploadMedia } from "../Services/servicesAPI/uploadMedias";
import { updateMaterial } from "../Services/updateServices";
import { useNavigate } from "react-router-dom";
import { createMaterial } from "../Services/postServices";

const UpdateFormMaterials = ({ podId }: { podId: number | undefined }) => {
  const [material, setMaterial] = useState<Material>();

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
        const result = await fetchMaterialById(podId);
        if (!ignore) {
          
          setMaterial(result);
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
    if (uploadedFiles && podId && material) {
      const uploadedImage = await uploadMedia(
        uploadedFiles,
        podId,
        material.title.rendered
      );
      uploadedImages.push(uploadedImage);
    }
    if (id) {
      const data: MaterialPut = {
        id,
        title: {
          rendered: formData.get("nameWP")?.toString() ?? "",
        },

        objet: formData.get("object")?.toString(),
        description: formData.get("description")?.toString(),
        prix: formData.get("price")?.toString(),
        prix_description: formData.get("priceInfo")?.toString(),

        image_de_lobjet: uploadedImages[0].ID.toString(),
      };

      updateMaterial(id, data);
    }
    navigate("/materiel");
  };

  const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: MaterialPost = {
      title: formData.get("nameWP")?.toString() ?? "",
      objet: formData.get("object")?.toString() ?? "",
      description: formData.get("description")?.toString() ?? "",
      prix: formData.get("price")?.toString() ?? "",
      prix_description: formData.get("priceInfo")?.toString(),

      status: "publish",
    };
    const pod = await createMaterial(data);
    const uploadedFile = formData.get("img") as File;

    if (uploadedFile.size > 0) {
      const uploadedImages = await uploadMedia(
        uploadedFile,
        pod.id,
        pod.title.rendered
      );

      const updatedPodData = {
        ...pod,
        image_de_lobjet: uploadedImages.ID,
      };

      await updateMaterial(pod.id, updatedPodData);
    }
    navigate("/materiel");
  };

  if (auth === "admin" && material) {
    return (
      <FormMaterial material={material} onHandleSubmit={handleSubmitPut} />
    );
  }

  if (auth === "admin" && !material) {
    return <FormMaterial onHandleSubmit={handleSubmitPost} />;
  }
};

export default UpdateFormMaterials;
