const { VITE_URL_WP } = import.meta.env;

export const uploadMedia = async (file: File, podId : number, displayTitle : string ) => {
  const url = `http://${VITE_URL_WP}wp/v2/media`;

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

  const normalizeDate = (date: string): string => {
	// Convert any date string to a standard format: "YYYY-MM-DD HH:mm:ss"
	const parsedDate = new Date(date);
	return parsedDate.toISOString().slice(0, 19).replace('T', ' '); // Format as "YYYY-MM-DD HH:mm:ss"
  };

  const photoData = await response.json();
  console.log("photoData", photoData);
  
  const formattedPhoto = {
    ID: photoData.id.toString(),
    post_author: photoData.post_author ?? "1",
    post_date: normalizeDate(photoData.post_date ?? new Date().toISOString()),
    post_date_gmt: normalizeDate(photoData.post_date_gmt ?? new Date().toISOString()),
    post_content: photoData.post_content ?? "",
    post_title: displayTitle,
    post_excerpt: photoData.post_excerpt ?? "",
    post_status: photoData.post_status ?? "inherit",
    comment_status: photoData.comment_status ?? "open",
    ping_status: photoData.ping_status ?? "open",
	pod_item_id: podId.toString(),
    post_password: photoData.post_password ?? "",
    post_name: photoData.slug?? "",
    to_ping: photoData.to_ping ?? "",
    pinged: photoData.pinged ?? "",
    post_modified: normalizeDate(photoData.post_modified ?? new Date().toISOString()),
    post_modified_gmt: normalizeDate(photoData.post_modified_gmt ?? new Date().toISOString()),
    post_content_filtered: photoData.post_content_filtered ?? "",
    post_parent: podId.toString(),
    guid: photoData.guid.rendered ?? "",
    menu_order: photoData.menu_order ?? "0",
    post_type: photoData.post_type ?? "attachment",
    post_mime_type: photoData.post_mime_type ?? "image/jpeg",
    comment_count: photoData.comment_count ?? "0",
	
    
  };

  return formattedPhoto;
};
