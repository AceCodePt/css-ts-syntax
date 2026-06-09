import type { SyntaxKeysConfig as TSyntaxKeysConfig } from "../config/css-syntax-config.ts";

export type CSSPropertyDefinition<
  SyntaxKeysConfig extends TSyntaxKeysConfig,
  Syntax extends keyof SyntaxKeysConfig, // Note: using standard 'keyof'
> = {
  syntax: Syntax;
  inherits: boolean;
  "initial-value": SyntaxKeysConfig[Syntax];
};

export type ValidCSSProperty<S extends TSyntaxKeysConfig> = {
  [K in keyof S]: CSSPropertyDefinition<S, K>;
}[keyof S];

export type CSSPropertyRegistry<S extends TSyntaxKeysConfig> = Record<
  string,
  ValidCSSProperty<S>
>;

export function cssPropertiesRegistry<
  const S extends TSyntaxKeysConfig,
  const T extends CSSPropertyRegistry<S>,
>(_syntax: S, config: T) {
  return config;
}
