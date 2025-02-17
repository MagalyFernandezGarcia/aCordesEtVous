
/* const { VITE_URL_WP } = import.meta.env; */

export async function LoginUser(
	username: string,
	password: string
): Promise<Boolean> {
	const formData = new URLSearchParams();
	formData.append("log", username);
	formData.append("pwd", password);

	try {
		const response = await fetch("http://a-cordes-et-vous.local/wp-login.php", {
			method: "POST",
			headers: { "content-Type": "application/x-www-form-urlencoded" },
			body: formData.toString(),
			credentials: "include",
		});

		return response.ok;
	} catch (error) {
		console.error("Erreur lors de la connexion", error);
		throw error;
	}
}


export async function fetchCurrentUser(): Promise<{id: number; name: string} | null> {
    try {
      const { wpApiSettings } = window as any;
      if (!wpApiSettings?.root) {
        console.error('wpApiSettings.root est introuvable.');
        return null;
      }
  
      const resp = await fetch(`${wpApiSettings.root}wp/v2/users/me`, {
        credentials: 'include',
        headers: {
          "X-WP-Nonce": (window as any).wpApiSettings?.nonce,
        }
      });
  
      if (!resp.ok) {
        console.error('GET /users/me =>', resp.status, await resp.text());
        return null;
      }
  
      const data = await resp.json();
      // data = { id: 1, name: "admin", ... }
      return { id: data.id, name: data.name };
    } catch (err) {
      console.error('Erreur fetchCurrentUser:', err);
      return null;
    }
  }