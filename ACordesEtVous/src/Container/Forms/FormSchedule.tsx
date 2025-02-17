import { Horaire } from "../../Types/horaires"
import "./forms.css"

const FormSchedule = ({schedule, onHandleSubmit } : {schedule? : Horaire , onHandleSubmit : (e : React.FormEvent<HTMLFormElement>, id : number | undefined) => void } ) => {

    return(
        <form className="form" onSubmit={(e) => onHandleSubmit(e, schedule?.id )}
        ></form>
    )
}

export default FormSchedule