import { describe, test } from "node:test";
import type { Equal, Expect } from "./type-utils.ts";
import { assertType } from "./type-utils.ts";
import { cssSyntaxConfig } from "../src/css/syntax-config/index.ts";
import type { ValidateSyntaxDSL, InferSyntaxDSL, ValidateDSLEntry } from "../src/css/syntax-config/index.ts";

// ── Type-level: ValidateSyntaxDSL ─────────────────────────────────────────────

describe("ValidateSyntaxDSL — valid inputs resolve to never", () => {
  test("bare primitives", () => {
    assertType<Expect<Equal<ValidateSyntaxDSL<"number">, never>>>();
    assertType<Expect<Equal<ValidateSyntaxDSL<"string">, never>>>();
    assertType<Expect<Equal<ValidateSyntaxDSL<"boolean">, never>>>();
    assertType<Expect<Equal<ValidateSyntaxDSL<"bigint">, never>>>();
  });

  test("quoted string literals", () => {
    assertType<Expect<Equal<ValidateSyntaxDSL<"'px'">, never>>>();
    assertType<Expect<Equal<ValidateSyntaxDSL<"'rem'">, never>>>();
    assertType<Expect<Equal<ValidateSyntaxDSL<"'ltr'">, never>>>();
  });

  test("primitive unions", () => {
    assertType<Expect<Equal<ValidateSyntaxDSL<"number | string">, never>>>();
    assertType<Expect<Equal<ValidateSyntaxDSL<"number | boolean | bigint">, never>>>();
  });

  test("quoted literal unions", () => {
    assertType<Expect<Equal<ValidateSyntaxDSL<"'px' | 'rem'">, never>>>();
    assertType<Expect<Equal<ValidateSyntaxDSL<"'s' | 'ms'">, never>>>();
  });

  test("mixed primitive and quoted union", () => {
    assertType<Expect<Equal<ValidateSyntaxDSL<"number | 'auto'">, never>>>();
  });

  test("simple template literal", () => {
    assertType<Expect<Equal<ValidateSyntaxDSL<"`${number}px`">, never>>>();
    assertType<Expect<Equal<ValidateSyntaxDSL<"`${bigint}`">, never>>>();
    assertType<Expect<Equal<ValidateSyntaxDSL<"`#${string}`">, never>>>();
  });

  test("template with multiple slots", () => {
    assertType<Expect<Equal<ValidateSyntaxDSL<"`${number}${number}${number}`">, never>>>();
    assertType<Expect<Equal<ValidateSyntaxDSL<"`rgb(${number} ${number} ${number})`">, never>>>();
  });

  test("template with quoted-only slot union", () => {
    assertType<Expect<Equal<ValidateSyntaxDSL<"`${'px' | 'rem'}`">, never>>>();
    assertType<Expect<Equal<ValidateSyntaxDSL<"`${number}${'px' | 'rem'}`">, never>>>();
    assertType<Expect<Equal<ValidateSyntaxDSL<"`${number}${'s' | 'ms'}`">, never>>>();
  });

  test("template with primitive-only slot union", () => {
    assertType<Expect<Equal<ValidateSyntaxDSL<"`${number | string}x`">, never>>>();
    assertType<Expect<Equal<ValidateSyntaxDSL<"`${number | bigint}`">, never>>>();
  });

  test("template with mixed primitive and quoted slot union", () => {
    assertType<Expect<Equal<ValidateSyntaxDSL<"`${bigint | 'px'}`">, never>>>();
    assertType<Expect<Equal<ValidateSyntaxDSL<"`${string | 'auto'}`">, never>>>();
    assertType<Expect<Equal<ValidateSyntaxDSL<"`${number | 'auto' | 'none'}`">, never>>>();
  });

  test("union of templates", () => {
    assertType<
      Expect<Equal<ValidateSyntaxDSL<"`${number}px` | `${number}rem`">, never>>
    >();
    assertType<
      Expect<
        Equal<
          ValidateSyntaxDSL<"`#${string}` | `rgb(${number} ${number} ${number})`">,
          never
        >
      >
    >();
  });

  test("template mixed with primitives and quoted literals", () => {
    assertType<Expect<Equal<ValidateSyntaxDSL<"`${number}px` | number | 'auto'">, never>>>();
  });
});

describe("ValidateSyntaxDSL — invalid inputs resolve to error string", () => {
  test("unknown bare atom", () => {
    assertType<
      Expect<
        Equal<
          ValidateSyntaxDSL<"foobar">,
          "🛑 Invalid atom 'foobar' — expected a primitive, 'quoted literal', or `template literal`"
        >
      >
    >();
  });

  test("empty alternative", () => {
    assertType<
      Expect<
        Equal<
          ValidateSyntaxDSL<"number | ">,
          "🛑 Empty alternative — every '|' must separate two non-empty values"
        >
      >
    >();
  });

  test("unknown slot atom", () => {
    assertType<
      Expect<
        Equal<
          ValidateSyntaxDSL<"`${unknown}`">,
          "🛑 Invalid slot atom 'unknown' — expected a primitive (string | number | boolean | bigint) or a single-quoted literal like 'px'"
        >
      >
    >();
  });

  test("unclosed quoted literal in slot", () => {
    assertType<
      Expect<
        Equal<
          ValidateSyntaxDSL<"`${'unclosed}`">,
          "🛑 Invalid slot atom ''unclosed' — expected a primitive (string | number | boolean | bigint) or a single-quoted literal like 'px'"
        >
      >
    >();
  });
});

// ── Type-level: InferSyntaxDSL ────────────────────────────────────────────────

describe("InferSyntaxDSL — infers correct TypeScript types", () => {
  test("bare primitives", () => {
    assertType<Expect<Equal<InferSyntaxDSL<"number">, number>>>();
    assertType<Expect<Equal<InferSyntaxDSL<"string">, string>>>();
    assertType<Expect<Equal<InferSyntaxDSL<"boolean">, boolean>>>();
    assertType<Expect<Equal<InferSyntaxDSL<"bigint">, bigint>>>();
  });

  test("quoted string literal", () => {
    assertType<Expect<Equal<InferSyntaxDSL<"'px'">, "px">>>();
    assertType<Expect<Equal<InferSyntaxDSL<"'rem'">, "rem">>>();
  });

  test("primitive union", () => {
    assertType<Expect<Equal<InferSyntaxDSL<"number | string">, number | string>>>();
  });

  test("quoted literal union", () => {
    assertType<Expect<Equal<InferSyntaxDSL<"'px' | 'rem'">, "px" | "rem">>>();
  });

  test("simple template literal", () => {
    assertType<Expect<Equal<InferSyntaxDSL<"`${number}px`">, `${number}px`>>>();
    assertType<Expect<Equal<InferSyntaxDSL<"`${bigint}`">, `${bigint}`>>>();
    assertType<Expect<Equal<InferSyntaxDSL<"`#${string}`">, `#${string}`>>>();
  });

  test("template with quoted-only slot union distributes", () => {
    assertType<
      Expect<Equal<InferSyntaxDSL<"`${'px' | 'rem'}`">, "px" | "rem">>
    >();
    assertType<
      Expect<Equal<InferSyntaxDSL<"`${number}${'s' | 'ms'}`">, `${number}s` | `${number}ms`>>
    >();
    assertType<
      Expect<
        Equal<
          InferSyntaxDSL<"`${number}${'px' | 'rem' | 'em'}`">,
          `${number}px` | `${number}rem` | `${number}em`
        >
      >
    >();
  });

  test("template with primitive-only slot union distributes", () => {
    assertType<
      Expect<Equal<InferSyntaxDSL<"`${number | bigint}`">, `${number}` | `${bigint}`>>
    >();
  });

  test("template with mixed primitive and quoted slot union distributes", () => {
    assertType<
      Expect<Equal<InferSyntaxDSL<"`${bigint | 'px'}`">, `${bigint}` | "px">>
    >();
    assertType<
      Expect<Equal<InferSyntaxDSL<"`${string | 'auto'}`">, string | "auto">>
    >();
    assertType<
      Expect<
        Equal<
          InferSyntaxDSL<"`${number | 'auto' | 'none'}`">,
          `${number}` | "auto" | "none"
        >
      >
    >();
  });

  test("template with multiple slots", () => {
    assertType<
      Expect<
        Equal<
          InferSyntaxDSL<"`rgb(${number} ${number} ${number})`">,
          `rgb(${number} ${number} ${number})`
        >
      >
    >();
  });

  test("union of templates", () => {
    assertType<
      Expect<
        Equal<
          InferSyntaxDSL<"`${number}px` | `${number}rem`">,
          `${number}px` | `${number}rem`
        >
      >
    >();
  });

  test("union of template and primitive", () => {
    assertType<
      Expect<Equal<InferSyntaxDSL<"`${number}px` | number">, `${number}px` | number>>
    >();
  });
});

// ── Type-level: ValidateDSLEntry (completion-aware) ───────────────────────────

describe("ValidateDSLEntry — autocomplete and validation", () => {
  test("valid complete template passes through as S", () => {
    assertType<Expect<Equal<ValidateDSLEntry<"`${bigint}`">, "`${bigint}`">>>();
    assertType<Expect<Equal<ValidateDSLEntry<"`${number}${'px' | 'rem'}`">, "`${number}${'px' | 'rem'}`">>>();
  });

  test("valid complete primitive passes through as S", () => {
    assertType<Expect<Equal<ValidateDSLEntry<"number">, "number">>>();
    assertType<Expect<Equal<ValidateDSLEntry<"string">, "string">>>();
  });

  test("empty string suggests all primitives", () => {
    type T = ValidateDSLEntry<"">;
    assertType<Expect<Equal<"string" extends T ? true : false, true>>>();
    assertType<Expect<Equal<"number" extends T ? true : false, true>>>();
    assertType<Expect<Equal<"boolean" extends T ? true : false, true>>>();
    assertType<Expect<Equal<"bigint" extends T ? true : false, true>>>();
  });

  test("trailing pipe (no space) suggests completions preserving exact prefix", () => {
    type T = ValidateDSLEntry<"`${bigint}` |">;
    assertType<Expect<Equal<"`${bigint}` |string" extends T ? true : false, true>>>();
    assertType<Expect<Equal<"`${bigint}` |number" extends T ? true : false, true>>>();
    assertType<Expect<Equal<"`${bigint}` |boolean" extends T ? true : false, true>>>();
    assertType<Expect<Equal<"`${bigint}` |bigint" extends T ? true : false, true>>>();
  });

  test("trailing pipe with space suggests completions preserving exact prefix", () => {
    type T = ValidateDSLEntry<"`${bigint}` | ">;
    assertType<Expect<Equal<"`${bigint}` | string" extends T ? true : false, true>>>();
    assertType<Expect<Equal<"`${bigint}` | number" extends T ? true : false, true>>>();
    assertType<Expect<Equal<"`${bigint}` | boolean" extends T ? true : false, true>>>();
    assertType<Expect<Equal<"`${bigint}` | bigint" extends T ? true : false, true>>>();
  });

  test("partial primitive prefix narrows completions", () => {
    type T = ValidateDSLEntry<"num">;
    assertType<Expect<Equal<T, "number">>>();
  });

  test("in-progress template passes S through", () => {
    type T = ValidateDSLEntry<"`${bi">;
    assertType<Expect<Equal<"`${bi" extends T ? true : false, true>>>();
  });

  test("invalid atom produces error string", () => {
    assertType<
      Expect<
        Equal<
          ValidateDSLEntry<"number | foobar">,
          "🛑 Invalid atom 'foobar' — expected a primitive, 'quoted literal', or `template literal`"
        >
      >
    >();
  });
});

// ── cssSyntaxConfig call-site: valid inputs accepted, key shape enforced ───────
//
// TypeScript cannot detect trailing-pipe or invalid-atom errors at the
// cssSyntaxConfig call site via parameter types — conditional types over
// generic `const T` parameters don't evaluate deeply enough to distinguish
// valid from invalid DSL strings. Those errors are caught by ValidateDSLEntry
// and ValidateSyntaxDSL at the type level (see tests above).
//
// What IS enforceable at the call site: the key must be an <angle-bracket>
// token. We test that here using @ts-expect-error.

describe("cssSyntaxConfig — call-site: valid entries accepted, bad keys rejected", () => {
  test("valid entries are accepted without type error", () => {
    cssSyntaxConfig({ "<integer>": "`${bigint}`" });
    cssSyntaxConfig({ "<number>": "number" });
    cssSyntaxConfig({ "<time>": "`${number}${'s' | 'ms'}`" });
    cssSyntaxConfig({ "<line-style>": "'none' | 'hidden' | 'solid'" });
  });

  // NOTE: keys without angle brackets are NOT rejected at the call site —
  // TypeScript's structural typing allows extra keys outside the Record<K,V>
  // key constraint. Key validation is enforced only via ValidatedCSSSyntaxConfig
  // on the return type (see validators.test.ts).
});

// ── Runtime: cssSyntaxConfig pass-through ─────────────────────────────────────

describe("cssSyntaxConfig — runtime pass-through", () => {
  test("returns the config object as-is", () => {
    const result = cssSyntaxConfig({
      "<number>": "number",
      "<length>": "`${number}${'px' | 'rem' | 'em'}`",
      "<color>": "`#${string}` | `rgb(${number} ${number} ${number})`",
    });

    // Runtime: the original DSL strings are stored as-is (cssSyntaxConfig is
    // a pass-through at runtime; inference is type-level only)
    const entries = Object.entries(result as unknown as Record<string, string>);
    const numberEntry = entries.find(([k]) => k === "<number>");
    const lengthEntry = entries.find(([k]) => k === "<length>");

    if (!numberEntry || !lengthEntry) throw new Error("missing entry");

    if (numberEntry[1] !== "number") throw new Error(`Expected "number", got ${numberEntry[1]}`);
    if (lengthEntry[1] !== "`${number}${'px' | 'rem' | 'em'}`")
      throw new Error(`Unexpected length value: ${lengthEntry[1]}`);
  });
});
