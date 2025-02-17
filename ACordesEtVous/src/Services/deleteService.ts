import { deleteDatas } from "./servicesAPI/ServicesAPI";

export const deletePhoto = (id: number) => deleteDatas("media", id);