export type Amenagement = {
	id: number;
	date: string;
	date_gmt: string;
	guid: {
		rendered: string;
	};
	modified: string;
	modified_gmt: string;
	slug: string;
	status: string;
	type: string;
	link: string;
	title: {
		rendered: string;
	};
	template: string;
	class_list: Array<string>;
	nom_de_lambiance: string;
	photos: Array<{
		ID: string;
		post_author: string;
		post_date: string;
		post_date_gmt: string;
		post_content: string;
		post_title: string;
		post_excerpt: string;
		post_status: string;
		comment_status: string;
		ping_status: string;
		post_password: string;
		post_name: string;
		to_ping: string;
		pinged: string;
		post_modified: string;
		post_modified_gmt: string;
		post_content_filtered: string;
		post_parent: string;
		guid: string;
		menu_order: string;
		post_type: string;
		post_mime_type: string;
		comment_count: string;
		pod_item_id: string;
	}>;
	_links: {
		self: Array<{
			href: string;
			targetHints: {
				allow: Array<string>;
			};
		}>;
		collection: Array<{
			href: string;
		}>;
		about: Array<{
			href: string;
		}>;
		"wp:attachment": Array<{
			href: string;
		}>;
		curies: Array<{
			name: string;
			href: string;
			templated: boolean;
		}>;
	};
};

export type AmenagementPost = {
	id?: number; // Facultatif, WordPress génère l'ID
	date?: string; // Date de publication au format ISO 8601
	date_gmt?: string; // Date en GMT
	title: string | { rendered: string }; // Titre du post
	content: string | { rendered: string }; // Contenu du post
	excerpt?: string | { rendered: string }; // Extrait du post
	status?: "publish" | "future" | "draft" | "pending" | "private"; // Statut de publication
	author?: number; // ID de l’auteur du post
	featured_media?: number; // ID de l'image mise en avant
	comment_status?: "open" | "closed"; // Statut des commentaires
	ping_status?: "open" | "closed"; // Pingback/trackback autorisé
	categories?: number[]; // ID des catégories associées au post
	tags?: number[]; // ID des tags associés au post
	meta?: Record<string, any>; // Métadonnées personnalisées
	template?: string; // Modèle de page utilisé
	format?:
		| "standard"
		| "aside"
		| "chat"
		| "gallery"
		| "link"
		| "image"
		| "quote"
		| "status"
		| "video"
		| "audio"; // Format du post
	slug?: string; // Slug de l’article
	sticky?: boolean; // Est-ce un post mis en avant ?
	password?: string; // Mot de passe pour protéger l'article
	permalink_template?: string; // Modèle d'URL pour l'article

	nom_de_lambiance: string; // Pod
	// photos: Array<{
	// 	// A check par une certain Magaly qui fera une nuit blanche ?
	// 	ID: string;
	// 	post_author: string;
	// 	post_date: string;
	// 	post_date_gmt: string;
	// 	post_content: string;
	// 	post_title: string;
	// 	post_excerpt: string;
	// 	post_status: string;
	// 	comment_status: string;
	// 	ping_status: string;
	// 	post_password: string;
	// 	post_name: string;
	// 	to_ping: string;
	// 	pinged: string;
	// 	post_modified: string;
	// 	post_modified_gmt: string;
	// 	post_content_filtered: string;
	// 	post_parent: string;
	// 	guid: string;
	// 	menu_order: string;
	// 	post_type: string;
	// 	post_mime_type: string;
	// 	comment_count: string;
	// 	pod_item_id: string;
	// }>;

	_links?: Record<string, any>; // Liens API (auto-générés par WP)
};
