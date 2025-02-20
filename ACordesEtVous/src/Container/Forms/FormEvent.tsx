import { Evenement } from "../../Types/evenements";

const FormEvent = ({
	event,
	onHandleSubmit,
	onRemovePhoto
}: {
	event?: Evenement;
	onHandleSubmit: (
		e: React.FormEvent<HTMLFormElement>,
		id: number | undefined
	) => void;
	onRemovePhoto?: (id: string) => void;
}) => {
	return (
		<form className="form" onSubmit={(e) => onHandleSubmit(e, event?.id)}>
			<h1 className="formTitle">
				{event ? "Modifier l'évènement" : "Ajouter un évènement"}
			</h1>
			<div>
				<label htmlFor="nameWP"> Titre pour WordPress : </label>
				<input
					type="text"
					id="nameWP"
					name="nameWP"
					{...event && { defaultValue: event.title.rendered }}
				/>
			</div>
			<div>
				<label htmlFor="eventName">Nom de l'évèvenement : </label>
				<input
					type="text"
					id="eventName"
					name="eventName"
					{...event && { defaultValue: event.nom_de_levenement}}
				/>
			</div>
			<div>
				<label htmlFor="beginDate">Date de début : </label>
				<input
					type="date"
					id="beginDate"
					name="beginDate"
					{...event && { defaultValue: event.date_de_l_evenement}}
				/>
			</div>
			<div>
				<label htmlFor="endDate">Date de fin : </label>
				<input
					type="date"
					id="endDate"
					name="endDate"
					{...event && { defaultValue: event.date_de_fin}}
				/>
			</div>
			<div>
				<label htmlFor="beginHour">Heure de début : </label>
				<input
					type="time"
					id="beginHour"
					name="beginHour"
					{...event && { defaultValue: event.heure_de_debut}}
				/>
			</div>
			<div>
				<label htmlFor="endHour">Heure de fin : </label>
				<input
					type="time"
					id="endHour"
					name="endHour"
					{...event && { defaultValue: event.heure_de_fin}}
				/>
			</div>
			<div>
				<label htmlFor="description">Description : </label>
				<textarea
					id="description"
					name="description"
					{...event && { defaultValue: event.description}}
				></textarea>
			</div>
			{event &&
          <div>
            <img
              
              src={event.banniere.guid}
              alt="affiche"
              className="photo"
            />
            <span
              className="deletePhoto"
			  { ...(onRemovePhoto && { onClick: () => onRemovePhoto(event.banniere.ID) }) }
              
            >
              &times;
            </span>
          </div>
        
      }
			<div>
				<label htmlFor="img">Image : </label>
				<input type="file" id="img" name="img" />
			</div>
			<button type="submit" className="formSubmit">
				valider
			</button>
		</form>
	);
};

export default FormEvent;
