import { Photo } from "./pods"

export type Horaire = {
    id: number
    date: string
    date_gmt: string
    guid: {
      rendered: string
    }
    modified: string
    modified_gmt: string
    slug: string
    status: string
    type: string
    link: string
    title: {
      rendered: string
    }
    template: string
    class_list: Array<string>
    jours: string
    heure: string
    precision: string
    image_de_lhoraire: {
      ID: string
      post_author: string
      post_date: string
      post_date_gmt: string
      post_content: string
      post_title: string
      post_excerpt: string
      post_status: string
      comment_status: string
      ping_status: string
      post_password: string
      post_name: string
      to_ping: string
      pinged: string
      post_modified: string
      post_modified_gmt: string
      post_content_filtered: string
      post_parent: string
      guid: string
      menu_order: string
      post_type: string
      post_mime_type: string
      comment_count: string
      pod_item_id: string
    }
    _links: {
      self: Array<{
        href: string
        targetHints: {
          allow: Array<string>
        }
      }>
      collection: Array<{
        href: string
      }>
      about: Array<{
        href: string
      }>
      "wp:attachment": Array<{
        href: string
      }>
      curies: Array<{
        name: string
        href: string
        templated: boolean
      }>
    }
  }
  

  export type HorairePut = {
    id: number 
    slug?: string
    status?: string
    title?: { rendered: string }
    template?: string
    class_list?: string[] 
    jours?: string 
    heure?: string 
    precision?: string 
    image_de_lhoraire?: Photo 
    _links?: {
      self: Array<{
        href: string
        targetHints: {
          allow: Array<string>
        }
      }>
      collection: Array<{
        href: string
      }>
      about: Array<{
        href: string
      }>
      "wp:attachment": Array<{
        href: string
      }>
      curies: Array<{
        name: string
        href: string
        templated: boolean
      }>
    }
  };
  export type HorairePost = {
    title: string;
    jours: string;
    heure: string;
    precision?: string;
    image_de_lhoraire?: Photo; 
    
    status: string
};
