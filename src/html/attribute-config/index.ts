import { dslString } from "@/dsl/index.ts";
import type {
  BaseHTMLAttributeConfig,
  ValidateHTMLAttributeConfig,
} from "./types.ts";

export const htmlAttributeConfig = <
  const Keywords extends Record<string, any>,
  const A extends BaseHTMLAttributeConfig,
>(
  supportedKeywords: Keywords,
  config: ValidateHTMLAttributeConfig<Keywords, A>,
) => {
  for (const key in config) {
    dslString(supportedKeywords, config[key]);
  }
  return config as A;
};
