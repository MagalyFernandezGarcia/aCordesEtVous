import { AmenagementPost } from "../Types/amenagements";
import { updateDatas } from "./servicesAPI/ServicesAPI";

export const updateDisplay = (id: number, data: AmenagementPost) => {
	updateDatas<AmenagementPost>("amenagements", id, data);
};
