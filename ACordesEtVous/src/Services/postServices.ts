import { AmenagementPost } from "../Types/amenagements";
import { createDatas, createPod } from "./servicesAPI/ServicesAPI";

export const createDisplay = (data: AmenagementPost) => {
	return createDatas<AmenagementPost>("amenagements", data);
};

export const createPodDisplay = (data: AmenagementPost) => {
	return createPod<AmenagementPost>("amenagements", data);
};