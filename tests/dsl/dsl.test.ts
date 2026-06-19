import test, { describe } from "node:test";
import { dslString, parseValueAgainstDSL, type DSLInfer } from "@/dsl/index.ts";
import { assertType, type Equal } from "../type-utils.ts";
import assert from "node:assert";

describe("Primitive types", () => {
  describe("string", () => {
    test("Type Infrence", () => {
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
    test("Type Infrence", () => {
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
    test("Type Infrence", () => {
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
    test("Type Infrence", () => {
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
    test("Type Infrence", () => {
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
      test("Type Infrence", () => {
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
      test("Type Infrence", () => {
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
      test("Type Infrence", () => {
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
      test("Type Infrence", () => {
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
      test("Type Infrence", () => {
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
      test("Type Infrence", () => {
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
    test("Type Infrence", () => {
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
    test("Type Infrence", () => {
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
    test("Type Infrence", () => {
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
    test("Type Infrence", () => {
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
      test("Type Infrence", () => {
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
      test("Type Infrence", () => {
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
      test("Type Infrence", () => {
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
    test("Type Infrence", () => {
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

describe("Quoted string literals", () => {
  describe("backticks ``", () => {
    test("`${number}${'%'}` of DSL parses a literal '1%'", () => {
      assert.strictEqual(parseValueAgainstDSL("`${number}${'%'}`", "1%"), "1%");
      dslString("`${number}${'%'}`");
      assertType<Equal<DSLInfer<"`${number}${'%'}`">, `${number}%`>>();
    });

    test("`${number}${'px' | '%'}`' of DSL parses a literal '1px'", () => {
      assert.strictEqual(
        parseValueAgainstDSL("`${number}${'px' | '%'}`", "1px"),
        "1px",
      );
      dslString("`${number}${'px' | '%'}`");
      assertType<
        Equal<DSLInfer<"`${number}${'px' | '%'}`">, `${number}${"px" | "%"}`>
      >();
    });
  });
});

describe("Union types", () => {
  test("returns the value when it matches any member", () => {
    assert.strictEqual(parseValueAgainstDSL("string | number", "hi"), "hi");
    assert.strictEqual(parseValueAgainstDSL("string | number", 5), 5);
    dslString("string | number");
    assertType<Equal<DSLInfer<"string | number">, string | number>>();
  });

  test("throws when the value matches no member", () => {
    // @ts-expect-error
    assert.throws(() => parseValueAgainstDSL("string | number", true));
  });

  test("with undefined", () => {
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
