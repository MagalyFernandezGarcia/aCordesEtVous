import { useEffect, useState } from "react";
import { TarifPut, Tarifs, TarifsPost } from "../Types/tarifs";
import { fetchTarifById } from "../Services/getServices";
import { updateTarif } from "../Services/updateServices";
import { fetchCurrentUser } from "../Services/autServices";
import FormTarifs from "../Container/Forms/FormTarifs";
import { useNavigate } from "react-router-dom";
import { createTarif } from "../Services/postServices";

const UpdateFormTarifs = ({ podId }: { podId: number | undefined }) => {
	const [tarif, setTarif] = useState<Tarifs>();
	const [auth, setAuth] = useState("");
	const navigate = useNavigate();
	

	useEffect(() => {
		const fetchData = async () => {
			let ignore = false;
			const resultAuth = await fetchCurrentUser();
			
			if (podId) {
				const result = await fetchTarifById(podId);
				
				if (!ignore) {
					setTarif(result);
				}
			}
			if(!ignore){
				setAuth(resultAuth?.name ?? "");
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
			const data: TarifPut = {
				id,
				title: {
					rendered: formData.get("nameWP")?.toString() ?? "",
				},

				tarif_duree: formData.get("duration")?.toString(),
				prix: formData.get("price")?.toString(),
			};

			updateTarif(id, data);
		}
		navigate("/nosidees");
	};

	const handleSubmitPost = async(e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const data : TarifsPost ={
			title: formData.get("nameWP")?.toString() ?? "",
			tarif_duree: formData.get("duration")?.toString()  ?? "",
			prix: formData.get("price")?.toString()  ?? "",
			status: "publish"
		}

		createTarif(data);
		navigate("/nosidees");
	}
	if ( tarif === undefined && auth === "admin") {
		return <FormTarifs  onHandleSubmit={handleSubmitPost} />;
	}

	if ( tarif && auth === "admin" ) {
		return <FormTarifs tarif={tarif} onHandleSubmit={handleSubmitPut} />;
	}

	

	return <div>oups</div>;
};

export default UpdateFormTarifs;
