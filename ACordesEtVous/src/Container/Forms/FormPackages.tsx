import { Package } from "../../Types/package"
import "./forms.css"


const FormPackages = ({forfait, onHandleSubmit } : {forfait? : Package, onHandleSubmit : (e : React.FormEvent<HTMLFormElement>, id : number | undefined) => void}) => {
    return (
        <form className="form" onSubmit={(e) => onHandleSubmit(e, forfait?.id )}>
            <h1 className="formTitle">{forfait? "Modifier le forfait" : "Ajouter un forfait"}</h1>
            <div>
                <label htmlFor="nameWP"> Titre pour WordPress : </label>
                <input type="text" id="nameWP" name="nameWP" {...forfait && { defaultValue: forfait.title.rendered }} />
            </div>
            <div>
                <label htmlFor="composition"> Composition : </label>
                <input type="text" id="composition" name="composition" {...forfait && { defaultValue: forfait.composition}} />
            </div>

            <div>
                <label htmlFor="duration"> Durée : </label>
                <input type="text" id="duration" name="duration" {...forfait && { defaultValue: forfait.duree }} />
            </div>
            <div>
                <label htmlFor="price"> Prix : </label>
                <input type="number" id="price" name="price" {...forfait && { defaultValue: forfait.prix }} />
            </div>

            <button type="submit" className="formSubmit" >
          valider
        </button>


        </form>
    )
}




export default FormPackages