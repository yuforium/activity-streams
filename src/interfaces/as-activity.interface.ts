import { ASObject, ASObjectOrLink } from "./as-object.interface";

export interface ASActivity extends ASObject {
  actor?: ASObjectOrLink;
  object?: ASObjectOrLink;
  target?: ASObjectOrLink;
  result?: ASObjectOrLink;
  origin?: ASObjectOrLink;
  instrument?: ASObjectOrLink;
}