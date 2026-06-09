import type { Keyof } from "../types.ts";
import type { PrimissiveAttributeType } from "./attribute-config.ts";

export type PremissivePrimitiveTag = string;

export type PremissiveTagDefinition<Tags extends string = string> = Record<
  Tags,
  {
    attributes?: Record<string, PrimissiveAttributeType>;
    innerHTML: "*" | (Tags | "#text")[];
  }
>;

export const tagDefinition = <
  const T extends PremissiveTagDefinition<Keyof<T>>,
>(
  config: T,
) => {
  return config;
};
