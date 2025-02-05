import { Card } from "../Types/cards";

const { VITE_URL_WP } = import.meta.env;

export async function fetchCardList(): Promise<Card[]> {
  const response = await fetch("http://" + VITE_URL_WP + "wp/v2/cards");
  const result: Card[] = await response.json();
  return result;
}
