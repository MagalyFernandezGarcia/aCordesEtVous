import { useEffect, useState } from "react";
import FormSchedule from "../Container/Forms/FormSchedule";
import { Horaire, HorairePost, HorairePut } from "../Types/horaires";
import { fetchScheduleById } from "../Services/getServices";
import { fetchCurrentUser } from "../Services/autServices";
import { updateSchedule } from "../Services/updateServices";
import { uploadMedia } from "../Services/servicesAPI/uploadMedias";
import { useNavigate } from "react-router-dom";
import { createSchedule } from "../Services/postServices";
import { Photo } from "../Types/pods";
import { deletePhoto } from "../Services/deleteService";

const UpdateFormSchedule = ({ podId }: { podId: number | undefined }) => {
	const [auth, setAuth] = useState("");
	const [schedule, setSchedule] = useState<Horaire>();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			let ignore = false;
			const resultAuth = await fetchCurrentUser();
			if (!ignore) {
				
				setAuth(resultAuth?.name ?? "");
			}
			if (podId) {
				const result = await fetchScheduleById(podId);
				if (!ignore) {
					setSchedule(result);
					
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
	
		
		const uploadedFiles = formData.get("scheduleImg") as File | null;
		const uploadedImages = [];
		if ( uploadedFiles && uploadedFiles.size > 0 && podId && schedule) {
			const uploadedImage = await uploadMedia(
				uploadedFiles,
				podId,
				schedule.title.rendered
			);
			uploadedImages.push(uploadedImage);
		}
		if (id) {
			const data: HorairePut = {
				id,
				title: {
					rendered: formData.get("nameWP")?.toString() ?? "",
				},

				jours: formData.get("days")?.toString(),
				heure: formData.get("hours")?.toString(),
				precision: formData.get("precision")?.toString(),
				
			};
			if (uploadedImages.length > 0) {
				data.image_de_lhoraire = uploadedImages[0].ID.toString();
			}

			await updateSchedule(id, data);
		}
		navigate("/guinguette");
	};

	const handleSubmitPost = async(e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const podData : HorairePost = {
			title: formData.get("nameWP")?.toString() ?? "",
			jours: formData.get("days")?.toString() ?? "",
			heure: formData.get("hours")?.toString() ?? "",
			precision: formData.get("precision")?.toString(),
			status: "publish"
		};
		const pod = await createSchedule(podData);
		
		
		 const uploadedFile = formData.get("scheduleImg") as File;
		
			if (uploadedFile.size> 0) {
			  const uploadedImages = await uploadMedia(uploadedFile, pod.id, pod.title.rendered)
				
			
		
			  const updatedPodData = {
				...pod,
				image_de_lhoraire: uploadedImages.ID,
			  };
		
			  await updateSchedule( pod.id, updatedPodData);
			}
		
		navigate("/guinguette");
		
	}

 const removePhoto = (photoId: string) => {
	if (schedule) {
	  const updatedPhotos: Photo = schedule.image_de_lhoraire
	  ;
	  setSchedule({ ...schedule, image_de_lhoraire: updatedPhotos });
	}
	deletePhoto(parseInt(photoId));
  };


	if (auth ==="admin" && schedule) {
		return (
			<FormSchedule
				schedule={schedule}
				onHandleSubmit={handleSubmitPut}
				podId={podId}
				onRemovePhoto={removePhoto}
			/>
		);
	}
	if (auth ==="admin" && !schedule) {
		return (
			<FormSchedule
				
				onHandleSubmit={handleSubmitPost}
				
			/>
		);
	}
	
};

export default UpdateFormSchedule;
