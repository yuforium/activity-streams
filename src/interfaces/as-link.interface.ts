export interface ASLink {
  '@context'?: string | string[];
  type: string | string[];
  href: string;
  id?: string;
  name?: string | string[];
  hreflang?: string;
  mediaType?: string;
  rel?: string | string[];
  height?: number;
  width?: number;
}