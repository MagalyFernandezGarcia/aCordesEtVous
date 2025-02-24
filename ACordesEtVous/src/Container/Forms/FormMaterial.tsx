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
					{...material && { defaultValue: material.title.rendered }}
					
				/>
			</div>
			<div>
				<label htmlFor="object">Objet : </label>
				<input type="text" id="object" name="object" {...material && { defaultValue: material.objet}} />
				
			</div>
			<div>
				<label htmlFor="description">Description : </label>
				<textarea name="description" id="description" {...material && { defaultValue: material.description}}></textarea>
			</div>
			<div>
				<label htmlFor="price">Prix : </label>
				<input type="number" name="price" id="price" {...material && { defaultValue: material.prix}}/>
			</div>
			<div>
				<label htmlFor="priceInfo">Information sur le prix : </label>
				<input type="text" name="priceInfo" id="priceInfo"  {...material && { defaultValue: material.prix_description}}/>
			</div>
			{material && (
				<div>
					<img
						src={material.image_de_lobjet.guid}
						alt={material.title.rendered}
					/>
				</div>
			)}
			<div>
				<label htmlFor="img">Image du produit : </label>
				<input type="file" name="img" id="img"  />
			</div>
			<button type="submit" className="formSubmit">
				valider
			</button>
		</form>
	);
};

export default FormMaterial;
