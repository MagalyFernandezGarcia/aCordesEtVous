
// import { QuizzList } from "../types/quizz";

// //localhost:8080/wp/v2/testquizz

// const { VITE_URL_WP } = import.meta.env;

// export async function fetchQuizzList(
//   nbElements: number,
//   page = 1
// ): Promise<QuizzList[]> {
//   const response = await fetch(
//     "http://" +
//       VITE_URL_WP +
//       "wp/v2/testquizz?per_page=" +
//       nbElements +
//       "&page=" +
//       page
//   );
//   const result: QuizzList[] = await response.json();
//   return result;
// }

import { Card } from "../Types/cards";

//localhost:8080/wp/v2/cards

const { VITE_URL_WP } = import.meta.env;

export async function fetchCardList(): Promise<Card[]> {

    const response = await fetch(
        "http://" +
            VITE_URL_WP +
            "wp/v2/cards"
    );
    const result: Card[] = await response.json();
    return result;
}