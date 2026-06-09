import type { WidenPrimitive } from "../types.ts";

export type PrimissiveAttributeType = string | number | boolean | undefined;

export type PermissiveAttributeConfig = {
  [attribute: string]: PrimissiveAttributeType;
};

export type ValidateAttributeConfig<T extends PermissiveAttributeConfig> = {
  [K in keyof T]: WidenPrimitive<T[K]>;
};

export const attributeConfig = <const T extends PermissiveAttributeConfig>(
  config: ValidateAttributeConfig<T>,
) => {
  return config as T;
};
