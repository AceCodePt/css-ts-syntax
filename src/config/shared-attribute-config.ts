export type SharedAttributeConfig = Record<
  string,
  string | number | boolean | undefined
>;

type WidenPrimitive<V> = V extends boolean
  ? boolean
  : V extends number
    ? number
    : V extends string
      ? string
      : V;

export type ProcessedSharedConfig<T> = {
  [K in keyof T]?: WidenPrimitive<T[K]>;
};

export const sharedAttributeConfig = <const T extends SharedAttributeConfig>(
  config: T & ProcessedSharedConfig<T>,
): ProcessedSharedConfig<T> => {
  return config;
};
