export type BaseHTMLAttributeValue = string | number | boolean | undefined;

export type BaseHTMLAttributeConfig = {
  [attribute: string]: BaseHTMLAttributeValue;
};

export const htmlAttributeConfig = <const T extends BaseHTMLAttributeConfig>(
  config: T,
) => {
  return config;
};
