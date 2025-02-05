import { Amenagement } from "../Types/amenagements";




const { VITE_URL_WP } = import.meta.env;

export async function fetchDisplayList(): Promise<Amenagement[]> {

    const response = await fetch(
        "http://" +
            VITE_URL_WP +
            "wp/v2/amenagements"
    );
    const result: Amenagement[] = await response.json();
    return result;
}