import type { BaseCSSAttributesConfig } from "./css/attribute-config/types.ts";
import type { BaseCSSPropertiesConfig } from "./css/properties-config/types.ts";
import type { BaseCSSSyntaxConfig } from "./css/syntax-config/types.ts";
import type { DSLInfer, SupportedKeywords } from "./dsl/index.ts";
import type {
  BaseHTMLAttributesConfig,
  InferHTMLAttributesConfig,
} from "./html/attribute-config/types.ts";
import type { BaseHTMLTagConfig } from "./html/tag-config/types.ts";
import type { Keyof, MakeUndefinedOptional } from "./types.ts";

// const comp = {
//   tag: "a",
//   attributes: {},
//   innerHTML: {
//     icon: {
//       tag: "svg",
//     },
//     text: "",
//   },
//   css: {
//     width: "100%",
//     "> img": {},
//     "> title": {},
//   },
// };

type BaseComponentInnerHTMLStructure =
  | Record<string, BaseComponentStructure | string>
  | string;

type BaseComponentStructure = {
  tag: string;
  attributes?: Record<string, string>;
  innerHTML?: BaseComponentInnerHTMLStructure;
  css?: Record<string, any>;
};

type IsTextAllowed<
  HTMLTagConfig extends BaseHTMLTagConfig,
  Tag extends keyof HTMLTagConfig,
> = "*" extends HTMLTagConfig[Tag]["innerHTML"]
  ? true
  : "#text" extends HTMLTagConfig[Tag]["innerHTML"][number]
    ? true
    : false;

type ValidateComponentInnerHTMLStructure<
  Keywords extends Record<string, any>,
  HTMLAttributesConfig extends BaseHTMLAttributesConfig,
  HTMLTagConfig extends BaseHTMLTagConfig,
  CSSSyntaxConfig extends BaseCSSSyntaxConfig,
  CSSAttributesConfig extends BaseCSSAttributesConfig,
  CSSPropertiesConfig extends BaseCSSPropertiesConfig,
  Tag extends keyof HTMLTagConfig,
  T extends BaseComponentInnerHTMLStructure,
> = Exclude<
  {
    [K in keyof T]: K extends string
      ? T[K] extends BaseComponentStructure
        ? [
            Extract<
              | HTMLTagConfig[Tag]["innerHTML"][number]
              | HTMLTagConfig[Tag]["innerHTML"],
              T[K]["tag"] | "*"
            >,
          ] extends [never]
          ? { tag: Exclude<HTMLTagConfig[Tag]["innerHTML"][number], "#text"> }
          : ValidateComponentStructure<
              Keywords,
              HTMLAttributesConfig,
              HTMLTagConfig,
              CSSSyntaxConfig,
              CSSAttributesConfig,
              CSSPropertiesConfig,
              T[K]
            >
        : true extends IsTextAllowed<HTMLTagConfig, Tag>
          ? T[K]
          : never
      : T[K];
  },
  true extends IsTextAllowed<HTMLTagConfig, Tag> ? never : string
>;

type ValidateComponentCSSStructure<
  Keywords extends Record<string, any>,
  CSSSyntaxConfig extends BaseCSSSyntaxConfig,
  CSSAttributesConfig extends BaseCSSAttributesConfig,
  CSSPropertiesConfig extends BaseCSSPropertiesConfig,
  T extends BaseComponentStructure,
> = {
  [K in keyof CSSAttributesConfig[T["tag"]]]?: K extends string
    ? K extends keyof CSSAttributesConfig
      ? DSLInfer<Keywords & CSSSyntaxConfig, CSSAttributesConfig[K]>
      : `You need to have a valid css attribute`
    : CSSAttributesConfig[T["tag"]][K];
};

type ValidateComponentStructure<
  Keywords extends Record<string, any>,
  HTMLAttributesConfig extends BaseHTMLAttributesConfig,
  HTMLTagConfig extends BaseHTMLTagConfig,
  CSSSyntaxConfig extends BaseCSSSyntaxConfig,
  CSSAttributesConfig extends BaseCSSAttributesConfig,
  CSSPropertiesConfig extends BaseCSSPropertiesConfig,
  T extends BaseComponentStructure,
> = {
  [K in keyof T]: K extends string
    ? K extends "tag"
      ? Keyof<HTMLTagConfig>
      : K extends "attributes"
        ? MakeUndefinedOptional<
            Partial<InferHTMLAttributesConfig<Keywords, HTMLAttributesConfig>> &
              (HTMLTagConfig[T["tag"]]["attributes"] extends BaseHTMLAttributesConfig
                ? InferHTMLAttributesConfig<
                    SupportedKeywords,
                    HTMLTagConfig[T["tag"]]["attributes"]
                  >
                : {})
          >
        : K extends "innerHTML"
          ? T["innerHTML"] extends BaseComponentInnerHTMLStructure
            ? ValidateComponentInnerHTMLStructure<
                Keywords,
                HTMLAttributesConfig,
                HTMLTagConfig,
                CSSSyntaxConfig,
                CSSAttributesConfig,
                CSSPropertiesConfig,
                T["tag"],
                T["innerHTML"]
              >
            : never
          : K extends "css"
            ? ValidateComponentCSSStructure<
                Keywords,
                CSSSyntaxConfig,
                CSSAttributesConfig,
                CSSPropertiesConfig,
                T
              >
            : null
    : T[K];
};

export function createComponent<
  const Keywords extends Record<string, any>,
  const HTMLAttributesConfig extends BaseHTMLAttributesConfig,
  const HTMLTagConfig extends BaseHTMLTagConfig,
  const CSSSyntaxConfig extends BaseCSSSyntaxConfig,
  const CSSAttributesConfig extends BaseCSSAttributesConfig,
  const CSSPropertiesConfig extends BaseCSSPropertiesConfig,
  const T extends BaseComponentStructure,
>(
  _supportedKeywords: Keywords,
  _HTMLAttributesConfig: HTMLAttributesConfig,
  _HTMLTagConfig: HTMLTagConfig,
  _CSSSyntaxConfig: CSSSyntaxConfig,
  _CSSAttributesConfig: CSSAttributesConfig,
  _CSSPropertiesConfig: CSSPropertiesConfig,
  config: ValidateComponentStructure<
    Keywords,
    HTMLAttributesConfig,
    HTMLTagConfig,
    CSSSyntaxConfig,
    CSSAttributesConfig,
    CSSPropertiesConfig,
    T
  >,
) {
  return config as T;
}
