import { useEffect, useState } from "react";
import { fetchDisplayById } from "../../Services/getServices";
import { Amenagement,  AmenagementPut } from "../../Types/amenagements";
import "./updateForm.css";
import { updateDisplay } from "../../Services/updateServices";
import { uploadMedia } from "../../Services/servicesAPI/uploadMedias";
import { Photo } from "../../Types/pods";

const UpdateFormAmenagement = ({auth,
	podId,}: 
{
	auth: string;
	podId: number | undefined;
}) => {
	const [display, setDisplay] = useState<Amenagement>();
	/* const podId = 51;
	const auth = "admin"; */

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

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.files)
		const file = e.target.files?.[0]; 
	  
		if (file) {
		  uploadMedia(file); 
		} else {
		  console.log("No file selected");
		}
	  };

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
		e.preventDefault();
		
		const uploadedImages =await uploadMedia(e.currentTarget.files);
		
		
		const formData = new FormData(e.currentTarget);
		
		
		const data: AmenagementPut = {
			id,
		  title: formData.get("wpTitle")?.toString() ?? "",
		  nom_de_lambiance: formData.get("podTitle")?.toString() ?? "", 
		  content:"",
		  
	  
		  photos: uploadedImages.map((image :Photo) => ({
			ID: image.ID,
			post_author: image.post_author,
			post_date: image.post_date,
			post_date_gmt: image.post_date_gmt,
			post_content: image.post_content,
			post_title: image.post_title,
			post_excerpt: image.post_excerpt,
			post_status: image.post_status,
			comment_status: image.comment_status,
			ping_status: image.ping_status,
			post_password: image.post_password,
			post_name: image.post_name,
			to_ping: image.to_ping,
			pinged: image.pinged,
			post_modified: image.post_modified,
			post_modified_gmt: image.post_modified_gmt,
			post_content_filtered: image.post_content_filtered,
			post_parent: image.post_parent,
			guid: image.guid,
			menu_order: image.menu_order,
			post_type: image.post_type,
			post_mime_type: image.post_mime_type,
			comment_count: image.comment_count,
			pod_item_id: image.pod_item_id,
		  })),}
	  
		
		updateDisplay(id, data);
	  };
	  

	if (auth === "admin" && display) {
		return (
			<form className="formUpdate" onSubmit={(e) => handleSubmit(e, display.id)}>
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
					<input type="file" id="photos" onChange={handleFileChange}/>
				</div>
				<button type="submit" className="formSubmit" >
					valider
				</button>
			</form>
		);
	}

	return <div>oups</div>;
};

export default UpdateFormAmenagement
