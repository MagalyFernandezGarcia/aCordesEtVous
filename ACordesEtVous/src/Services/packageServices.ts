import { Package } from "../Types/package";


const { VITE_URL_WP } = import.meta.env;

export async function fetchPackageList(): Promise<Package[]> {
  const response = await fetch("http://" + VITE_URL_WP + "wp/v2/forfaits");
  const result: Package[] = await response.json();
  return result;
}