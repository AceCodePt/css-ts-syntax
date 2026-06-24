import test, { describe } from "node:test";
import assert from "node:assert";
import { cssAttributeConfig } from "@/css/attribute-config/index.ts";
import type { InferredCSSAttributes } from "@/css/attribute-config/index.ts";
import { assertType, type Equal } from "../type-utils.ts";

// A self-contained syntax object — no import from the syntax-config module needed.
const SYNTAX = {
  "<length>": "`${number}${'px' | 'rem' | 'em'}`",
  "<color>": "`#${string}` | 'transparent' | 'currentColor'",
  "<number>": "`${number}`",
  "<integer>": "`${bigint}`",
  "<time>": "`${number}${'s' | 'ms'}`",
  "<line-style>": "'none' | 'solid' | 'dashed' | 'dotted'",
} as const;

describe("cssAttributeConfig", () => {
  describe("Runtime Validation", () => {
    test("accepts a single token attribute", () => {
      const config = cssAttributeConfig(SYNTAX, {
        width: "<length>",
      });
      assert.deepStrictEqual(config, { width: "<length>" });
    });

    test("accepts multiple token attributes", () => {
      const config = cssAttributeConfig(SYNTAX, {
        width: "<length>",
        color: "<color>",
        opacity: "<number>",
      });
      assert.deepStrictEqual(config, {
        width: "<length>",
        color: "<color>",
        opacity: "<number>",
      });
    });

    test("accepts a union of tokens", () => {
      const config = cssAttributeConfig(SYNTAX, {
        "transition-duration": "<time>",
        "animation-duration": "<time>",
      });
      assert.deepStrictEqual(config, {
        "transition-duration": "<time>",
        "animation-duration": "<time>",
      });
    });

    test("accepts quoted literal values", () => {
      const config = cssAttributeConfig(SYNTAX, {
        display: "'block' | 'inline' | 'flex' | 'none'",
        position: "'static' | 'relative' | 'absolute'",
      });
      assert.deepStrictEqual(config, {
        display: "'block' | 'inline' | 'flex' | 'none'",
        position: "'static' | 'relative' | 'absolute'",
      });
    });

    test("accepts a mixed token + quoted literal union", () => {
      const config = cssAttributeConfig(SYNTAX, {
        "letter-spacing": "'normal' | <length>",
      });
      assert.deepStrictEqual(config, {
        "letter-spacing": "'normal' | <length>",
      });
    });

    test("accepts an empty config", () => {
      const config = cssAttributeConfig(SYNTAX, {});
      assert.deepStrictEqual(config, {});
    });

    test("returns the same object reference", () => {
      const input = { width: "<length>" } as const;
      const config = cssAttributeConfig(SYNTAX, input);
      assert.strictEqual(config, input);
    });
  });

  describe("Type Inference", () => {
    // InferredCSSAttributes uses InferDSL which maps:
    //   - a known <token> key → the raw DSL string stored for it in the syntax object
    //   - a quoted literal like "'block'" → the quoted string literal (e.g. "'block'")
    // The inferred values are DSL-string-level types, not resolved JS primitive types.
    // The result object is `readonly` because of the Simplify wrapper.

    test("single token infers the raw DSL string for that token", () => {
      assertType<
        Equal<
          InferredCSSAttributes<
            typeof SYNTAX,
            { width: "<length>" }
          >,
          { readonly width: "`${number}${'px' | 'rem' | 'em'}`" }
        >
      >();
    });

    test("pipe-separated quoted literals infer as their individual quoted string types", () => {
      assertType<
        Equal<
          InferredCSSAttributes<
            typeof SYNTAX,
            { display: "'block' | 'flex' | 'none'" }
          >,
          { readonly display: "'block'" | "'flex'" | "'none'" }
        >
      >();
    });

    test("union of a literal and a token infers as a union of their DSL strings", () => {
      assertType<
        Equal<
          InferredCSSAttributes<
            typeof SYNTAX,
            { "letter-spacing": "'normal' | <length>" }
          >,
          { readonly "letter-spacing": "'normal'" | "`${number}${'px' | 'rem' | 'em'}`" }
        >
      >();
    });

    test("union of two tokens infers as a union of their raw DSL strings", () => {
      assertType<
        Equal<
          InferredCSSAttributes<
            typeof SYNTAX,
            { tint: "<color> | <length>" }
          >,
          {
            readonly tint:
              | "`#${string}` | 'transparent' | 'currentColor'"
              | "`${number}${'px' | 'rem' | 'em'}`";
          }
        >
      >();
    });

    test("multiple attributes infer as a mapped object", () => {
      assertType<
        Equal<
          InferredCSSAttributes<
            typeof SYNTAX,
            {
              width: "<length>";
              display: "'block' | 'flex' | 'none'";
            }
          >,
          {
            readonly width: "`${number}${'px' | 'rem' | 'em'}`";
            readonly display: "'block'" | "'flex'" | "'none'";
          }
        >
      >();
    });
  });

  describe("Error handling", () => {
    test("unknown token is a type-level error (not a runtime throw)", () => {
      // cssAttributeConfig has no runtime validation for token existence;
      // the guard is enforced solely at the type level via CSSAttributeConfig.
      assert.doesNotThrow(() =>
        // @ts-expect-error
        cssAttributeConfig(SYNTAX, { width: "<unknown-token>" }),
      );
    });
  });
});
