export type Tarifs= {
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
    tarif_duree: string
    prix: string
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
  