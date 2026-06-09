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

export type WidenObject<T> = {
  [K in keyof T]: WidenPrimitive<T[K]>;
};

type UndefinedKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

export type Simplify<T> = { readonly [K in keyof T]: T[K] } & {};

export type MakeUndefinedOptional<T> = Simplify<
  // Keep keys that DO NOT allow undefined exactly as they are
  {
    readonly [K in Exclude<keyof T, UndefinedKeys<T>>]: T[K];
  } & { [K in UndefinedKeys<T>]?: T[K] } // Apply the `?` modifier to keys that DO allow undefined
>;

export type Keyof<T extends Record<string, any>> = keyof T & string;
