import { dslString } from "@/dsl/index.ts";
import type {
  BaseCSSAttributeConfig,
  ValidateCSSAttributeConfig,
} from "./types.ts";
import type { BaseCSSSyntaxConfig } from "../syntax-config/types.ts";

export const cssAttributeConfig = <
  const S extends BaseCSSSyntaxConfig,
  const A extends BaseCSSAttributeConfig,
>(
  syntaxConfig: S,
  config: ValidateCSSAttributeConfig<S, A>,
) => {
  for (const key in config) {
    dslString(syntaxConfig, config[key]);
  }
  return config as A;
};
