import type { Keyof } from "../types.ts";
import type { PrimissiveAttributeType } from "./attribute-config.ts";

export type PremissivePrimitiveTag = string;
export type PermissiveInnerHTMLTagDefinition<
  PossibleTags extends string = string,
> = "*" | (PossibleTags | "#text")[];

export type PremissiveTagDefinition<Tags extends string = string> = Record<
  Tags,
  {
    attributes?: Record<string, PrimissiveAttributeType>;
    innerHTML: PermissiveInnerHTMLTagDefinition<Tags>;
  }
>;

export const tagDefinition = <
  const T extends PremissiveTagDefinition<Keyof<T>>,
>(
  config: T,
) => {
  return config;
};
