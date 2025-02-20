import { AmenagementPost } from "../Types/amenagements";
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