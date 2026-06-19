import type {
  BaseHTMLAttributeConfig,
  ValidateHTMLAttributeConfig,
} from "./types.ts";

export const htmlAttributeConfig = <const A extends BaseHTMLAttributeConfig>(
  config: ValidateHTMLAttributeConfig<A>,
) => {
  return config as A;
};
