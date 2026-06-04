export type SharedAttributeConfig = Record<
  string,
  string | number | boolean | undefined
>;

export const sharedAttributeConfig = <const T extends SharedAttributeConfig>(
  config: T,
) => config;
