import type { Keyof } from "../types.ts";
import type { BaseHTMLAttributeValue } from "./html-attribute-config.ts";

export type BaseHTMLTag = string;
export type BaseInnerHTMLTagConfig<PossibleTags extends string = string> =
  | "*"
  | PossibleTags[];

export type BaseHTMLTagConfig<Tags extends string = string> = Record<
  Tags,
  {
    attributes?: Record<string, BaseHTMLAttributeValue>;
    innerHTML: "*" | (Tags | "#text")[];
  }
>;

type ValidateHTMLTagConfig<
  TagDefinition extends BaseHTMLTagConfig = BaseHTMLTagConfig,
> = {
  [Tag in keyof TagDefinition]: Tag extends string
    ? {
        // The keyof[keyof] is so the type exact i.e. no more new properties
        [K in keyof TagDefinition[Tag]]: K extends keyof BaseHTMLTagConfig[keyof BaseHTMLTagConfig]
          ? TagDefinition[Tag][K]
          : never;
      }
    : TagDefinition[Tag];
};

export const htmlTagConfig = <const T extends BaseHTMLTagConfig<Keyof<T>>>(
  config: T & ValidateHTMLTagConfig<T>,
): T => {
  return config;
};
