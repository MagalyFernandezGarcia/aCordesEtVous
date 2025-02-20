import { Amenagement } from "../../Types/amenagements";

const FormDisplay = ({
  display,
  onHandleSubmit,
  onRemovePhoto,
  onHandleFileChange,
}: {
  display?: Amenagement;
  onHandleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    id: number | undefined
  ) => void;
  onRemovePhoto?: (id: string) => void;
  onHandleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {

	
  return (
    <form className="form" onSubmit={(e) => onHandleSubmit(e, display?.id)}>
       <h1 className="formTitle">{display? "Modifier l'ambiance" : "Ajouter une ambiance"}</h1> 
      <div>
        <label htmlFor="wpTitle">Titre pour WordPress : </label>
        <input
          type="text"
          id="wpTitle"
          name="wpTitle"
          defaultValue={display?.title.rendered}
        />
      </div>
      <div>
        <label htmlFor="podTitle">Nom de l'ambiance : </label>
        <input
          type="text"
          id="podTitle"
          name="podTitle"
          defaultValue={display?.nom_de_lambiance}
        />
      </div>

      {display?.photos.map((photo) => {
        return (
          <div>
            <img
              key={photo.ID}
              src={photo.guid}
              alt="aménagement"
              className="photo"
            />
            <span
              className="deletePhoto"
			  { ...(onRemovePhoto && { onClick: () => onRemovePhoto(photo.ID) }) }
              
            >
              &times;
            </span>
          </div>
        );
      })}

      <div>
        <label htmlFor="photos">Ajouter une photo : </label>
        <input
          type="file"
          id="photos"
          name="photos"
          {...(display ? {} : { multiple: true })}
          onChange={onHandleFileChange}
        />
      </div>
      <button type="submit" className="formSubmit">
        valider
      </button>
    </form>
  );
};

export default FormDisplay;
