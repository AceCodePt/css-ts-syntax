import type { Simplify } from "../types.ts";
import type { BaseCSSSyntaxConfig } from "./css-syntax-config.ts";

// ─────────────────────────────────────────────────────────────────────────────
// ArkType-style single-signature DSL validation + autocomplete.
//
// The per-attribute parameter type is computed by `Validate<value, keys>`, which
// returns ONE of two things depending on what you've typed:
//
//   • a union of valid completions — when the active "<token>" is mid-type, e.g.
//     typing "<length> | <pe" yields "<length> | <percentage>", so the editor
//     offers it as a partial-continuation suggestion (like ArkType's "number | b"
//     → "number | bigint"); and
//
//   • a plain-string error message — for terminal mistakes (illegal characters,
//     empty alternatives, malformed tokens, unknown tokens). The message is a
//     real string literal (marked with a trailing zero-width space, as ArkType
//     does) rather than an `& ErrorTag<{...}>` object, so the diagnostic reads as
//     a single clean line: `Type '"..."' is not assignable to type '"🛑 ..."'`.
//
// Because it is a SINGLE signature (no overloads) and the error is a plain string
// (no object brand), there is no "No overload matches this call" wrapper and no
// dump of the syntax-config type in the diagnostic.
// ─────────────────────────────────────────────────────────────────────────────

/** Zero-width space marker so error messages never collide with real values. */
type ZWS = "\u200b";
type ErrorMessage<M extends string> = `${M}${ZWS}`;

type SyntaxKeys<S extends BaseCSSSyntaxConfig> = keyof S & string;
type Trim<S extends string> = S extends ` ${infer R}`
  ? Trim<R>
  : S extends `${infer L} `
    ? Trim<L>
    : S;

/** Characters that may never appear in the DSL. Edit this set freely. */
type IllegalChars = "(" | ")" | "[" | "]" | "{" | "}";

/**
 * The FIRST illegal character in `S` (leftmost), or `never` if clean. Walks the
 * string one character at a time: peel the first char (`Head`) off the rest
 * (`Tail`), test it against the banned set, and recurse on `Tail` until a hit or
 * the empty string. The single-char peel keeps the match unambiguous, and the
 * return-or-recurse gives "stop at the first" — neither is possible with a single
 * `extends` over a union (that returns all matches, not the first).
 */
type IllegalChar<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Head extends IllegalChars
    ? Head
    : IllegalChar<Tail>
  : never;

type KeyBody<K extends string> = K extends `<${infer B}>` ? B : never;

/** All keys whose body begins with the partial fragment `P` (for completion). */
type KeysMatching<
  P extends string,
  Keys extends string,
> = Keys extends infer K extends string
  ? K extends K
    ? KeyBody<K> extends `${P}${string}`
      ? K
      : never
    : never
  : never;

// ── completed-expression checks (split on bare "|", trim each part) ──
type SplitPipe<S extends string> = S extends `${infer A}|${infer B}`
  ? Trim<A> | SplitPipe<B>
  : Trim<S>;
type EmptyParts<S extends string> =
  SplitPipe<S> extends infer P extends string
    ? P extends P
      ? P extends ""
        ? "x"
        : never
      : never
    : never;
type MalformedPart<P extends string> = P extends `<${string}>`
  ? never
  : P extends `<${string}`
    ? P
    : P extends `${string}>`
      ? P
      : never;
type MalformedParts<S extends string> =
  SplitPipe<S> extends infer P extends string
    ? P extends P
      ? MalformedPart<P>
      : never
    : never;
type TokenParts<S extends string> =
  SplitPipe<S> extends infer P extends string
    ? P extends P
      ? P extends `<${string}>`
        ? P
        : never
      : never
    : never;

// ── active-segment splitting (everything after the final "|") ──
type LastSegment<S extends string> = S extends `${string}|${infer R}`
  ? LastSegment<R>
  : S;
type PrefixBeforeLast<S extends string> = S extends `${infer A}|${infer R}`
  ? R extends `${string}|${string}`
    ? `${A}|${PrefixBeforeLast<R>}`
    : `${A}|`
  : "";
type PrefixSpace<S extends string> =
  LastSegment<S> extends ` ${string}` ? " " : "";

/**
 * Core: completion union when a "<token>" is mid-type, otherwise full validation.
 */
type Validate<S extends string, Keys extends string> = [
  IllegalChar<S>,
] extends [never]
  ? Trim<LastSegment<S>> extends `<${infer Body}`
    ? Body extends `${string}>${string}`
      ? FinishedCheck<S, Keys> // token already closed → validate as complete
      : KeysMatching<Body, Keys> extends infer M extends string
        ? [M] extends [never]
          ? ErrorMessage<`🛑 No known token starts with '<${Body}'`>
          : `${PrefixBeforeLast<S>}${PrefixSpace<S>}${M}` // completion union
        : ErrorMessage<`🛑 parse error`>
    : FinishedCheck<S, Keys>
  : ErrorMessage<`🛑 Unexpected character '${IllegalChar<S>}' — only <tokens> separated by '|' are allowed`>;

type FinishedCheck<S extends string, Keys extends string> = [
  EmptyParts<S>,
] extends [never]
  ? [MalformedParts<S>] extends [never]
    ? [Exclude<TokenParts<S>, Keys>] extends [never]
      ? S // ✅ valid
      : ErrorMessage<`🛑 Unknown token '${Exclude<TokenParts<S>, Keys> & string}' — not defined in your CSS_SYNTAX config`>
    : ErrorMessage<`🛑 Malformed token '${MalformedParts<S> & string}' — missing closing '>'`>
  : ErrorMessage<`🛑 Empty alternative — every '|' must separate two non-empty values`>;

/** Validated shape of an attribute config (useful as a derived type). */
export type CSSAttributeConfig<
  S extends BaseCSSSyntaxConfig,
  A extends Record<string, string>,
> = {
  [K in keyof A]: Validate<A[K], SyntaxKeys<S>>;
};

// ─────────────────────────────────────────────────────────────────────────────
// Inference: turn a validated DSL string into its perceived value type.
// Each "|"-separated part maps to either the syntax config's value type (for a
// "<token>") or the literal keyword itself (for a bare word like "none").
// ─────────────────────────────────────────────────────────────────────────────
type InferPart<P extends string, S> = P extends keyof S ? S[P] : P;

type InferDSL<Def extends string, S> = Def extends `${infer A}|${infer B}`
  ? InferPart<Trim<A>, S> | InferDSL<Trim<B>, S>
  : InferPart<Trim<Def>, S>;

/** The inferred value type for each attribute in a config. */
export type InferredCSSAttributes<
  S extends BaseCSSSyntaxConfig,
  A extends Record<string, string>,
> = Simplify<{
  [K in keyof A]: InferDSL<A[K], S>;
}>;

/** Identity helper that captures the syntax config's literal types. */
export function cssSyntaxConfig<const S extends BaseCSSSyntaxConfig>(
  syntax: S,
): S {
  return syntax;
}

export function cssAttributeConfig<
  const S extends BaseCSSSyntaxConfig,
  const A extends Record<string, string>,
>(
  _syntax: S,
  attrs: {
    [K in keyof A]: A[K] extends Validate<A[K], SyntaxKeys<S>>
      ? A[K]
      : Validate<A[K], SyntaxKeys<S>>;
  },
): InferredCSSAttributes<S, A> {
  return attrs as never;
}
