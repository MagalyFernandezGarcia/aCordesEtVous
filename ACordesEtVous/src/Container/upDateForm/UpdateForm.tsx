import { useEffect, useState } from "react";
import { fetchDisplayById } from "../../Services/getServices";
import { Amenagement, AmenagementPost } from "../../Types/amenagements";
import "./updateForm.css";
import { updateDisplay } from "../../Services/updateServices";

const UpdateForm = ({}: // auth,
// podId,
{
	// auth: string;
	// podId: number | undefined;
}) => {
	const [display, setDisplay] = useState<Amenagement>();
	const podId = 51;
	const auth = "admin";

	useEffect(() => {
		const fetchData = async () => {
			let ignore = false;
			if (podId) {
				console.log(podId);

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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
		//faire une fonction async et l'await. La fonction devra envoyer les images chargées par l'input file dans le dossier media de wordpress
		//"https://a-cordes-et-vous.local/wp-json/wp/v2/media"
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data: AmenagementPost = {
			//vérifier dans la doc WP comment se passe le typag avec les pods et changer le nom des value pour correspondre au type
			title: formData.get("wpTitle")?.toString() ?? "",
			nom_de_lambiance: formData.get("podTitle")?.toString() ?? "",
			content: "",

			// photos: formData.get("photos")?.toString() ,
		};

		updateDisplay(id, data);
	};

	if (auth === "admin" && display) {
		return (
			<form className="formUpdate">
				<h1 className="formTitle">Modifier l'ambiance </h1>
				<div>
					<label htmlFor="wpTitle">Titre pour WordPress</label>
					<input
						type="text"
						id="wpTitle"
						defaultValue={display.title.rendered}
					/>
				</div>
				<div>
					<label htmlFor="podTitle">Nom de l'ambiance</label>
					<input
						type="text"
						id="podTitle"
						defaultValue={display.nom_de_lambiance}
					/>
				</div>
				{/* Ajouter la possibilité de supprimer une photo par la suite */}
				<div>
					{display.photos.map((photo) => {
						return (
							<img
								key={photo.ID}
								src={photo.guid}
								alt="aménagement"
								className="photo"
							/>
						);
					})}
				</div>
				<div>
					<label htmlFor="photos">Ajouter une photo</label>
					<input type="file" id="photos" />
				</div>
				<button type="submit" className="formSubmit">
					valider
				</button>
			</form>
		);
	}

	return <div>oups</div>;
};

export default UpdateForm;
