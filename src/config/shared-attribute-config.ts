import type { WidenPrimitive } from "../types.ts";

export type SharedAttributeConfig = Record<
  string,
  string | number | boolean | undefined
>;

export type ProcessedSharedConfig<T> = {
  [K in keyof T]?: WidenPrimitive<T[K]>;
};

// Using a clean pass-through constraint
export const sharedAttributeConfig = <const T extends SharedAttributeConfig>(
  config: T,
): ProcessedSharedConfig<T> => {
  return config as any;
};
