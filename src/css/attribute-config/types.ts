import type {
  CSSAttributeConfig,
  InferredCSSAttributes,
} from "../css-attributes-config.ts";
import type { BaseCSSSyntaxConfig } from "../syntax-config/types.ts";

export type BaseCSSAttributeValue = string;
export type BaseCSSAttributeConfig = Record<string, BaseCSSAttributeValue>;

export type ValidateCSSAttributeConfig<
  S extends BaseCSSSyntaxConfig,
  A extends BaseCSSAttributeConfig,
> = CSSAttributeConfig<S, A>;

export type InferCSSAttributeConfig<
  S extends BaseCSSSyntaxConfig,
  A extends BaseCSSAttributeConfig,
> = InferredCSSAttributes<S, A>;
