const { VITE_URL_WP } = import.meta.env;

export const fetchDatasFromWP = async <T>(route: string): Promise<T[]> => {
  const url = "http://" + VITE_URL_WP +"wp/v2/"+ route;

  const response = await fetch(url);

  return response.json();
};
