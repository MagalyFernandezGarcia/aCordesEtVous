import { AmenagementPost } from "../Types/amenagements";
import { createDatas } from "./servicesAPI/ServicesAPI";

export const createDisplay = (data: AmenagementPost) => {
	return createDatas<AmenagementPost>("amenagements", data);
};
