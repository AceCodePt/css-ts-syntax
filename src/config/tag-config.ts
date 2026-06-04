export type BaseTagConfig = Record<
  string,
  {
    innerHTML: "*" | readonly string[];
  }
>;

type ValidateTagProps<Config, Tag extends keyof Config> = {
  [Prop in keyof Config[Tag]]: Prop extends "innerHTML"
    ? "*" | readonly (keyof Config | "#text")[]
    : string | number | boolean | undefined; // Strict primitives for other properties
};

export type ValidateConfig<Config> = {
  [Tag in keyof Config]: ValidateTagProps<Config, Tag>;
};

export const tagConfig = <const T extends BaseTagConfig>(
  config: T & ValidateConfig<T>,
) => config;
