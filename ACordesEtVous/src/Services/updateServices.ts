import { AmenagementPut } from "../Types/amenagements";
import { updateDatas } from "./servicesAPI/ServicesAPI";
import { TarifPut } from "../Types/tarifs";
import { PackagePut } from "../Types/package";
import { HorairePut } from "../Types/horaires";
import { EvenementPut } from "../Types/evenements";
import { MaterialPut } from "../Types/materials";
export const updateDisplay = (id: number, data: AmenagementPut) => {
	return updateDatas<AmenagementPut>("amenagements", id, data);
};

export const updateTarif = (id: number, data: TarifPut) => {
	return updateDatas<TarifPut>("tarifs", id, data);
};

export const updatePackage = (id: number, data: PackagePut) => {
	return updateDatas<PackagePut>("forfaits", id, data);
};

export const updateSchedule = (id: number, data: HorairePut) => {
	return updateDatas<HorairePut>("horaires", id, data);
};

export const updateEvent = (id: number, data: EvenementPut) => {
	return updateDatas<EvenementPut>("evenements", id, data);
};

export const updateMaterial = (id: number, data: MaterialPut) => {
	return updateDatas<MaterialPut>("locations", id, data);
};
