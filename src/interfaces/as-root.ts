import { ASRoot } from "./as-base.interface";

export interface ASLink extends ASRoot {
  href: string;
  name?: string | string[];
  hreflang?: string;
  mediaType?: string;
  rel?: string | string[];
  height?: number;
  width?: number;
}