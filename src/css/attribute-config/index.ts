import { dslString } from "@/dsl/index.ts";
import type {
  BaseCSSAttributesConfig,
  ValidateCSSAttributesConfig,
} from "./types.ts";
import type { BaseCSSSyntaxConfig } from "../syntax-config/types.ts";

export const cssAttributeConfig = <
  const S extends BaseCSSSyntaxConfig,
  const A extends BaseCSSAttributesConfig,
>(
  syntaxConfig: S,
  config: ValidateCSSAttributesConfig<S, A>,
) => {
  for (const key in config) {
    dslString(syntaxConfig, config[key]);
  }
  return config as A;
};
