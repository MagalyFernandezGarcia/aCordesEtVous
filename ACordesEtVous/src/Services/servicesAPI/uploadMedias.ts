
const { VITE_URL_WP } = import.meta.env;


export const uploadMedia = async (file: File) => {
	const url = `http://${VITE_URL_WP}wp/v2/media`
   
	


	const formData = new FormData();
	formData.append("file", file);
	formData.append("title", file.name); 

	const response = await fetch(url, {
		method: "POST",
		credentials: "include", 
		headers: {
			
            "X-WP-Nonce": (window as any).wpApiSettings?.nonce,  
        },
		
		body: formData, 
	});

	if (!response.ok) {
		throw new Error(`Erreur: ${response.status} - ${await response.text()}`);
	}

	return response.json(); 
};


