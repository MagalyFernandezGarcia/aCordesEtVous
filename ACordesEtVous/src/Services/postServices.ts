import { AmenagementPost } from "../Types/amenagements";
import { TarifsPost } from "../Types/tarifs";
import {  createDatas} from "./servicesAPI/ServicesAPI";



export const createDisplay = (data: AmenagementPost) => {
	return createDatas<AmenagementPost>("amenagements", data);
};


export const createTarif = (data: TarifsPost) => {
	return createDatas<TarifsPost>("tarifs", data);
}