import { Amenagement } from "../Types/amenagements";
import { Card } from "../Types/cards";
import { Package } from "../Types/package";
import { Tarifs } from "../Types/tarifs";
import { fetchDatasFromWP } from "./servicesAPI/ServicesAPI";



export const fetchDisplayList = ()=> fetchDatasFromWP<Amenagement>("amenagements");
export const fetchCardList = ()=> fetchDatasFromWP<Card>("cards");
export const fetchPackageList = ()=> fetchDatasFromWP<Package>("forfaits");
export const fetchTarifsList =()=> fetchDatasFromWP<Tarifs>("tarifs");