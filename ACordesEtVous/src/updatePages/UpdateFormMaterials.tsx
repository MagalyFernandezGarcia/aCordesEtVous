import { useEffect, useState } from "react";
import { Material, MaterialPut } from "../Types/materials";
import { fetchMaterialById } from "../Services/getServices";
import { fetchCurrentUser } from "../Services/autServices";
import FormMaterial from "../Container/Forms/FormMaterial";
import { uploadMedia } from "../Services/servicesAPI/uploadMedias";
import { updateMaterial } from "../Services/updateServices";

const UpdateFormMaterials = ({ podId }: { podId: number | undefined }) => {
	const [material, setMaterial] = useState<Material>();

	const [auth, setAuth] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			let ignore = false;
			if (podId) {
				const result = await fetchMaterialById(podId);
				const resultAuth = await fetchCurrentUser();
				if (!ignore) {
					setAuth(resultAuth?.name ?? "");
					setMaterial(result);
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
	};

	if (auth === "admin" && material) {
		return <FormMaterial material={material} onHandleSubmit={handleSubmit} />;
	}
};

export default UpdateFormMaterials;
