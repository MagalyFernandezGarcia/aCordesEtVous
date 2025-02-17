

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

export const createDatas = async <T>(route: string, data: T) => {
	const url = `http://${VITE_URL_WP}wp/v2/${route}`;
	
	console.log("Final data being sent:", JSON.stringify(data, null, 2));
	

	const response = await fetch(url, {
		method: "POST",
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

export const deleteDatas = async (route: string, id: number) => {
	const url = `http://${VITE_URL_WP}wp/v2/${route}/${id}?force=true`;

	const response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"X-WP-Nonce": (window as any).wpApiSettings?.nonce,
		},
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}
};
