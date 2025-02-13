import {  AmenagementPut } from "../Types/amenagements";
import { updateDatas } from "./servicesAPI/ServicesAPI";
import { TarifPut } from "../Types/tarifs";
export const updateDisplay = (id: number, data: AmenagementPut) => {
	updateDatas<AmenagementPut>("amenagements", id, data);
};

export const updateTarif =(id: number, data: TarifPut) => {
	updateDatas<TarifPut>("tarifs", id, data);
};