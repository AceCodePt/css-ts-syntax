import type { WidenPrimitive } from "../types.ts";

export type BaseTagConfig = {
  [tag: string]: {
    innerHTML: "*" | readonly string[];
    [attribute: string]: unknown;
  };
};

export type ProcessedTagConfig<T> = {
  readonly [Tag in keyof T]: {
    readonly [Attr in keyof T[Tag]]: Attr extends "innerHTML"
      ? T[Tag][Attr]
      : WidenPrimitive<T[Tag][Attr]>;
  };
};

export const tagConfig = <const T extends BaseTagConfig>(
  config: T,
): ProcessedTagConfig<T> => {
  return config as unknown as ProcessedTagConfig<T>;
};
