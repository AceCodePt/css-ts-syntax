import type { DSLInfer, DSLValidate } from "@/dsl/index.ts";

export type BaseHTMLAttributeValue = string;
export type BaseHTMLAttributesConfig = Record<string, BaseHTMLAttributeValue>;

export type ValidateHTMLAttributesConfig<
  Keywords extends Record<string, any>,
  A extends BaseHTMLAttributesConfig,
> = {
  [K in keyof A]: K extends string ? DSLValidate<Keywords, A[K]> : A[K];
};

export type InferHTMLAttributesConfig<
  Keywords extends Record<string, any>,
  A extends BaseHTMLAttributesConfig,
> = {
  [K in keyof A]: K extends string ? DSLInfer<Keywords, A[K]> : A[K];
};
