import test, { describe } from "node:test";
import assert from "node:assert";
import { SUPPORTED_KEYWORDS } from "@/dsl/index.ts";
import { htmlTagConfig } from "@/html/tag-config/index.ts";

describe("htmlTagConfig", () => {
  describe("Runtime Validation", () => {
    test("accepts a tag with an empty innerHTML array", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        br: { innerHTML: [] },
      });
      assert.deepStrictEqual(config, { br: { innerHTML: [] } });
    });

    test("accepts a tag with #text in innerHTML", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        p: { innerHTML: ["#text"] },
      });
      assert.deepStrictEqual(config, { p: { innerHTML: ["#text"] } });
    });

    test("accepts a tag referencing another known tag in innerHTML", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        ul: { innerHTML: ["li"] },
        li: { innerHTML: ["#text"] },
      });
      assert.deepStrictEqual(config, {
        ul: { innerHTML: ["li"] },
        li: { innerHTML: ["#text"] },
      });
    });

    test("accepts tags with valid DSL string attributes", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        a: {
          attributes: { href: "string | undefined", target: "string | undefined" },
          innerHTML: ["#text"],
        },
      });
      assert.deepStrictEqual(config, {
        a: {
          attributes: { href: "string | undefined", target: "string | undefined" },
          innerHTML: ["#text"],
        },
      });
    });

    test("accepts multiple tags with attributes and cross-references", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        ul: {
          attributes: { id: "string | undefined" },
          innerHTML: ["li"],
        },
        li: {
          attributes: { class: "string | undefined" },
          innerHTML: ["#text"],
        },
      });
      assert.deepStrictEqual(config, {
        ul: {
          attributes: { id: "string | undefined" },
          innerHTML: ["li"],
        },
        li: {
          attributes: { class: "string | undefined" },
          innerHTML: ["#text"],
        },
      });
    });

    test("returns the same object reference", () => {
      const input = {
        span: { innerHTML: ["#text"] as ("#text")[] },
      } as const;
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, input);
      assert.strictEqual(config, input);
    });

    test("accepts a tag with literal union attribute", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        bdo: {
          attributes: { dir: "'ltr' | 'rtl' | 'auto' | undefined" },
          innerHTML: ["#text"],
        },
      });
      assert.deepStrictEqual(config, {
        bdo: {
          attributes: { dir: "'ltr' | 'rtl' | 'auto' | undefined" },
          innerHTML: ["#text"],
        },
      });
    });

    test("a tag can reference itself in innerHTML", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        div: { innerHTML: ["div"] },
      });
      assert.deepStrictEqual(config, { div: { innerHTML: ["div"] } });
    });

    test("a tag can have both #text and another tag in innerHTML", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        p: { innerHTML: ["#text", "span"] },
        span: { innerHTML: ["#text"] },
      });
      assert.deepStrictEqual(config, {
        p: { innerHTML: ["#text", "span"] },
        span: { innerHTML: ["#text"] },
      });
    });
  });

  describe("Error handling", () => {
    test("throws when innerHTML references an unknown tag", () => {
      assert.throws(() =>
        htmlTagConfig(SUPPORTED_KEYWORDS, {
          // @ts-expect-error
          div: { innerHTML: ["span"] },
        }),
      );
    });

    test("throws for invalid DSL string in an attribute value", () => {
      assert.throws(
        () =>
          htmlTagConfig(SUPPORTED_KEYWORDS, {
            // @ts-expect-error
            div: { attributes: { id: "xyz" }, innerHTML: [] },
          }),
        /Invalid DSL string/,
      );
    });
  });
});
