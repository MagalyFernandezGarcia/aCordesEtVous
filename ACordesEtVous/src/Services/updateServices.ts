import { AmenagementPut } from "../Types/amenagements";
import { updateDatas } from "./servicesAPI/ServicesAPI";
import { TarifPut } from "../Types/tarifs";
import { PackagePut } from "../Types/package";
import { HorairePut } from "../Types/horaires";
import { EvenementPut } from "../Types/evenements";
import { MaterialPut } from "../Types/materials";
export const updateDisplay = (id: number, data: AmenagementPut) => {
	updateDatas<AmenagementPut>("amenagements", id, data);
};

export const updateTarif = (id: number, data: TarifPut) => {
	updateDatas<TarifPut>("tarifs", id, data);
};

export const updatePackage = (id: number, data: PackagePut) => {
	updateDatas<PackagePut>("forfaits", id, data);
};

export const updateSchedule = (id: number, data: HorairePut) => {
	updateDatas<HorairePut>("horaires", id, data);
};

export const updateEvent = (id: number, data: EvenementPut) => {
	updateDatas<EvenementPut>("evenements", id, data);
};

export const updateMaterial = (id: number, data: MaterialPut) => {
	updateDatas<MaterialPut>("locations", id, data);
};
