export type PrimitiveSyntaxValue = string;

declare const _error: unique symbol;

export type SyntaxKeysConfig = Record<`<${string}${string}>`, string>;

export type ValidatedSyntaxKeys<T extends SyntaxKeysConfig = SyntaxKeysConfig> =
  {
    [K in keyof T]: K extends string
      ? K extends `<${string}${string}>`
        ? T[K] extends string
          ? T[K]
          : T[K] & {
              [_error]: `🛑 ERROR: The value of '${K}' must be any type of string`;
            }
        : T[K] & {
            [_error]: `🛑 ERROR: The key '${K}' must be wrapped in angle brackets (e.g., '<${K}>')`;
          }
      : T[K];
  };

export function cssSyntaxConfig<const T extends SyntaxKeysConfig>(
  config: ValidatedSyntaxKeys<T>,
): T {
  return config;
}
