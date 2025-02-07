import { Amenagement } from "../Types/amenagements";
import { fetchDatasFromWP } from "./servicesAPI/ServicesAPI";



export const fetchDisplayList = ()=> fetchDatasFromWP<Amenagement>("amenagements");