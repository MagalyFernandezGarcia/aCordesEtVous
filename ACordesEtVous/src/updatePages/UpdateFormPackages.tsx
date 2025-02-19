import { useEffect, useState } from "react";
import { Package, PackagePut } from "../Types/package";
import { fetchCurrentUser } from "../Services/autServices";
import { fetchPackageById } from "../Services/getServices";
import FormPackages from "../Container/Forms/FormPackages";
import { updatePackage } from "../Services/updateServices";
import { useNavigate } from "react-router-dom";

const UpdateFormPackages = ({ podId }: { podId: number | undefined }) => {
	const [auth, setAuth] = useState("");
	const [forfait, setForfait] = useState<Package>();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			let ignore = false;
			if (podId) {
				const result = await fetchPackageById(podId);
				const resultAuth = await fetchCurrentUser();
				if (!ignore) {
					setForfait(result);
					setAuth(resultAuth?.name ?? "");
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
		const formData = new FormData(e.currentTarget);
		if (id) {
			const data: PackagePut = {
				id,
				title: {
					rendered: formData.get("nameWP")?.toString() ?? "",
				},

				composition: formData.get("composition")?.toString(),
				duree: formData.get("duration")?.toString(),
				prix: formData.get("price")?.toString(),
			};

			updatePackage(id, data);
		}
		navigate("/nosidees");
	};
	if (auth === "admin" && forfait) {
		return <FormPackages forfait={forfait} onHandleSubmit={handleSubmit} />;
	}
};

export default UpdateFormPackages;
