import type { DSLValidate } from "@/dsl/index.ts";

export type BaseHTMLAttributeValue = string;
export type BaseHTMLAttributeConfig = Record<string, BaseHTMLAttributeValue>;

export type ValidateHTMLAttributeConfig<A extends BaseHTMLAttributeConfig> = {
  [K in keyof A]: K extends string ? DSLValidate<A[K]> : A[K];
};
