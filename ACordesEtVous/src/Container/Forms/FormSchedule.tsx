import { uploadMedia } from "../../Services/servicesAPI/uploadMedias";
import { Horaire } from "../../Types/horaires";
import "./forms.css";

const FormSchedule = ({
  schedule,
  onHandleSubmit,
  podId,
  onRemovePhoto,
}: {
  schedule?: Horaire;
  onHandleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    id: number | undefined
  ) => void;
  podId?: number | undefined;
  onRemovePhoto?: (id: string) => void;
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && podId && schedule) {
      uploadMedia(file, podId, schedule.title.rendered);
    }
  };

  return (
    <form className="form" onSubmit={(e) => onHandleSubmit(e, schedule?.id)}>
      <h1 className="formTitle">
        {schedule ? "Modifier l'horaire" : "Ajouter un horaire"}
      </h1>
      <div>
        <label htmlFor="nameWP"> Titre pour WordPress : </label>
        <input
          type="text"
          id="nameWP"
          name="nameWP"
          {...schedule && { defaultValue: schedule.title.rendered }}
         
        />
      </div>
      <div>
        <label htmlFor="days">Jours : </label>
        <input type="text" id="days" name="days" {...schedule && { defaultValue: schedule.jours }} />
      </div>
      <div>
        <label htmlFor="hours">Heure : </label>
        <input type="time" id="hours" name="hours" {...schedule && { defaultValue: schedule.heure }} />
      </div>
      <div>
        <label htmlFor="precision">Précision : </label>
        <input type="text" name="precision" id="precision" {...schedule && { defaultValue: schedule.precision }} />
      </div>
      {schedule && <div><img src={schedule.image_de_lhoraire?.guid} className="photo" alt="horaire" /><span
              className="deletePhoto"
			  { ...(onRemovePhoto && { onClick: () => onRemovePhoto(schedule.image_de_lhoraire.ID) }) }
              
            >
              &times;
            </span></div>}
      <div>
        <label htmlFor="scheduleImg">Ajouter une image</label>
        <input
          type="file"
          id="scheduleImg"
          name="scheduleImg"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit" className="formSubmit" >
          valider
        </button>
    </form>
  );
};

export default FormSchedule;
