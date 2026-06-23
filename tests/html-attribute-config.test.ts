import { test, describe } from "node:test";
import type { Equal, Expect } from "./type-utils.ts";
import { assertType } from "./type-utils.ts";
import type { HTMLValidate } from "../src/html/attribute-config/html-attribute-config.ts";

describe("HTMLValidate type-level tests", () => {
  test("valid complete values pass through", () => {
    assertType<Expect<Equal<HTMLValidate<"string">, "string">>>();
    assertType<Expect<Equal<HTMLValidate<"undefined">, "undefined">>>();
    assertType<Expect<Equal<HTMLValidate<"string | undefined">, "string | undefined">>>();
    assertType<
      Expect<
        Equal<HTMLValidate<"'ltr' | 'rtl' | 'auto' | undefined">, "'ltr' | 'rtl' | 'auto' | undefined">
      >
    >();
  });

  test("illegal characters produce error", () => {
    assertType<
      Expect<
        Equal<
          HTMLValidate<"str(ing">,
          "🛑 Unexpected character '(' — only bare keywords and quoted strings allowed"
        >
      >
    >();
  });

  test("empty pipe parts produce error", () => {
    assertType<
      Expect<
        Equal<
          HTMLValidate<"string || undefined">,
          "🛑 Empty alternative — every '|' must separate two non-empty values"
        >
      >
    >();
  });

  test("unclosed quotes produce error", () => {
    assertType<
      Expect<
        Equal<
          HTMLValidate<"'hello">,
          "🛑 Invalid value ''hello' — unclosed or stray quote"
        >
      >
    >();
  });

  test("unknown keyword produces error", () => {
    assertType<
      Expect<
        Equal<
          HTMLValidate<"strng">,
          "🛑 Unknown keyword 'strng' — expected a reserved keyword or quoted string"
        >
      >
    >();
  });

  test("after-pipe autocomplete includes prefix-preserved options", () => {
    type T = HTMLValidate<"string | undefined | ">;
    assertType<Expect<Equal<"string | undefined | string" extends T ? true : false, true>>>();
    assertType<Expect<Equal<"string | undefined | number" extends T ? true : false, true>>>();
    assertType<Expect<Equal<"string | undefined | boolean" extends T ? true : false, true>>>();

    assertType<Expect<Equal<"string | undefined | undefined" extends T ? true : false, true>>>();
  });

  test("after-pipe autocomplete EXCLUDES bare keywords", () => {
    type T = HTMLValidate<"string | undefined | ">;
    // None of the bare reserved keywords should match T
    assertType<Expect<Equal<"string" extends T ? true : false, false>>>();
    assertType<Expect<Equal<"number" extends T ? true : false, false>>>();
    assertType<Expect<Equal<"boolean" extends T ? true : false, false>>>();
    assertType<Expect<Equal<"undefined" extends T ? true : false, false>>>();
    assertType<Expect<Equal<"true" extends T ? true : false, false>>>();
    assertType<Expect<Equal<"false" extends T ? true : false, false>>>();
  });
});
