import type { BaseHTMLAttributeConfig } from "./html/html-attribute-config.ts";
import type { BaseHTMLTagConfig } from "./html/html-tag-config.ts";
import type {
  Keyof,
  MakeUndefinedOptional,
  Simplify,
  WidenObject,
} from "./types.ts";

type PermissiveSementicName = string;

export type AnyComponentNode<
  TagConfig extends BaseHTMLTagConfig = BaseHTMLTagConfig,
  GlobalAttributeConfig extends BaseHTMLAttributeConfig =
    BaseHTMLAttributeConfig,
  Tag extends string = Keyof<TagConfig>,
> = {
  [T in Tag]: PremissableComponentNode<TagConfig, GlobalAttributeConfig, T>;
}[Tag];

export type PremissableComponentNode<
  TagConfig extends BaseHTMLTagConfig = BaseHTMLTagConfig,
  GlobalAttributeConfig extends BaseHTMLAttributeConfig =
    BaseHTMLAttributeConfig,
  Tag extends Keyof<TagConfig> = Keyof<TagConfig>,
> = {
  tag: Tag;
  attributes?: WidenObject<
    MakeUndefinedOptional<GlobalAttributeConfig & TagConfig[Tag]["attributes"]>
  >;
  innerHTML?: (TagConfig[Tag]["innerHTML"] extends infer R | (infer R)[]
    ? R extends "*" | "#text"
      ?
          | string
          | Record<
              PermissiveSementicName,
              AnyComponentNode<
                TagConfig,
                GlobalAttributeConfig,
                R extends "*" ? Keyof<TagConfig> : R
              >
            >
      : Record<
          PermissiveSementicName,
          AnyComponentNode<
            TagConfig,
            GlobalAttributeConfig,
            Exclude<TagConfig[Tag]["innerHTML"][number], "#text">
          >
        >
    : never)[];
};

// type ValidateComponent<
//   TagConfig extends PremissiveTagDefinition,
//   GlobalAttributeConfig extends PermissiveAttributeConfig,
//   T extends Keyof<TagConfig>,
//   Component extends PremissableComponentNode<
//     TagConfig,
//     GlobalAttributeConfig,
//     T
//   >,
// > = {
//   [K in keyof Component]: K extends "innerHTML"
//     ? TagConfig[Component["tag"]]["innerHTML"] extends infer R | (infer R)[]
//       ? R extends "*" | "#text"
//         ? Component[K]
//         : Component[K] extends any[]
//           ? Exclude<Component[K][number], string>[]
//           : Component[K]
//       : Component[K]
//     : Component[K];
// };

export function createComponent<
  const TagConfig extends BaseHTMLTagConfig,
  const GlobalAttributeConfig extends BaseHTMLAttributeConfig,
  const T extends Keyof<TagConfig>,
  const Component extends PremissableComponentNode<
    TagConfig,
    GlobalAttributeConfig,
    T
  >,
>(
  _htmlTagAttributes: TagConfig,
  _globalAttributes: GlobalAttributeConfig,
  node: Simplify<{ tag: T } & Component>,
) {
  return node;
}
