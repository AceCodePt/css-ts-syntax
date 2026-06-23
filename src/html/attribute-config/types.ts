import type { DSLInfer, DSLValidate } from "@/dsl/index.ts";

export type BaseHTMLAttributeValue = string;
export type BaseHTMLAttributeConfig = Record<string, BaseHTMLAttributeValue>;

export type ValidateHTMLAttributeConfig<
  Keywords extends Record<string, any>,
  A extends BaseHTMLAttributeConfig,
> = {
  [K in keyof A]: K extends string ? DSLValidate<Keywords, A[K]> : A[K];
};

export type InferHTMLAttributeConfig<
  Keywords extends Record<string, any>,
  A extends BaseHTMLAttributeConfig,
> = {
  [K in keyof A]: K extends string ? DSLInfer<Keywords, A[K]> : A[K];
};
