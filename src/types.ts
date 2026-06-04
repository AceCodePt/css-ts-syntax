export type IsUnion<T, U = T> = T extends any
  ? [U] extends [T]
    ? false
    : true
  : never;

export type WidenPrimitive<V> =
  true extends IsUnion<V>
    ? V
    : V extends boolean
      ? boolean
      : V extends number
        ? number
        : V extends string
          ? string
          : V;
