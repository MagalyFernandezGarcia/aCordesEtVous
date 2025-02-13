import {  AmenagementPut } from "../Types/amenagements";
import { updateDatas } from "./servicesAPI/ServicesAPI";

export const updateDisplay = (id: number, data: AmenagementPut) => {
	updateDatas<AmenagementPut>("amenagements", id, data);
};
