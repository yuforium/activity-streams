import { ASRoot } from "../interfaces/as-base.interface";

export class ResolvingArray<T extends ASRoot> extends Array {
  async resolve(): Promise<any> {
    const promises = this.map(async (item: ASRoot) => await item.resolve());
    return Promise.all(promises);
    // return Promise.all(this.map(async (item: T) => item.resolve()));
  }
}