import { ResolvingArray } from "../util/resolving-array";
import { ASRoot } from "./as-base.interface";
import { ASCollection } from "./as-collection.interface";
import { ASLink } from "./as-root";

export type ASObjectOrLink = ASObject | ASLink | string;

export type ASContentMap = {[key: string]: string}[];

export interface ASObject extends ASRoot {
  '@context'?: string | string[];
  id?: string;
  type: string | string[];
  attachment?: ASLink | ResolvingArray<ASLink>;
  attributedTo?: ASObjectOrLink | ASObjectOrLink[];
  audience?: ASObjectOrLink | ASObjectOrLink[];
  content?: string | string[];
  context?: ASObjectOrLink | ASObjectOrLink[];
  contentMap?: ASContentMap;
  name?: string | string[];
  nameMap?: ASContentMap|ASContentMap[];
  endTime?: string;
  generator?: ASObjectOrLink | ASObjectOrLink[];
  icon?: ASObjectOrLink | ASObjectOrLink[];
  image?: ASObjectOrLink | ASObjectOrLink[];
  inReplyTo?: ASObjectOrLink | ASObjectOrLink[];
  location?: ASObjectOrLink | ASObjectOrLink[];
  preview?: ASObjectOrLink | ASObjectOrLink[];
  published?: string;
  replies?: ASCollection;
  startTime?: string;
  summary?: string | string[];
  summaryMap?: ASContentMap|ASContentMap[];
  tag?: ASObjectOrLink | ASObjectOrLink[];
  updated?: string;
  url?: ASLink | string | (ASLink | string)[];
  to?: ASObjectOrLink | ASObjectOrLink[];
  bto?: ASObjectOrLink | ASObjectOrLink[];
  cc?: ASObjectOrLink | ASObjectOrLink[];
  bcc?: ASObjectOrLink | ASObjectOrLink[];
  mediaType?: string;
  duration?: string;
}