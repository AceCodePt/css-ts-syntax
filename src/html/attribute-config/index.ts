import { dslString } from "@/dsl/index.ts";
import type {
  BaseHTMLAttributesConfig,
  ValidateHTMLAttributesConfig,
} from "./types.ts";

export const htmlAttributeConfig = <
  const Keywords extends Record<string, any>,
  const A extends BaseHTMLAttributesConfig,
>(
  supportedKeywords: Keywords,
  config: ValidateHTMLAttributesConfig<Keywords, A>,
) => {
  for (const key in config) {
    dslString(supportedKeywords, config[key]);
  }
  return config as A;
};
