import { Material } from "../../Types/materials";

const FormMaterial = ({
	material,
	onHandleSubmit,
}: {
	material?: Material;
	onHandleSubmit: (
		e: React.FormEvent<HTMLFormElement>,
		id: number | undefined
	) => void;
}) => {
	return (
		<form className="form" onSubmit={(e) => onHandleSubmit(e, material?.id)}>
			<h1 className="formTitle">
				{material ? "Modifier le materiel" : "Ajouter un materiel"}
			</h1>
			<div>
				<label htmlFor="nameWP"> Titre pour WordPress : </label>
				<input
					type="text"
					id="nameWP"
					name="nameWP"
					defaultValue={material?.title.rendered}
				/>
			</div>
			<div>
				<label htmlFor="object">Objet : </label>
				<input type="text" id="object" name="object" />
			</div>
			<div>
				<label htmlFor="description">Description : </label>
				<textarea name="description" id="description"></textarea>
			</div>
			<div>
				<label htmlFor="price">Prix : </label>
				<input type="number" name="price" id="price" />
			</div>
			<div>
				<label htmlFor="priceInfo">Information sur le prix : </label>
				<input type="text" name="priceInfo" id="priceInfo" />
			</div>
			<div>
				<label htmlFor="img">Image du produit : </label>
				<input type="file" name="img" id="img" />
			</div>
			<button type="submit" className="formSubmit">
				valider
			</button>
		</form>
	);
};

export default FormMaterial;
