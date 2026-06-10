import type { Keyof } from "../types.ts";
import type { PrimissiveAttributeType } from "./attribute-config.ts";

export type PremissivePrimitiveTag = string;
export type PermissiveInnerHTMLTagDefinition<
  PossibleTags extends string = string,
> = "*" | PossibleTags[];

export type PremissiveTagDefinition<Tags extends string = string> = Record<
  Tags,
  {
    attributes?: Record<string, PrimissiveAttributeType>;
    innerHTML: "*" | (Tags | "#text")[];
  }
>;

type ValidateTagDefinition<
  TagDefinition extends PremissiveTagDefinition = PremissiveTagDefinition,
> = {
  [Tag in keyof TagDefinition]: Tag extends string
    ? {
        // The keyof[keyof] is so the type exact i.e. no more new properties
        [K in keyof TagDefinition[Tag]]: K extends keyof PremissiveTagDefinition[keyof PremissiveTagDefinition]
          ? TagDefinition[Tag][K]
          : never;
      }
    : TagDefinition[Tag];
};

export const tagDefinition = <
  const T extends PremissiveTagDefinition<Keyof<T>>,
>(
  config: T & ValidateTagDefinition<T>,
): T => {
  return config;
};
