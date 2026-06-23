import { describe, test } from "node:test";
import assert from "node:assert";
import type { Equal, Expect } from "./type-utils.ts";
import { assertType } from "./type-utils.ts";
import { htmlAttributeConfig } from "../src/html/attribute-config/html-attribute-config.ts";
import type { HTMLValidate } from "../src/html/attribute-config/html-attribute-config.ts";

// ─────────────────────────────────────────────────────────────────────────────
// htmlAttributeConfig alignment
//
// For every invalid input we verify:
//   1. The type-level validator produces the exact error string literal.
//   2. The runtime validator throws with a message containing the same text.
//
// For every valid input we verify:
//   1. The type-level validator passes through the string unchanged (S extends HTMLValidate<S>).
//   2. The runtime validator does not throw.
// ─────────────────────────────────────────────────────────────────────────────

describe("htmlAttributeConfig — compile-time and runtime alignment", () => {

  // ── Valid inputs ─────────────────────────────────────────────────────────────

  describe("valid inputs: no type error and no runtime throw", () => {
    test("reserved keyword: string", () => {
      assertType<Expect<Equal<HTMLValidate<"string">, "string">>>();
      assert.doesNotThrow(() => htmlAttributeConfig({ x: "string" }));
    });

    test("reserved keyword: number", () => {
      assertType<Expect<Equal<HTMLValidate<"number">, "number">>>();
      assert.doesNotThrow(() => htmlAttributeConfig({ x: "number" }));
    });

    test("reserved keyword: boolean", () => {
      assertType<Expect<Equal<HTMLValidate<"boolean">, "boolean">>>();
      assert.doesNotThrow(() => htmlAttributeConfig({ x: "boolean" }));
    });

    test("reserved keyword: undefined", () => {
      assertType<Expect<Equal<HTMLValidate<"undefined">, "undefined">>>();
      assert.doesNotThrow(() => htmlAttributeConfig({ x: "undefined" }));
    });

    test("quoted string literal", () => {
      assertType<Expect<Equal<HTMLValidate<"'ltr'">, "'ltr'">>>();
      assert.doesNotThrow(() => htmlAttributeConfig({ x: "'ltr'" }));
    });

    test("union of keywords", () => {
      assertType<Expect<Equal<HTMLValidate<"string | undefined">, "string | undefined">>>();
      assert.doesNotThrow(() => htmlAttributeConfig({ x: "string | undefined" }));
    });

    test("union of quoted literals and keyword", () => {
      assertType<
        Expect<
          Equal<
            HTMLValidate<"'ltr' | 'rtl' | 'auto' | undefined">,
            "'ltr' | 'rtl' | 'auto' | undefined"
          >
        >
      >();
      assert.doesNotThrow(() =>
        htmlAttributeConfig({ x: "'ltr' | 'rtl' | 'auto' | undefined" }),
      );
    });
  });

  // ── Unknown keyword ───────────────────────────────────────────────────────────

  describe("unknown bare keyword: type error message matches runtime throw", () => {
    test("type-level produces exact error string", () => {
      // The type-level error is the bare message (no attribute prefix)
      type Result = HTMLValidate<"foobar">;
      assertType<Expect<Equal<Result, "🛑 Unknown keyword 'foobar' — expected a reserved keyword or quoted string">>>();
    });

    test("runtime throws with matching message", () => {
      assert.throws(
        () => htmlAttributeConfig({ x: "foobar" } as any),
        (err: unknown) => {
          assert.ok(err instanceof Error);
          assert.ok(
            err.message.includes("Unknown keyword 'foobar'"),
            `Expected message to mention unknown keyword, got: ${err.message}`,
          );
          return true;
        },
      );
    });
  });

  // ── Illegal character ─────────────────────────────────────────────────────────

  describe("illegal character: type error message matches runtime throw", () => {
    test("type-level produces exact error string for '('", () => {
      assertType<
        Expect<
          Equal<
            HTMLValidate<"str(ing">,
            "🛑 Unexpected character '(' — only bare keywords and quoted strings allowed"
          >
        >
      >();
    });

    test("runtime throws for '('", () => {
      assert.throws(
        () => htmlAttributeConfig({ x: "str(ing" } as any),
        (err: unknown) => {
          assert.ok(err instanceof Error);
          assert.ok(
            err.message.includes("Unexpected character '('"),
            `Expected message to mention illegal char, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    test("type-level produces error for ')'", () => {
      type Result = HTMLValidate<"str)ing">;
      assertType<Expect<Equal<Result extends "str)ing" ? false : true, true>>>();
    });

    test("runtime throws for all illegal chars", () => {
      for (const ch of ["(", ")", "[", "]", "{", "}"]) {
        assert.throws(
          () => htmlAttributeConfig({ x: `a${ch}b` } as any),
          (err: unknown) => {
            assert.ok(err instanceof Error);
            assert.ok(
              err.message.includes(`Unexpected character '${ch}'`),
              `Expected illegal char message for '${ch}', got: ${err.message}`,
            );
            return true;
          },
        );
      }
    });
  });

  // ── Empty alternative ─────────────────────────────────────────────────────────

  describe("empty alternative: type error message matches runtime throw", () => {
    test("type-level produces exact error string", () => {
      assertType<
        Expect<
          Equal<
            HTMLValidate<"string || undefined">,
            "🛑 Empty alternative — every '|' must separate two non-empty values"
          >
        >
      >();
    });

    test("runtime throws for double pipe", () => {
      assert.throws(
        () => htmlAttributeConfig({ x: "string || undefined" } as any),
        (err: unknown) => {
          assert.ok(err instanceof Error);
          assert.ok(
            err.message.includes("Empty alternative"),
            `Expected empty alternative message, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    test("runtime throws for trailing pipe", () => {
      assert.throws(
        () => htmlAttributeConfig({ x: "string | " } as any),
        (err: unknown) => {
          assert.ok(err instanceof Error);
          assert.ok(err.message.includes("Empty alternative"));
          return true;
        },
      );
    });

    test("runtime throws for leading pipe", () => {
      assert.throws(
        () => htmlAttributeConfig({ x: " | string" } as any),
        (err: unknown) => {
          assert.ok(err instanceof Error);
          assert.ok(err.message.includes("Empty alternative"));
          return true;
        },
      );
    });
  });

  // ── Unclosed / stray quote ────────────────────────────────────────────────────

  describe("bad quote: type error message matches runtime throw", () => {
    test("type-level produces exact error for unclosed quote", () => {
      assertType<
        Expect<
          Equal<
            HTMLValidate<"'hello">,
            "🛑 Invalid value ''hello' — unclosed or stray quote"
          >
        >
      >();
    });

    test("runtime throws for unclosed single quote", () => {
      assert.throws(
        () => htmlAttributeConfig({ x: "'hello" } as any),
        (err: unknown) => {
          assert.ok(err instanceof Error);
          assert.ok(
            err.message.includes("unclosed or stray quote"),
            `Expected bad quote message, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    test("runtime throws for stray quote mid-word", () => {
      assert.throws(
        () => htmlAttributeConfig({ x: "hel'lo" } as any),
        (err: unknown) => {
          assert.ok(err instanceof Error);
          assert.ok(err.message.includes("unclosed or stray quote"));
          return true;
        },
      );
    });
  });
});
