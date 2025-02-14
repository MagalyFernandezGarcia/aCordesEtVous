

const { VITE_URL_WP } = import.meta.env;



export const fetchDatasFromWP = async <T>(route: string): Promise<T[]> => {
	const url = "http://" + VITE_URL_WP + "wp/v2/" + route;

	const response = await fetch(url);

	return response.json();
};

export const fetchDatasFromWPById = async <T>(
	route: string,
	id: number
): Promise<T> => {
	const url = "http://" + VITE_URL_WP + "wp/v2/" + route + "/" + id;

	const response = await fetch(url);

	return response.json();
};


export const updateDatas = async <T>(route: string, id: number, data: T) => {
	const url = `http://${VITE_URL_WP}wp/v2/${route}/${id}`;
	
	console.log("Final data being sent:", JSON.stringify(data, null, 2));
	

	const response = await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}
	
};
