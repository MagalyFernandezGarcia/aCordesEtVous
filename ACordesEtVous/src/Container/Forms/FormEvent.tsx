import { Evenement } from "../../Types/evenements";

const FormEvent = ({
  event,
  onHandleSubmit,
}: {
  event?: Evenement;
  onHandleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    id: number 
  ) => void;
}) => {
  return (
    <form className="form">
      <h1 className="formTitle">
        {event ? "Modifier l'évènement" : "Ajouter un évènement"}
      </h1>
      <div>
        <label htmlFor="nameWP"> Titre pour WordPress : </label>
        <input
          type="text"
          id="nameWP"
          name="nameWP"
          defaultValue={event?.title.rendered}
        />
      </div>
      <div>
        <label htmlFor="eventName">Nom de l'évèvenement : </label>
        <input type="text" id="eventName" name="eventName" defaultValue={event?.nom_de_levenement} />
      </div>
      <div>
        <label htmlFor="beginDate">Date de début : </label>
        <input type="date" id="beginDate" name="beginDate" defaultValue={event?.date_de_l_evenement}/>
      </div>
      <div>
        <label htmlFor="endDate">Date de fin : </label>
        <input type="date" id="endDate" name="endDate" defaultValue={event?.date_de_fin}/>
      </div>
      <div>
        <label htmlFor="beginHour">Heure de début : </label>
        <input type="time" id="beginHour" name="beginHour" defaultValue={event?.heure_de_debut} />
      </div>
      <div>
        <label htmlFor="endHour">Heure de fin : </label>
        <input type="time" id="endHour" name="endHour" defaultValue={event?.heure_de_fin} />
      </div>
      <div>
        <label htmlFor="description">Description : </label>
        <textarea id="description" name="description" defaultValue={event?.description}></textarea>
      </div>
      <div>
        <label htmlFor="img">Image : </label>
        <input type="file" id="img" name="img" defaultValue={event?.banniere.guid}/>
      </div>
    </form>
  );
};

export default FormEvent