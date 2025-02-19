import { useEffect, useState } from "react";
import { fetchMaterialsList } from "../../Services/getServices";
import { Material } from "../../Types/materials";
import "./materialsLocation.css";
import { Link } from "react-router-dom";
import { fetchCurrentUser } from "../../Services/autServices";

const MaterialsLocation = ({
	onSetCurrentPage,

	onSetPodId,
}: {
	onSetCurrentPage: React.Dispatch<React.SetStateAction<string>>;

	onSetPodId: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
	const [materials, setMaterials] = useState<Material[]>([]);
	const [auth, setAuth] = useState("");

	useEffect(() => {
		onSetCurrentPage("Materiel");
		const fetchData = async () => {
			let ignore = false;

			const result = await fetchMaterialsList();
			const resultAuth = await fetchCurrentUser();

			if (!ignore) {
				setMaterials(result);
				setAuth(resultAuth?.name ?? "");
			}

			return () => {
				ignore = true;
			};
		};

		fetchData();
	}, []);

	const displayMaterials = materials.map((material) => {
		return (
			<div key={material.id} className="cardLocation">
				<img
					src={material.image_de_lobjet.guid}
					alt="photo du matériel"
					className="locationImg"
				/>
				<div className="updateMaterialContainer">
					<h2>{material.title.rendered}</h2>

					<Link to="/updateMaterials" onClick={() => onSetPodId(material.id)}>
						<img src="/pen.svg" alt="update icon" className="updateIcon" />
					</Link>
				</div>
				<p className="materialDescription">{material.description}</p>
				<div className="priceContainer">
					<p>{material.prix}€</p>
					<p>{material.prix_description}</p>
				</div>
			</div>
		);
	});

	return (
		<main>
			<h1 className="locationTitle desktopOnly">Location de matériel</h1>
			<section className="cardsContainer">{displayMaterials}</section>
		</main>
	);
};

export default MaterialsLocation;
