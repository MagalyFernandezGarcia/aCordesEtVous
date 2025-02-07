import { Card } from "../Types/cards";
import { fetchDatasFromWP } from "./servicesAPI/ServicesAPI";

export const fetchCardList = ()=> fetchDatasFromWP<Card>("cards");