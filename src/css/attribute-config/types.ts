import type { DSLInfer, DSLValidate } from "@/dsl/index.ts";
import type { BaseCSSSyntaxConfig } from "../syntax-config/types.ts";

export type BaseCSSAttributeValue = string;
export type BaseCSSAttributesConfig = Record<string, BaseCSSAttributeValue>;

export type ValidateCSSAttributesConfig<
  S extends BaseCSSSyntaxConfig,
  A extends BaseCSSAttributesConfig,
> = {
  [K in keyof A]: K extends string ? DSLValidate<S, A[K]> : A[K];
};

export type InferCSSAttributesConfig<
  S extends BaseCSSSyntaxConfig,
  A extends BaseCSSAttributesConfig,
> = {
  readonly [K in keyof A]: K extends string ? DSLInfer<S, A[K]> : A[K];
};
