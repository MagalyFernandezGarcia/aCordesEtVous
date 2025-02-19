import { useEffect, useState } from "react";
import { TarifPut, Tarifs } from "../Types/tarifs";
import { fetchTarifById } from "../Services/getServices";
import { updateTarif } from "../Services/updateServices";
import { fetchCurrentUser } from "../Services/autServices";
import FormTarifs from "../Container/Forms/FormTarifs";
import { useNavigate } from "react-router-dom";

const UpdateFormTarifs = ({ podId }: { podId: number | undefined }) => {
	const [tarif, setTarif] = useState<Tarifs>();
	const [auth, setAuth] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			let ignore = false;
			if (podId) {
				const result = await fetchTarifById(podId);
				const resultAuth = await fetchCurrentUser();
				if (!ignore) {
					setTarif(result);
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

	if (auth === "admin" && tarif) {
		return <FormTarifs tarif={tarif} onHandleSubmit={handleSubmit} />;
	}

	return <div>oups</div>;
};

export default UpdateFormTarifs;
