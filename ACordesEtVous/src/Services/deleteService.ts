
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

export const deleteSchedule = async(id: number) => {
   await deleteDatas("horaires", id)
   
};

export const deleteEvent = async(id: number) => {
    await deleteDatas("evenements", id)
    
 };