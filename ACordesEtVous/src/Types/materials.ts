import { Photo } from "./pods";

export type Material = {
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
	objet: string;
	description: string;
	prix: string;
	prix_description: string;
	image_de_lobjet: {
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
	};
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

export type MaterialPut = {
	id: number;
	status?: string;
	title?: {
		rendered: string;
	};
	objet?: string;
	description?: string;
	prix?: string;
	prix_description?: string;
	image_de_lobjet?: {
		ID: string;
		guid: string;
	};
	_links?: {
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

export type MaterialPost = {
	slug?: string;
	status: string;
	type?: string;
	title:  string;
	
	template?: string;
	class_list?: Array<string>;
	objet: string;
	description: string;
	prix: string;
	prix_description?: string;
	image_de_lobjet?: Photo
};