export type WidenPrimitive<V> = V extends boolean
  ? boolean extends V
    ? boolean
    : V
  : V extends number
    ? number extends V
      ? number
      : V
    : V extends string
      ? string extends V
        ? string
        : V
      : V;
