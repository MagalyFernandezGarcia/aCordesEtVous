import { Package } from "../Types/package";
import { fetchDatasFromWP } from "./servicesAPI/ServicesAPI";


export const fetchPackageList = ()=> fetchDatasFromWP<Package>("forfaits");