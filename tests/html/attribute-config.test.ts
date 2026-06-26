import test, { describe } from "node:test";
import assert from "node:assert";
import { SUPPORTED_KEYWORDS, type SupportedKeywords } from "@/dsl/index.ts";
import { htmlAttributeConfig } from "@/html/attribute-config/index.ts";
import type { InferHTMLAttributesConfig } from "@/html/attribute-config/types.ts";
import { assertType, type Equal } from "../type-utils.ts";

describe("htmlAttributeConfig", () => {
  describe("Runtime Validation", () => {
    test("accepts a single string attribute", () => {
      const config = htmlAttributeConfig(SUPPORTED_KEYWORDS, {
        id: "string | undefined",
      });
      assert.deepStrictEqual(config, { id: "string | undefined" });
    });

    test("accepts multiple attributes with various DSL strings", () => {
      const config = htmlAttributeConfig(SUPPORTED_KEYWORDS, {
        id: "string | undefined",
        tabindex: "number | undefined",
        dir: "'ltr' | 'rtl' | 'auto' | undefined",
        hidden: "boolean | undefined",
      });
      assert.deepStrictEqual(config, {
        id: "string | undefined",
        tabindex: "number | undefined",
        dir: "'ltr' | 'rtl' | 'auto' | undefined",
        hidden: "boolean | undefined",
      });
    });

    test("returns the same object reference", () => {
      const input = { id: "string | undefined" } as const;
      const config = htmlAttributeConfig(SUPPORTED_KEYWORDS, input);
      assert.strictEqual(config, input);
    });

    test("accepts literal string union attributes", () => {
      const config = htmlAttributeConfig(SUPPORTED_KEYWORDS, {
        dir: "'ltr' | 'rtl' | 'auto' | undefined",
        translate: "'yes' | 'no' | undefined",
      });
      assert.deepStrictEqual(config, {
        dir: "'ltr' | 'rtl' | 'auto' | undefined",
        translate: "'yes' | 'no' | undefined",
      });
    });

    test("accepts boolean union attributes", () => {
      const config = htmlAttributeConfig(SUPPORTED_KEYWORDS, {
        draggable: "boolean | undefined",
        spellcheck: "boolean | undefined",
      });
      assert.deepStrictEqual(config, {
        draggable: "boolean | undefined",
        spellcheck: "boolean | undefined",
      });
    });

    test("accepts literal boolean union", () => {
      const config = htmlAttributeConfig(SUPPORTED_KEYWORDS, {
        contenteditable: "'plaintext-only' | boolean | undefined",
      });
      assert.deepStrictEqual(config, {
        contenteditable: "'plaintext-only' | boolean | undefined",
      });
    });
  });

  describe("Type Inference", () => {
    test("single string attribute infers correctly", () => {
      assertType<
        Equal<
          InferHTMLAttributesConfig<
            SupportedKeywords,
            { id: "string | undefined" }
          >,
          { id: string | undefined }
        >
      >();
    });

    test("number attribute infers correctly", () => {
      assertType<
        Equal<
          InferHTMLAttributesConfig<
            SupportedKeywords,
            { tabindex: "number | undefined" }
          >,
          { tabindex: number | undefined }
        >
      >();
    });

    test("string literal union infers correctly", () => {
      assertType<
        Equal<
          InferHTMLAttributesConfig<
            SupportedKeywords,
            { dir: "'ltr' | 'rtl' | 'auto' | undefined" }
          >,
          { dir: "ltr" | "rtl" | "auto" | undefined }
        >
      >();
    });

    test("boolean attribute infers correctly", () => {
      assertType<
        Equal<
          InferHTMLAttributesConfig<
            SupportedKeywords,
            { draggable: "boolean | undefined" }
          >,
          { draggable: boolean | undefined }
        >
      >();
    });

    test("mixed literal + primitive union infers correctly", () => {
      assertType<
        Equal<
          InferHTMLAttributesConfig<
            SupportedKeywords,
            { contenteditable: "'plaintext-only' | boolean | undefined" }
          >,
          { contenteditable: "plaintext-only" | boolean | undefined }
        >
      >();
    });

    test("multiple attributes infer as a mapped object", () => {
      assertType<
        Equal<
          InferHTMLAttributesConfig<
            SupportedKeywords,
            {
              id: "string | undefined";
              tabindex: "number | undefined";
              dir: "'ltr' | 'rtl' | 'auto' | undefined";
            }
          >,
          {
            id: string | undefined;
            tabindex: number | undefined;
            dir: "ltr" | "rtl" | "auto" | undefined;
          }
        >
      >();
    });
  });

  describe("Error handling", () => {
    test("throws for invalid DSL string in an attribute value", () => {
      assert.throws(
        () =>
          // @ts-expect-error
          htmlAttributeConfig(SUPPORTED_KEYWORDS, { id: "xyz" }),
        /Invalid DSL string/,
      );
    });
  });
});
