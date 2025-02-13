import { Amenagement } from "../Types/amenagements";
import { Card } from "../Types/cards";
import { Evenement } from "../Types/evenements";
import { Horaire } from "../Types/horaires";
import { Material } from "../Types/materials";
import { Package } from "../Types/package";
import { Tarifs } from "../Types/tarifs";

import {
	fetchDatasFromWP,
	fetchDatasFromWPById,
} from "./servicesAPI/ServicesAPI";

export const fetchDisplayList = () =>
	fetchDatasFromWP<Amenagement>("amenagements");
export const fetchCardList = () => fetchDatasFromWP<Card>("cards");
export const fetchPackageList = () => fetchDatasFromWP<Package>("forfaits");
export const fetchTarifsList = () => fetchDatasFromWP<Tarifs>("tarifs");
export const fetchScheduleList = () => fetchDatasFromWP<Horaire>("horaires");
export const fetchEventsList = () => fetchDatasFromWP<Evenement>("evenements");
export const fetchMaterialsList = () => fetchDatasFromWP<Material>("locations");

export const fetchDisplayById = (id: number) =>
	fetchDatasFromWPById<Amenagement>("amenagements", id);

export const fetchTarifById = (id: number) =>
	fetchDatasFromWPById<Tarifs>("tarifs", id);