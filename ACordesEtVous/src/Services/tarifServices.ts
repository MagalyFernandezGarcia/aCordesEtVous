import { Tarifs } from "../Types/tarifs";
import { fetchDatasFromWP } from "./servicesAPI/ServicesAPI";


export const fetchTarifsList =()=> fetchDatasFromWP<Tarifs>("tarifs");