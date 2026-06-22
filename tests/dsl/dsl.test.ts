import test, { describe } from "node:test";
import { dslString, parseValueAgainstDSL, type DSLInfer } from "@/dsl/index.ts";
import { assertType, type Equal } from "../type-utils.ts";
import assert from "node:assert";

describe("Primitive types", () => {
  describe("string", () => {
    test("Type Inference", () => {
      assertType<Equal<DSLInfer<"string">, string>>();
    });
    test("Runtime Validation", () => {
      dslString("string");
    });
    test("Parse", () => {
      assert.strictEqual(parseValueAgainstDSL("string", ""), "");
    });
  });

  describe("number", () => {
    test("Type Inference", () => {
      assertType<Equal<DSLInfer<"number">, number>>();
    });
    test("Runtime Validation", () => {
      dslString("number");
    });
    test("Parse", () => {
      assert.strictEqual(parseValueAgainstDSL("number", 0), 0);
    });
  });

  describe("bigint", () => {
    test("Type Inference", () => {
      assertType<Equal<DSLInfer<"bigint">, bigint>>();
    });
    test("Runtime Validation", () => {
      dslString("bigint");
    });
    test("Parse", () => {
      assert.strictEqual(
        parseValueAgainstDSL("bigint", BigInt("1")),
        BigInt("1"),
      );
    });
  });

  describe("boolean", () => {
    test("Type Inference", () => {
      assertType<Equal<DSLInfer<"boolean">, boolean>>();
    });
    test("Runtime Validation", () => {
      dslString("boolean");
    });
    test("Parse", () => {
      assert.strictEqual(parseValueAgainstDSL("boolean", true), true);
      assert.strictEqual(parseValueAgainstDSL("boolean", false), false);
    });
  });

  describe("undefined", () => {
    test("Type Inference", () => {
      assertType<Equal<DSLInfer<"undefined">, undefined>>();
    });
    test("Runtime Validation", () => {
      dslString("undefined");
    });
    test("Parse", () => {
      assert.strictEqual(
        parseValueAgainstDSL("undefined", undefined),
        undefined,
      );
    });
  });

  test("returns the same reference for objects-free primitives", () => {
    assert.strictEqual(parseValueAgainstDSL("string", "hello"), "hello");
    assert.strictEqual(parseValueAgainstDSL("number", 42), 42);
    assert.strictEqual(parseValueAgainstDSL("bigint", 7n), 7n);
  });
});

describe("Literals", () => {
  describe("Literal Boolean", () => {
    describe("true", () => {
      test("Type Inference", () => {
        assertType<Equal<DSLInfer<"true">, true>>();
      });
      test("Runtime Validation", () => {
        dslString("true");
      });
      test("Parse", () => {
        assert.strictEqual(parseValueAgainstDSL("true", true), true);
      });
    });

    describe("false", () => {
      test("Type Inference", () => {
        assertType<Equal<DSLInfer<"false">, false>>();
      });
      test("Runtime Validation", () => {
        dslString("false");
      });
      test("Parse", () => {
        assert.strictEqual(parseValueAgainstDSL("false", false), false);
      });
    });
  });

  describe("Literal Number", () => {
    describe("0, 1", () => {
      test("Type Inference", () => {
        assertType<Equal<DSLInfer<"0">, 0>>();
        assertType<Equal<DSLInfer<"1">, 1>>();
      });
      test("Runtime Validation", () => {
        dslString("0");
        dslString("1");
      });
      test("Parse", () => {
        assert.strictEqual(parseValueAgainstDSL("0", 0), 0);
        assert.strictEqual(parseValueAgainstDSL("1", 1), 1);
      });
    });
  });

  describe("Literal Strings", () => {
    describe("Single Quote ('')", () => {
      test("Type Inference", () => {
        assertType<Equal<DSLInfer<"''">, "">>();
        assertType<Equal<DSLInfer<"'a'">, "a">>();
      });
      test("Runtime Validation", () => {
        dslString("''");
        dslString("'a'");
      });
      test("Parse", () => {
        assert.strictEqual(parseValueAgainstDSL("''", ""), "");
        assert.strictEqual(parseValueAgainstDSL("'a'", "a"), "a");
      });
    });

    describe('Double Quote ("")', () => {
      test("Type Inference", () => {
        assertType<Equal<DSLInfer<'""'>, "">>();
        assertType<Equal<DSLInfer<'"a"'>, "a">>();
      });
      test("Runtime Validation", () => {
        dslString('""');
        dslString('"a"');
      });
      test("Parse", () => {
        assert.strictEqual(parseValueAgainstDSL('""', ""), "");
        assert.strictEqual(parseValueAgainstDSL('"a"', "a"), "a");
      });
    });

    describe("Template Literal (``)", () => {
      test("Type Inference", () => {
        assertType<Equal<DSLInfer<"``">, ``>>();
        assertType<Equal<DSLInfer<"`a`">, "a">>();
      });
      test("Runtime Validation", () => {
        dslString("``");
        dslString("`a`");
      });
      test("Parse", () => {
        assert.strictEqual(parseValueAgainstDSL("``", ``), ``);
        assert.strictEqual(parseValueAgainstDSL("`a`", "a"), "a");
      });
    });
  });
});

describe("Literal String with pipe - '|' \"|\" `|` [EDGE CASE]", () => {
  describe("Single Quote ('|')", () => {
    test("Type Inference", () => {
      assertType<Equal<DSLInfer<"'|'">, "|">>();
    });
    test("Runtime Validation", () => {
      dslString("'|'");
    });
    test("Parse", () => {
      assert.strictEqual(parseValueAgainstDSL("'|'", "|"), "|");
    });
  });

  describe('Double Quote ("|")', () => {
    test("Type Inference", () => {
      assertType<Equal<DSLInfer<'"|"'>, "|">>();
    });
    test("Runtime Validation", () => {
      dslString('"|"');
    });
    test("Parse", () => {
      assert.strictEqual(parseValueAgainstDSL('"|"', "|"), "|");
    });
  });

  describe("Template Literal (`|`)", () => {
    test("Type Inference", () => {
      assertType<Equal<DSLInfer<"`|`">, `|`>>();
    });
    test("Runtime Validation", () => {
      dslString("`|`");
    });
    test("Parse", () => {
      assert.strictEqual(parseValueAgainstDSL("`|`", `|`), `|`);
    });
  });
});

describe("Union Type (|)", () => {
  describe("Union Type with Primitives - string | number | bigint | boolean | undefined", () => {
    test("Type Inference", () => {
      assertType<
        Equal<
          DSLInfer<"string | number | bigint | boolean | undefined">,
          string | number | bigint | boolean | undefined
        >
      >();
    });
    test("Runtime Validation", () => {
      dslString("string | number | bigint | boolean | undefined");
    });
    test("Parse", () => {
      assert.strictEqual(
        parseValueAgainstDSL(
          "string | number | bigint | boolean | undefined",
          "",
        ),
        "",
      );

      assert.strictEqual(
        parseValueAgainstDSL(
          "string | number | bigint | boolean | undefined",
          0,
        ),
        0,
      );

      assert.strictEqual(
        parseValueAgainstDSL(
          "string | number | bigint | boolean | undefined",
          BigInt("0"),
        ),
        BigInt("0"),
      );

      assert.strictEqual(
        parseValueAgainstDSL(
          "string | number | bigint | boolean | undefined",
          true,
        ),
        true,
      );

      assert.strictEqual(
        parseValueAgainstDSL(
          "string | number | bigint | boolean | undefined",
          undefined,
        ),
        undefined,
      );
    });
  });

  describe("Union Type with Literal Value", () => {
    describe("Boolean Literal", () => {
      test("Type Inference", () => {
        assertType<Equal<DSLInfer<"true | false">, true | false>>();
      });
      test("Runtime Validation", () => {
        dslString("true | false");
      });
      test("Parse", () => {
        assert.strictEqual(parseValueAgainstDSL("true | false", true), true);
        assert.strictEqual(parseValueAgainstDSL("true | false", false), false);
      });
    });

    describe("Number Literal", () => {
      test("Type Inference", () => {
        assertType<Equal<DSLInfer<"0 | 1">, 0 | 1>>();
      });
      test("Runtime Validation", () => {
        dslString("0 | 1");
      });
      test("Parse", () => {
        assert.strictEqual(parseValueAgainstDSL("0 | 1", 0), 0);
        assert.strictEqual(parseValueAgainstDSL("0 | 1", 1), 1);
      });
    });

    describe("String Literal", () => {
      test("Type Inference", () => {
        assertType<Equal<DSLInfer<"'foo' | 'bar'">, "foo" | "bar">>();
      });
      test("Runtime Validation", () => {
        dslString("'foo' | 'bar'");
      });
      test("Parse", () => {
        assert.strictEqual(parseValueAgainstDSL("'foo' | 'bar'", "bar"), "bar");
        assert.strictEqual(parseValueAgainstDSL("'foo' | 'bar'", "bar"), "bar");
      });
    });
  });

  describe("Complex union - true | 0 | 'a' | `b` | undefined | \"c\"", () => {
    test("Type Inference", () => {
      assertType<
        Equal<
          DSLInfer<"true | 0 | 'a' | `b` | undefined | \"c\"">,
          true | 0 | "a" | `b` | undefined | "c"
        >
      >();
    });
    test("Runtime Validation", () => {
      dslString("true | 0 | 'a' | `b` | undefined | \"c\"");
    });
    test("Parse", () => {
      assert.strictEqual(
        parseValueAgainstDSL("true | 0 | 'a' | `b` | undefined | \"c\"", true),
        true,
      );
      assert.strictEqual(
        parseValueAgainstDSL("true | 0 | 'a' | `b` | undefined | \"c\"", 0),
        0,
      );
      assert.strictEqual(
        parseValueAgainstDSL("true | 0 | 'a' | `b` | undefined | \"c\"", "a"),
        "a",
      );
      assert.strictEqual(
        parseValueAgainstDSL("true | 0 | 'a' | `b` | undefined | \"c\"", "b"),
        "b",
      );
      assert.strictEqual(
        parseValueAgainstDSL(
          "true | 0 | 'a' | `b` | undefined | \"c\"",
          undefined,
        ),
        undefined,
      );
      assert.strictEqual(
        parseValueAgainstDSL("true | 0 | 'a' | `b` | undefined | \"c\"", "c"),
        "c",
      );
    });
  });
});

describe("Template literal with pipe - `${ }`", () => {
  describe("Primitive types", () => {
    test("Type Inference", () => {
      assertType<
        Equal<
          DSLInfer<"`${string | number | bigint | boolean | undefined}`">,
          `${string | number | bigint | boolean | undefined}`
        >
      >();
    });
    test("Runtime Validation", () => {
      dslString("`${string | number | bigint | boolean | undefined}`");
    });
    test("Parse", () => {
      assert.strictEqual(
        parseValueAgainstDSL(
          "`${string | number | bigint | boolean | undefined}`",
          "",
        ),
        "",
      );
      assert.strictEqual(
        parseValueAgainstDSL(
          "`${string | number | bigint | boolean | undefined}`",
          "1.1",
        ),
        "1.1",
      );
      assert.strictEqual(
        parseValueAgainstDSL(
          "`${string | number | bigint | boolean | undefined}`",
          "1",
        ),
        "1",
      );
      assert.strictEqual(
        parseValueAgainstDSL(
          "`${string | number | bigint | boolean | undefined}`",
          "true",
        ),
        "true",
      );
      assert.strictEqual(
        parseValueAgainstDSL(
          "`${string | number | bigint | boolean | undefined}`",
          "undefined",
        ),
        "undefined",
      );
    });
  });

  describe(`Literals - true, 0, "foo", 'bar'`, () => {
    test("Type Inference", () => {
      assertType<
        Equal<
          DSLInfer<"`${true | 0 | \"foo\" | 'bar'}`">,
          `${true | 0 | "foo" | "bar"}`
        >
      >();
    });
    test("Runtime Validation", () => {
      dslString("`${true | 0 | \"foo\" | 'bar'}`");
    });
    test("Parse", () => {
      assert.strictEqual(
        parseValueAgainstDSL("`${true | 0 | \"foo\" | 'bar'}`", "true"),
        "true",
      );
      assert.strictEqual(
        parseValueAgainstDSL("`${true | 0 | \"foo\" | 'bar'}`", "0"),
        "0",
      );
      assert.strictEqual(
        parseValueAgainstDSL("`${true | 0 | \"foo\" | 'bar'}`", "foo"),
        "foo",
      );
      assert.strictEqual(
        parseValueAgainstDSL("`${true | 0 | \"foo\" | 'bar'}`", "bar"),
        "bar",
      );
    });
  });

  describe("Complex Multi `before${'a' | 'b'}mid${1 | 2}end`", () => {
    test("Type Inference", () => {
      assertType<
        Equal<
          DSLInfer<'`before${"a" | "b"}mid${1 | 2}end`'>,
          `before${"a" | "b"}mid${1 | 2}end`
        >
      >();
    });
    test("Runtime Validation", () => {
      dslString('`before${"a" | "b"}mid${1 | 2}end`');
    });
    test("Parse", () => {
      assert.strictEqual(
        parseValueAgainstDSL(
          '`before${"a" | "b"}mid${1 | 2}end`',
          "beforeamid1end",
        ),
        "beforeamid1end",
      );
      assert.strictEqual(
        parseValueAgainstDSL(
          '`before${"a" | "b"}mid${1 | 2}end`',
          "beforebmid1end",
        ),
        "beforebmid1end",
      );
      assert.strictEqual(
        parseValueAgainstDSL(
          '`before${"a" | "b"}mid${1 | 2}end`',
          "beforeamid2end",
        ),
        "beforeamid2end",
      );
      assert.strictEqual(
        parseValueAgainstDSL(
          '`before${"a" | "b"}mid${1 | 2}end`',
          "beforebmid2end",
        ),
        "beforebmid2end",
      );
    });
  });
});

describe("Error handling", () => {
  describe("type mismatches", () => {
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

  describe("malformed DSL", () => {
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

  describe("error messages", () => {
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
});
