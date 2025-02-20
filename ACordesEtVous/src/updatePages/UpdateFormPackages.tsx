import { useEffect, useState } from "react";
import { Package, PackagePost, PackagePut } from "../Types/package";
import { fetchCurrentUser } from "../Services/autServices";
import { fetchPackageById } from "../Services/getServices";
import FormPackages from "../Container/Forms/FormPackages";
import { updatePackage } from "../Services/updateServices";
import { useNavigate } from "react-router-dom";
import { createPackage } from "../Services/postServices";

const UpdateFormPackages = ({ podId }: { podId: number | undefined }) => {
	const [auth, setAuth] = useState("");
	const [forfait, setForfait] = useState<Package>();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			let ignore = false;
			const resultAuth = await fetchCurrentUser();
			if (!ignore) {
				
				setAuth(resultAuth?.name ?? "");
			}
			
			if (podId) {
				const result = await fetchPackageById(podId);
				if (!ignore) {
					setForfait(result);
					
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

	const handleSubmitPost = async(e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault();
	
		const formData = new FormData(e.currentTarget);
		const data: PackagePost = {
			title:  formData.get("nameWP")?.toString() ?? "",
			
			composition: formData.get("composition")?.toString(),
			duree: formData.get("duration")?.toString(),
			prix: formData.get("price")?.toString(),
			status: "publish"
		};
		createPackage(data);
		navigate("/nosidees");
	}


	if (auth === "admin" && forfait) {
		return <FormPackages forfait={forfait} onHandleSubmit={handleSubmitPut} />;
	}
	if(auth === "admin" && !forfait){
		return <FormPackages  onHandleSubmit={handleSubmitPost} />
	}
};

export default UpdateFormPackages;
