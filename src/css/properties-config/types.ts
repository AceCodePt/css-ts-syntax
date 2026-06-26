import type { DSLValidate } from "@/dsl/index.ts";
import type {
  BaseCSSSyntaxConfig,
  InferCSSSyntax,
} from "../syntax-config/types.ts";

export type BaseCSSPropertyValue = {
  syntax: string;
  inherits?: boolean;
  "initial-value"?: string;
};
export type BaseCSSPropertyConfig = Record<`--${string}`, BaseCSSPropertyValue>;

// So... small issue
// We need to change the dependencies of how stuff work.
// The syntax config is relied on supported keywords.
// However the same supported keywords need to be used in order to run the DSLinfer

export type ValidateCSSPropertyConfig<
  Keywords extends Record<string, any>,
  S extends BaseCSSSyntaxConfig,
  P extends BaseCSSPropertyConfig,
> = {
  [K in keyof P]: K extends string
    ? K extends `--${string}`
      ? {
          syntax: DSLValidate<S, P[K]["syntax"]>;
          inherits: boolean;
          // "initial-value": DSLInfer<S, P[K]["syntax"]>;
          "initial-value": InferCSSSyntax<Keywords, S, P[K]["syntax"]>;
        }
      : never
    : P[K];
};
