import type { DSLInfer } from "@/dsl/index.ts";
import type { BaseHTMLAttributeConfig } from "@/html/attribute-config/types.ts";
import type { BaseHTMLTagConfig } from "@/html/tag-config/types.ts";
import type { Keyof, MakeUndefinedOptional } from "@/types.ts";

type ExtractTagAttributes<TagDef> = TagDef extends { attributes?: infer A }
  ? A extends BaseHTMLAttributeConfig
    ? A
    : {}
  : {};

type ExtractInnerHTML<TagDef> = TagDef extends { innerHTML?: infer I }
  ? I
  : never;

type AllowedChildTags<TagDef, AllTags extends string> =
  ExtractInnerHTML<TagDef> extends "*"
    ? AllTags
    : ExtractInnerHTML<TagDef> extends readonly (infer T extends string)[]
      ? Exclude<T, "#text">
      : never;

type AllowsText<TagDef> =
  ExtractInnerHTML<TagDef> extends "*"
    ? true
    : ExtractInnerHTML<TagDef> extends readonly (infer T extends string)[]
      ? "#text" extends T
        ? true
        : false
      : false;

type IsVoidInnerHTML<TagDef> =
  ExtractInnerHTML<TagDef> extends readonly [] ? true : false;

type CombinedAttributes<
  TagDef,
  GlobalAttrs extends BaseHTMLAttributeConfig,
> = MakeUndefinedOptional<{
  [K in
    | keyof ExtractTagAttributes<TagDef>
    | keyof GlobalAttrs]: K extends keyof ExtractTagAttributes<TagDef>
    ? DSLInfer<ExtractTagAttributes<TagDef>[K] & string>
    : K extends keyof GlobalAttrs
      ? DSLInfer<GlobalAttrs[K] & string>
      : never;
}>;

type ComponentConfig<
  TagDefs extends BaseHTMLTagConfig,
  GlobalAttrs extends BaseHTMLAttributeConfig,
  AllowedTags extends string,
> =
  AllowedTags extends Keyof<TagDefs>
    ? {
        tag: AllowedTags;
        attributes?: CombinedAttributes<TagDefs[AllowedTags], GlobalAttrs>;
        innerHTML?: InnerHTMLValue<TagDefs, GlobalAttrs, TagDefs[AllowedTags]>;
      }
    : never;

type NamedChildren<
  TagDefs extends BaseHTMLTagConfig,
  GlobalAttrs extends BaseHTMLAttributeConfig,
  AllowedTags extends string,
  TextAllowed extends boolean,
> = {
  [name: string]: NamedChildrenEntry<
    TagDefs,
    GlobalAttrs,
    AllowedTags,
    TextAllowed
  >;
};

type NamedChildrenEntry<
  TagDefs extends BaseHTMLTagConfig,
  GlobalAttrs extends BaseHTMLAttributeConfig,
  AllowedTags extends string,
  TextAllowed extends boolean,
> = TextAllowed extends true
  ?
      | string
      | ComponentConfig<TagDefs, GlobalAttrs, AllowedTags>
      | ComponentConfig<TagDefs, GlobalAttrs, AllowedTags>[]
  :
      | ComponentConfig<TagDefs, GlobalAttrs, AllowedTags>
      | ComponentConfig<TagDefs, GlobalAttrs, AllowedTags>[];

type InnerHTMLValue<
  TagDefs extends BaseHTMLTagConfig,
  GlobalAttrs extends BaseHTMLAttributeConfig,
  TagDef,
> =
  IsVoidInnerHTML<TagDef> extends true
    ? readonly never[]
    : NamedChildren<
        TagDefs,
        GlobalAttrs,
        AllowedChildTags<TagDef, Keyof<TagDefs>>,
        AllowsText<TagDef>
      >;

export function createComponent<
  const TagDefs extends BaseHTMLTagConfig,
  const GlobalAttrs extends BaseHTMLAttributeConfig,
>(
  _tagDefs: TagDefs,
  _globalAttrs: GlobalAttrs,
  config: ComponentConfig<TagDefs, GlobalAttrs, Keyof<TagDefs>>,
) {
  return config;
}
