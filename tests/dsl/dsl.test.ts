import test, { describe } from "node:test";
import {
  dslString,
  parseValueAgainstDSL,
  type DSLInfer,
} from "@/dsl/primitives.ts";
import { assertType, type Equal } from "../type-utils.ts";
import assert from "node:assert";

describe("DSL basic functionality", () => {
  test("'string' of DSL parses a primitive string", () => {
    assert.strictEqual(parseValueAgainstDSL("string", ""), "");
    dslString("string");
    assertType<Equal<DSLInfer<"string">, string>>();
  });

  test("'number' of DSL parses a primitive number", () => {
    assert.strictEqual(parseValueAgainstDSL("number", 0), 0);
    dslString("number");
    assertType<Equal<DSLInfer<"number">, number>>();
  });

  test("'bigint' of DSL parses a primitive bigint", () => {
    assert.strictEqual(
      parseValueAgainstDSL("bigint", BigInt("1")),
      BigInt("1"),
    );
    dslString("bigint");
    assertType<Equal<DSLInfer<"bigint">, bigint>>();
  });

  test("'boolean' of DSL parses a primitive boolean", () => {
    assert.strictEqual(parseValueAgainstDSL("boolean", true), true);
    assert.strictEqual(parseValueAgainstDSL("boolean", false), false);
    dslString("boolean");
    assertType<Equal<DSLInfer<"boolean">, boolean>>();
  });

  test("'undefined' of DSL parses a primitive undefined", () => {
    assert.strictEqual(parseValueAgainstDSL("undefined", undefined), undefined);
    dslString("undefined");
    assertType<Equal<DSLInfer<"undefined">, undefined>>();
  });

  test("'true' of DSL parses a literal true", () => {
    assert.strictEqual(parseValueAgainstDSL("true", true), true);
    dslString("true");
    assertType<Equal<DSLInfer<"true">, true>>();
  });

  test("'false' of DSL parses a literal false", () => {
    assert.strictEqual(parseValueAgainstDSL("false", false), false);
    dslString("false");
    assertType<Equal<DSLInfer<"false">, false>>();
  });

  test("0 of DSL parses a literal 0", () => {
    assert.strictEqual(parseValueAgainstDSL("0", 0), 0);
    dslString("0");
    assertType<Equal<DSLInfer<"0">, 0>>();
  });

  test("'' of DSL parses a literal ''", () => {
    assert.strictEqual(parseValueAgainstDSL("''", ""), "");
    dslString("''");
    assertType<Equal<DSLInfer<"''">, "">>();
  });

  test('"" of DSL parses a literal ""', () => {
    assert.strictEqual(parseValueAgainstDSL('""', ""), "");
    dslString('""');
    assertType<Equal<DSLInfer<'""'>, "">>();
  });

  test("`` of DSL parses a literal ``", () => {
    assert.strictEqual(parseValueAgainstDSL("``", ""), "");
    dslString("``");
    assertType<Equal<DSLInfer<"``">, "">>();
  });
});

describe("DSL returns the value it was given", () => {
  test("returns the same reference for objects-free primitives", () => {
    assert.strictEqual(parseValueAgainstDSL("string", "hello"), "hello");
    assert.strictEqual(parseValueAgainstDSL("number", 42), 42);
    assert.strictEqual(parseValueAgainstDSL("bigint", 7n), 7n);
  });

  test("10 of DSL parses a literal 10", () => {
    assert.strictEqual(parseValueAgainstDSL("10", 10), 10);
    dslString("10");
    assertType<Equal<DSLInfer<"10">, 10>>();
  });

  test("'a' of DSL parses a literal 'a'", () => {
    assert.strictEqual(parseValueAgainstDSL("'a'", "a"), "a");
    dslString("'a'");
    assertType<Equal<DSLInfer<"'a'">, "a">>();
  });

  test('"a" of DSL parses a literal "a"', () => {
    assert.strictEqual(parseValueAgainstDSL('"a"', "a"), "a");
    dslString('"a"');
    assertType<Equal<DSLInfer<'"a"'>, "a">>();
  });

  test("`a` of DSL parses a literal `a`", () => {
    assert.strictEqual(parseValueAgainstDSL("`a`", "a"), "a");
    dslString("`a`");
    assertType<Equal<DSLInfer<"`a`">, "a">>();
  });
});

describe("DSL throws on mismatched primitives", () => {
  test("'string' throws for non-strings", () => {
    // @ts-expect-error
    assert.throws(() => parseValueAgainstDSL("string", 0));
    // @ts-expect-error
    assert.throws(() => parseValueAgainstDSL("string", true));
    // @ts-expect-error
    assert.throws(() => parseValueAgainstDSL("string", undefined));
  });

  test("'number' throws for non-numbers", () => {
    // @ts-expect-error
    assert.throws(() => parseValueAgainstDSL("number", "0"));
    // @ts-expect-error
    assert.throws(() => parseValueAgainstDSL("number", BigInt("0")));
  });

  test("'undefined' throws for null", () => {
    // @ts-expect-error
    assert.throws(() => parseValueAgainstDSL("undefined", null));
  });

  test("'boolean' throws for truthy/falsy non-booleans", () => {
    // @ts-expect-error
    assert.throws(() => parseValueAgainstDSL("boolean", 1));
    // @ts-expect-error
    assert.throws(() => parseValueAgainstDSL("boolean", ""));
  });
});

describe("DSL union functionality", () => {
  test("union returns the value when it matches any member", () => {
    assert.strictEqual(parseValueAgainstDSL("string | number", "hi"), "hi");
    assert.strictEqual(parseValueAgainstDSL("string | number", 5), 5);
    dslString("string | number");
    assertType<Equal<DSLInfer<"string | number">, string | number>>();
  });

  test("union throws when the value matches no member", () => {
    // @ts-expect-error
    assert.throws(() => parseValueAgainstDSL("string | number", true));
  });

  test("union with undefined", () => {
    assert.strictEqual(
      parseValueAgainstDSL("string | undefined", undefined),
      undefined,
    );
    assert.strictEqual(parseValueAgainstDSL("string | undefined", "x"), "x");
    // @ts-expect-error
    assert.throws(() => parseValueAgainstDSL("string | undefined", 0));
    dslString("string | undefined");
    assertType<Equal<DSLInfer<"string | undefined">, string | undefined>>();
  });

  test("three-member union", () => {
    assert.strictEqual(
      parseValueAgainstDSL("string | number | boolean", false),
      false,
    );
    dslString("string | undefined | boolean");
    assertType<
      Equal<DSLInfer<"string | number | boolean">, string | number | boolean>
    >();
  });

  test("whitespace-sensitive parsing", () => {
    assert.strictEqual(parseValueAgainstDSL("string | number", 5), 5);
    // @ts-expect-error
    dslString("    string | undefined    ");
    // @ts-expect-error
    assert.strictEqual(parseValueAgainstDSL("  string  |  number  ", 5), 5);
  });
});

describe("DSL throws on malformed strings", () => {
  test("unknown primitive throws", () => {
    // @ts-expect-error
    dslString("xyz");
    // @ts-expect-error
    assert.throws(() => parseValueAgainstDSL("xyz", "hi"));
  });

  test("partially-valid union throws", () => {
    // @ts-expect-error
    dslString("string | xyz");
    // @ts-expect-error
    assert.throws(() => parseValueAgainstDSL("string | xyz", "hi"));
  });

  test("empty string throws", () => {
    // @ts-expect-error
    dslString("");
    // @ts-expect-error
    assert.throws(() => parseValueAgainstDSL("", "hi"));
  });
});

describe("DSL complex backtick checks", () => {
  test("backtick primitve support to string converstion `${number}`", () => {
    dslString("`${number}`");
    assert.strictEqual(parseValueAgainstDSL("`${number}`", "4"), "4");
  });
  test("", () => {});
  test("", () => {});
  test("", () => {});
});

describe("DSL error messages distinguish failure modes", () => {
  test("malformed DSL error mentions the DSL string", () => {
    assert.throws(
      // @ts-expect-error
      () => parseValueAgainstDSL("xyz", "hi"),
      /Invalid DSL string/,
    );
  });

  test("value mismatch error mentions the mismatch", () => {
    assert.throws(
      // @ts-expect-error
      () => parseValueAgainstDSL("string", 5),
      /does not match DSL/,
    );
  });
});
