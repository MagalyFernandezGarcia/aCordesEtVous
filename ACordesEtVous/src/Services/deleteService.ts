
import { deleteDatas } from "./servicesAPI/ServicesAPI";

export const deletePhoto = (id: number) => deleteDatas("media", id);

export const deleteDisplay =  async(id: number) => {
   await deleteDatas("amenagements", id)
   

};

export const deleteTarif = async(id: number) => {
   await deleteDatas("tarifs", id)
   
};

export const deletePackage = async(id: number) => {
   await deleteDatas("forfaits", id)
   
};