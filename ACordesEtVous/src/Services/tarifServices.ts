import { Tarifs } from "../Types/tarifs";


const { VITE_URL_WP } = import.meta.env;

export async function fetchTarifsList(): Promise<Tarifs[]> {
  const response = await fetch("http://" + VITE_URL_WP + "wp/v2/tarifs");
  const result: Tarifs[] = await response.json();
  return result;
}