import { AmenagementPost } from "../Types/amenagements";
import { EvenementPost } from "../Types/evenements";
import {  HorairePost } from "../Types/horaires";
import { MaterialPost } from "../Types/materials";
import { PackagePost } from "../Types/package";
import { TarifsPost } from "../Types/tarifs";
import {  createDatas} from "./servicesAPI/ServicesAPI";



export const createDisplay = (data: AmenagementPost) => {
	return createDatas<AmenagementPost>("amenagements", data);
};


export const createTarif = (data: TarifsPost) => {
	return createDatas<TarifsPost>("tarifs", data);
}

export const createPackage = (data: PackagePost) => {
	return createDatas<PackagePost>("forfaits", data);
}

export const createSchedule = (data : HorairePost) =>{
	
	
	return createDatas<HorairePost>("horaires", data);
}

export const createEvent = (data: EvenementPost) => {
	return createDatas<EvenementPost>("evenements", data);
}

export const createMaterial = (data : MaterialPost) => {
	return createDatas<MaterialPost>("locations", data);
}