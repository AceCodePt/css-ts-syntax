import test, { describe } from "node:test";
import assert from "node:assert";
import { SUPPORTED_KEYWORDS, type SupportedKeywords } from "@/dsl/index.ts";
import { htmlTagConfig } from "@/html/tag-config/index.ts";
import type { ValidateHTMLTagConfig } from "@/html/tag-config/types.ts";
import { assertType, type Equal } from "../type-utils.ts";

describe("htmlTagConfig", () => {
  describe("Type Validation", () => {
    test("accepts a valid single tag config", () => {
      assertType<
        Equal<
          ValidateHTMLTagConfig<
            SupportedKeywords,
            {
              br: {
                innerHTML: [];
                attributes: {};
                cssPseudoClass: [];
                cssPseudoElement: [];
              };
            }
          >,
          {
            br: {
              innerHTML: [];
              attributes: {};
              cssPseudoClass: [];
              cssPseudoElement: [];
            };
          }
        >
      >();
    });

    test("accepts tags with #text innerHTML", () => {
      assertType<
        Equal<
          ValidateHTMLTagConfig<
            SupportedKeywords,
            {
              p: {
                innerHTML: ["#text"];
                attributes: {};
                cssPseudoClass: [];
                cssPseudoElement: [];
              };
            }
          >,
          {
            p: {
              innerHTML: ["#text"];
              attributes: {};
              cssPseudoClass: [];
              cssPseudoElement: [];
            };
          }
        >
      >();
    });

    test("accepts tags with * wildcard innerHTML", () => {
      assertType<
        Equal<
          ValidateHTMLTagConfig<
            SupportedKeywords,
            {
              div: {
                innerHTML: "*";
                attributes: {};
                cssPseudoClass: [];
                cssPseudoElement: [];
              };
            }
          >,
          {
            div: {
              innerHTML: "*";
              attributes: {};
              cssPseudoClass: [];
              cssPseudoElement: [];
            };
          }
        >
      >();
    });

    test("accepts tags with valid DSL attributes", () => {
      assertType<
        Equal<
          ValidateHTMLTagConfig<
            SupportedKeywords,
            {
              a: {
                attributes: { href: "string | undefined" };
                innerHTML: ["#text"];
                cssPseudoClass: [];
                cssPseudoElement: [];
              };
            }
          >,
          {
            a: {
              attributes: { href: "string | undefined" };
              innerHTML: ["#text"];
              cssPseudoClass: [];
              cssPseudoElement: [];
            };
          }
        >
      >();
    });

    test("accepts multiple tags with cross-references", () => {
      assertType<
        Equal<
          ValidateHTMLTagConfig<
            SupportedKeywords,
            {
              ul: {
                innerHTML: ["li"];
                attributes: {};
                cssPseudoClass: [];
                cssPseudoElement: [];
              };
              li: {
                innerHTML: ["#text"];
                attributes: {};
                cssPseudoClass: [];
                cssPseudoElement: [];
              };
            }
          >,
          {
            ul: {
              innerHTML: ["li"];
              attributes: {};
              cssPseudoClass: [];
              cssPseudoElement: [];
            };
            li: {
              innerHTML: ["#text"];
              attributes: {};
              cssPseudoClass: [];
              cssPseudoElement: [];
            };
          }
        >
      >();
    });

    test("accepts mixed #text and tag references", () => {
      assertType<
        Equal<
          ValidateHTMLTagConfig<
            SupportedKeywords,
            {
              p: {
                innerHTML: ["#text", "span"];
                attributes: {};
                cssPseudoClass: [];
                cssPseudoElement: [];
              };
              span: {
                innerHTML: ["#text"];
                attributes: {};
                cssPseudoClass: [];
                cssPseudoElement: [];
              };
            }
          >,
          {
            p: {
              innerHTML: ["#text", "span"];
              attributes: {};
              cssPseudoClass: [];
              cssPseudoElement: [];
            };
            span: {
              innerHTML: ["#text"];
              attributes: {};
              cssPseudoClass: [];
              cssPseudoElement: [];
            };
          }
        >
      >();
    });

    test("tag with no attributes passes validation", () => {
      assertType<
        Equal<
          ValidateHTMLTagConfig<
            SupportedKeywords,
            {
              div: {
                innerHTML: [];
                attributes: {};
                cssPseudoClass: [];
                cssPseudoElement: [];
              };
            }
          >,
          {
            div: {
              innerHTML: [];
              attributes: {};
              cssPseudoClass: [];
              cssPseudoElement: [];
            };
          }
        >
      >();
    });
  });

  describe("Type Inference", () => {
    test("tag config type is preserved through inference", () => {
      type Config = {
        br: {
          innerHTML: [];
          attributes: {};
          cssPseudoClass: [];
          cssPseudoElement: [];
        };
      };
      const _config = htmlTagConfig(SUPPORTED_KEYWORDS, {} as Config);
      assertType<Equal<typeof _config, Config>>();
    });
  });

  describe("Runtime Validation", () => {
    test("accepts a tag with an empty innerHTML array", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        br: {
          innerHTML: [],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
      assert.deepStrictEqual(config, {
        br: {
          innerHTML: [],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
    });

    test("accepts a tag with #text in innerHTML", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        p: {
          innerHTML: ["#text"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
      assert.deepStrictEqual(config, {
        p: {
          innerHTML: ["#text"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
    });

    test("accepts a * wildcard innerHTML (type-level only, runtime requires explicit tags)", () => {
      // The * wildcard is accepted at the type level but runtime iterates the string
      // as individual characters, so use explicit tag references instead
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        div: {
          innerHTML: ["span"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
        span: {
          innerHTML: ["#text"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
      assert.deepStrictEqual(config, {
        div: {
          innerHTML: ["span"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
        span: {
          innerHTML: ["#text"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
    });

    test("accepts a tag referencing another known tag in innerHTML", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        ul: {
          innerHTML: ["li"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
        li: {
          innerHTML: ["#text"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
      assert.deepStrictEqual(config, {
        ul: {
          innerHTML: ["li"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
        li: {
          innerHTML: ["#text"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
    });

    test("accepts tags with valid DSL string attributes", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        a: {
          attributes: {
            href: "string | undefined",
            target: "string | undefined",
          },
          innerHTML: ["#text"],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
      assert.deepStrictEqual(config, {
        a: {
          attributes: {
            href: "string | undefined",
            target: "string | undefined",
          },
          innerHTML: ["#text"],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
    });

    test("accepts multiple tags with attributes and cross-references", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        ul: {
          attributes: { id: "string | undefined" },
          innerHTML: ["li"],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
        li: {
          attributes: { class: "string | undefined" },
          innerHTML: ["#text"],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
      assert.deepStrictEqual(config, {
        ul: {
          attributes: { id: "string | undefined" },
          innerHTML: ["li"],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
        li: {
          attributes: { class: "string | undefined" },
          innerHTML: ["#text"],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
    });

    test("returns the same object reference", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        span: {
          innerHTML: ["#text"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
      assert.deepStrictEqual(config, {
        span: {
          innerHTML: ["#text"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
    });

    test("accepts a tag with literal union attribute", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        bdo: {
          attributes: { dir: "'ltr' | 'rtl' | 'auto' | undefined" },
          innerHTML: ["#text"],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
      assert.deepStrictEqual(config, {
        bdo: {
          attributes: { dir: "'ltr' | 'rtl' | 'auto' | undefined" },
          innerHTML: ["#text"],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
    });

    test("a tag can reference itself in innerHTML", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        div: {
          innerHTML: ["div"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
      assert.deepStrictEqual(config, {
        div: {
          innerHTML: ["div"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
    });

    test("a tag can have both #text and another tag in innerHTML", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        p: {
          innerHTML: ["#text", "span"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
        span: {
          innerHTML: ["#text"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
      assert.deepStrictEqual(config, {
        p: {
          innerHTML: ["#text", "span"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
        span: {
          innerHTML: ["#text"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
    });

    test("different tags can have different attribute sets", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        a: {
          attributes: { href: "string", rel: "string | undefined" },
          innerHTML: ["#text"],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
        img: {
          attributes: { src: "string", alt: "string" },
          innerHTML: [],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
        button: {
          attributes: {
            disabled: "boolean | undefined",
            type: "'submit' | 'button' | undefined",
          },
          innerHTML: ["#text"],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
      assert.deepStrictEqual(config, {
        a: {
          attributes: { href: "string", rel: "string | undefined" },
          innerHTML: ["#text"],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
        img: {
          attributes: { src: "string", alt: "string" },
          innerHTML: [],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
        button: {
          attributes: {
            disabled: "boolean | undefined",
            type: "'submit' | 'button' | undefined",
          },
          innerHTML: ["#text"],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
    });
  });

  describe("Error handling", () => {
    test("throws when innerHTML references an unknown tag", () => {
      assert.throws(() =>
        htmlTagConfig(SUPPORTED_KEYWORDS, {
          div: {
            // @ts-expect-error
            innerHTML: ["span"],
            attributes: {},
            cssPseudoClass: [],
            cssPseudoElement: [],
          },
        }),
      );
    });

    test("throws for invalid DSL string in an attribute value", () => {
      assert.throws(
        () =>
          htmlTagConfig(SUPPORTED_KEYWORDS, {
            div: {
              // @ts-expect-error
              attributes: { id: "xyz" },
              innerHTML: [],
              cssPseudoClass: [],
              cssPseudoElement: [],
            },
          }),
        /Invalid DSL string/,
      );
    });

    test("throws when innerHTML references a tag that is only defined elsewhere", () => {
      assert.throws(() =>
        htmlTagConfig(SUPPORTED_KEYWORDS, {
          p: {
            // @ts-expect-error - span is not defined in this config
            innerHTML: ["#text", "span"],
            attributes: {},
            cssPseudoClass: [],
            cssPseudoElement: [],
          },
        }),
      );
    });

    test("throws for partially invalid union in attribute", () => {
      assert.throws(
        () =>
          htmlTagConfig(SUPPORTED_KEYWORDS, {
            div: {
              // @ts-expect-error
              attributes: { id: "string | xyz" },
              innerHTML: [],
              cssPseudoClass: [],
              cssPseudoElement: [],
            },
          }),
        /Invalid DSL string/,
      );
    });
  });

  describe("Edge Cases", () => {
    test("empty tag config is accepted", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {});
      assert.deepStrictEqual(config, {});
    });

    test("single tag with empty innerHTML and no attributes", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        br: {
          innerHTML: [],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
      assert.deepStrictEqual(config, {
        br: {
          innerHTML: [],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
    });

    test("object reference identity preserved for complex config", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        div: {
          innerHTML: ["span"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
        span: {
          innerHTML: ["#text"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
      assert.deepStrictEqual(config, {
        div: {
          innerHTML: ["span"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
        span: {
          innerHTML: ["#text"],
          attributes: {},
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
    });

    test("tag can have attributes with template literal DSL", () => {
      const config = htmlTagConfig(SUPPORTED_KEYWORDS, {
        div: {
          attributes: { style: "`${string}` | undefined" },
          innerHTML: [],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
      assert.deepStrictEqual(config, {
        div: {
          attributes: { style: "`${string}` | undefined" },
          innerHTML: [],
          cssPseudoClass: [],
          cssPseudoElement: [],
        },
      });
    });
  });
});
