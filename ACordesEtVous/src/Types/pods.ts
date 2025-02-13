export type PodsAmenagement= {
	nom_de_lambiance: string;
	photos: Array<{
		ID: number;
		post_author: number;
		post_date: string;
		post_date_gmt: string;
		post_content: string;
		post_title: string;
		post_excerpt: string;
		post_status: string;
		comment_status: "open" | "closed";
		ping_status: "open" | "closed";
		post_password: string;
		post_name: string;
		to_ping: string;
		pinged: string;
		post_modified: string;
		post_modified_gmt: string;
		post_content_filtered: string;
		post_parent: number;
		guid: string;
		menu_order: number;
		post_type: string;
		post_mime_type: string;
		comment_count: number;
		pod_item_id: string;
	}>;
};

export type Photo = {
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
    pod_item_id: string; // Pod ID spécifique à cette image
  };
  
  
