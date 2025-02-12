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
