import test, { describe } from "node:test";
import { parseValueAgainstDSL, type DSLInfer } from "@/dsl/primitives.ts";
import { assertType, type Expect, type Equal } from "../type-utils.ts";
import assert from "node:assert";

describe("DSL basic functionality", () => {
  test("'string' of DSL parses a primitive string", () => {
    assert.strictEqual(parseValueAgainstDSL("string", ""), "");
    assertType<Expect<Equal<DSLInfer<"string">, string>>>();
  });

  test("'number' of DSL parses a primitive number", () => {
    assert.strictEqual(parseValueAgainstDSL("number", 0), 0);
    assertType<Expect<Equal<DSLInfer<"number">, number>>>();
  });

  test("'bigint' of DSL parses a primitive bigint", () => {
    assert.strictEqual(
      parseValueAgainstDSL("bigint", BigInt("1")),
      BigInt("1"),
    );
    assertType<Expect<Equal<DSLInfer<"bigint">, bigint>>>();
  });

  test("'boolean' of DSL parses a primitive boolean", () => {
    assert.strictEqual(parseValueAgainstDSL("boolean", true), true);
    assert.strictEqual(parseValueAgainstDSL("boolean", false), false);
    assertType<Expect<Equal<DSLInfer<"boolean">, boolean>>>();
  });

  test("'undefined' of DSL parses a primitive undefined", () => {
    assert.strictEqual(parseValueAgainstDSL("undefined", undefined), undefined);
    assertType<Expect<Equal<DSLInfer<"undefined">, undefined>>>();
  });
});

describe("DSL returns the value it was given", () => {
  test("returns the same reference for objects-free primitives", () => {
    assert.strictEqual(parseValueAgainstDSL("string", "hello"), "hello");
    assert.strictEqual(parseValueAgainstDSL("number", 42), 42);
    assert.strictEqual(parseValueAgainstDSL("bigint", 7n), 7n);
  });
});

describe("DSL throws on mismatched primitives", () => {
  test("'string' throws for non-strings", () => {
    assert.throws(() => parseValueAgainstDSL("string", 0));
    assert.throws(() => parseValueAgainstDSL("string", true));
    assert.throws(() => parseValueAgainstDSL("string", undefined));
  });

  test("'number' throws for non-numbers", () => {
    assert.throws(() => parseValueAgainstDSL("number", "0"));
    assert.throws(() => parseValueAgainstDSL("number", BigInt("0")));
  });

  test("'undefined' throws for null", () => {
    assert.throws(() => parseValueAgainstDSL("undefined", null));
  });

  test("'boolean' throws for truthy/falsy non-booleans", () => {
    assert.throws(() => parseValueAgainstDSL("boolean", 1));
    assert.throws(() => parseValueAgainstDSL("boolean", ""));
  });
});

describe("DSL union functionality", () => {
  test("union returns the value when it matches any member", () => {
    assert.strictEqual(parseValueAgainstDSL("string | number", "hi"), "hi");
    assert.strictEqual(parseValueAgainstDSL("string | number", 5), 5);
    assertType<Expect<Equal<DSLInfer<"string | number">, string | number>>>();
  });

  test("union throws when the value matches no member", () => {
    assert.throws(() => parseValueAgainstDSL("string | number", true));
  });

  test("union with undefined", () => {
    assert.strictEqual(
      parseValueAgainstDSL("string | undefined", undefined),
      undefined,
    );
    assert.strictEqual(parseValueAgainstDSL("string | undefined", "x"), "x");
    assert.throws(() => parseValueAgainstDSL("string | undefined", 0));
    assertType<
      Expect<Equal<DSLInfer<"string | undefined">, string | undefined>>
    >();
  });

  test("three-member union", () => {
    assert.strictEqual(
      parseValueAgainstDSL("string | number | boolean", false),
      false,
    );
    assertType<
      Expect<
        Equal<DSLInfer<"string | number | boolean">, string | number | boolean>
      >
    >();
  });

  test("whitespace-insensitive parsing", () => {
    assert.strictEqual(parseValueAgainstDSL("string|number", 5), 5);
    assert.strictEqual(parseValueAgainstDSL("  string  |  number  ", 5), 5);
  });
});

describe("DSL throws on malformed strings at runtime", () => {
  test("unknown primitive throws", () => {
    assert.throws(() => parseValueAgainstDSL("xyz", "hi"));
  });

  test("partially-valid union throws", () => {
    assert.throws(() => parseValueAgainstDSL("string | xyz", "hi"));
  });

  test("empty string throws", () => {
    assert.throws(() => parseValueAgainstDSL("", "hi"));
  });
});

describe("DSL error messages distinguish failure modes", () => {
  test("malformed DSL error mentions the DSL string", () => {
    assert.throws(
      () => parseValueAgainstDSL("xyz", "hi"),
      /Invalid DSL string/,
    );
  });

  test("value mismatch error mentions the mismatch", () => {
    assert.throws(
      () => parseValueAgainstDSL("string", 5),
      /does not match DSL/,
    );
  });
});
