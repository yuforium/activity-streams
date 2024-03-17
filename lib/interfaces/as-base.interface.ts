import { ASObjectOrLink } from "./as-object.interface";

export interface  ASRoot {
  '@context'?: string | string[];
  id?: string;
  type: string | string[];

  resolve(): Promise<ASObjectOrLink>;
}
