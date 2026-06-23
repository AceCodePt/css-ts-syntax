import { describe, test } from "node:test";
import type { Equal, Expect } from "./type-utils.ts";
import { assertType } from "./type-utils.ts";
import type { ValidateHTMLAttributeConfig } from "../src/html/attribute-config/html-attribute-config.ts";
import type { CSSAttributeConfig } from "../src/css/css-attributes-config.ts";
import type { ValidatedCSSSyntaxConfig } from "../src/css/syntax-config/index.ts";

// ─────────────────────────────────────────────────────────────────────────────
// Shared minimal syntax config used by cssAttributeConfig tests
// ─────────────────────────────────────────────────────────────────────────────

type S = { "<length>": string; "<color>": string };

// ─────────────────────────────────────────────────────────────────────────────
// htmlTagConfig
//
// Tag config delegates attribute validation to ValidateHTMLAttributeConfig.
// No runtime validation exists — type-level only.
// ─────────────────────────────────────────────────────────────────────────────

describe("htmlTagConfig — attribute validation (type-level only)", () => {
  test("valid attribute value passes through unchanged", () => {
    assertType<
      Expect<Equal<ValidateHTMLAttributeConfig<{ dir: "'ltr' | 'rtl'" }>["dir"], "'ltr' | 'rtl'">>
    >();
    assertType<
      Expect<Equal<ValidateHTMLAttributeConfig<{ disabled: "boolean" }>["disabled"], "boolean">>
    >();
  });

  test("unknown keyword on a tag attribute produces error string", () => {
    assertType<
      Expect<
        Equal<
          ValidateHTMLAttributeConfig<{ dir: "foobar" }>["dir"],
          "🛑 Unknown keyword 'foobar' — expected a reserved keyword or quoted string"
        >
      >
    >();
  });

  test("illegal character on a tag attribute produces error string", () => {
    assertType<
      Expect<
        Equal<
          ValidateHTMLAttributeConfig<{ dir: "str(ing" }>["dir"],
          "🛑 Unexpected character '(' — only bare keywords and quoted strings allowed"
        >
      >
    >();
  });

  test("unclosed quote on a tag attribute produces error string", () => {
    assertType<
      Expect<
        Equal<
          ValidateHTMLAttributeConfig<{ dir: "'ltr" }>["dir"],
          "🛑 Invalid value ''ltr' — unclosed or stray quote"
        >
      >
    >();
  });

  test("empty alternative on a tag attribute produces error string", () => {
    assertType<
      Expect<
        Equal<
          ValidateHTMLAttributeConfig<{ dir: "string || undefined" }>["dir"],
          "🛑 Empty alternative — every '|' must separate two non-empty values"
        >
      >
    >();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// cssAttributeConfig
//
// Type-only validator. Valid inputs pass through as-is. Invalid inputs
// produce error string literals on the property. Note: partial inputs
// (trailing `|`, unclosed `<token`) trigger autocomplete unions, not errors —
// those are not tested here.
// ─────────────────────────────────────────────────────────────────────────────

describe("cssAttributeConfig — DSL validation (type-level only)", () => {
  test("valid known token passes through unchanged", () => {
    assertType<
      Expect<Equal<CSSAttributeConfig<S, { width: "<length>" }>["width"], "<length>">>
    >();
  });

  test("valid bare keyword passes through unchanged", () => {
    assertType<
      Expect<Equal<CSSAttributeConfig<S, { display: "none | block" }>["display"], "none | block">>
    >();
  });

  test("valid token union passes through unchanged", () => {
    assertType<
      Expect<
        Equal<
          CSSAttributeConfig<S, { border: "<length> | <color>" }>["border"],
          "<length> | <color>"
        >
      >
    >();
  });

  test("unknown token produces error string", () => {
    assertType<
      Expect<
        Equal<
          CSSAttributeConfig<S, { width: "<foo>" }>["width"],
          "🛑 Unknown token '<foo>' — not defined in your CSS_SYNTAX config"
        >
      >
    >();
  });

  test("illegal character produces error string", () => {
    assertType<
      Expect<
        Equal<
          CSSAttributeConfig<S, { width: "abc()" }>["width"],
          "🛑 Unexpected character '(' — only <tokens> separated by '|' are allowed"
        >
      >
    >();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// cssSyntaxConfig
//
// Type-only validator. Two separate error mechanisms:
//   1. Bad key (missing angle brackets) → ErrorTag brand on the value.
//   2. Bad DSL value (invalid atom in a DSL string) → ErrorTag brand on the value.
// As-cast values (e.g. `${number}px`) are not DSL strings and pass through.
// ─────────────────────────────────────────────────────────────────────────────

describe("cssSyntaxConfig — key and DSL validation (type-level only)", () => {
  test("valid DSL value passes through unchanged", () => {
    type Result = ValidatedCSSSyntaxConfig<{ "<length>": "number" }>["<length>"];
    assertType<Expect<Equal<Result, "number">>>();
  });

  test("as-cast value (non-DSL) passes through unchanged", () => {
    type Result = ValidatedCSSSyntaxConfig<{ "<length>": `${number}px` }>["<length>"];
    assertType<Expect<Equal<Result, `${number}px`>>>();
  });

  test("key missing angle brackets produces plain error string", () => {
    type Result = ValidatedCSSSyntaxConfig<{ "length": string }>["length"];
    assertType<
      Expect<
        Equal<
          Result,
          "🛑 ERROR: The key 'length' must be wrapped in angle brackets (e.g., '<length>')"
        >
      >
    >();
  });

  test("invalid DSL atom produces plain error string", () => {
    type Result = ValidatedCSSSyntaxConfig<{ "<length>": "number | foobar" }>["<length>"];
    assertType<
      Expect<
        Equal<
          Result,
          "🛑 Invalid atom 'foobar' — expected a primitive, 'quoted literal', or `template literal`"
        >
      >
    >();
  });
});
