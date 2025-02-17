import { Tarifs } from "../../Types/tarifs"



const FormTarifs = ({tarif, onHandleSubmit } : {tarif? : Tarifs, onHandleSubmit : (e : React.FormEvent<HTMLFormElement>, id : number | undefined) => void } ) => {
    return (
        <form className="form" onSubmit={(e) => onHandleSubmit(e, tarif?.id )}>
            <h1 className="formTitle">{tarif? "Modifier le tarif" : "Ajouter un tarif"}</h1>
            <div>
                <label htmlFor="nameWP"> Titre pour WordPress : </label>
                <input type="text" id="nameWP" name="nameWP" defaultValue={tarif?.title.rendered} />
            </div>
            <div>
                <label htmlFor="duration"> Durée : </label>
                <input type="text" id="duration" name="duration" defaultValue={tarif?.tarif_duree} />
            </div>

           
            <div>
                <label htmlFor="price"> Prix : </label>
                <input type="number" id="price" name="price" defaultValue={tarif?.prix} />
            </div>

            <button type="submit" className="formSubmit" >
          valider
        </button>


        </form>
    )
}

export default FormTarifs