import { test, describe } from "node:test";
import assert from "node:assert";
import {
  validateStructureComponent,
  createComponent,
} from "../src/create-component.ts";
import { attributeConfig } from "../src/config/attribute-config.ts";
import { tagDefinition } from "../src/config/tag-config.ts";

// ==========================================
// 1. SETUP STATIC TEST SCHEMAS
// ==========================================
const MOCK_SHARED_ATTRIBUTES = attributeConfig({
  id: "",
  class: "",
});

const MOCK_TAG_ATTRIBUTES = tagDefinition({
  div: { innerHTML: "*" },
  p: { innerHTML: ["#text"] },
  img: { innerHTML: [], src: "", alt: "" },
  ul: { innerHTML: ["li"] },
  li: { innerHTML: ["#text"] },
});

// ==========================================
// 2. COMPONENT VALIDATION TEST SUITE
// ==========================================
describe("validateComponent & createComponent", () => {
  describe("Baseline Structural Checks", () => {
    test("should fail if node is null or not an object", () => {
      assert.throws(
        () =>
          validateStructureComponent(
            MOCK_TAG_ATTRIBUTES,
            MOCK_SHARED_ATTRIBUTES,
            null,
          ),
        /Validation Error: Provided node is not a valid component object/,
      );
    });

    test("should fail if tag is missing or is not a string", () => {
      assert.throws(
        () =>
          validateStructureComponent(
            MOCK_TAG_ATTRIBUTES,
            MOCK_SHARED_ATTRIBUTES,
            {
              innerHTML: "text",
            },
          ),
        /Validation Error: Component node is missing a valid string 'tag' property/,
      );
      assert.throws(
        () =>
          validateStructureComponent(
            MOCK_TAG_ATTRIBUTES,
            MOCK_SHARED_ATTRIBUTES,
            {
              tag: 123,
            },
          ),
        /Validation Error: Component node is missing a valid string 'tag' property/,
      );
    });

    test("should fail if tag is not recognized in the registry", () => {
      assert.throws(
        () =>
          validateStructureComponent(
            MOCK_TAG_ATTRIBUTES,
            MOCK_SHARED_ATTRIBUTES,
            {
              tag: "section",
            },
          ),
        /Structural Error: '<section>' is not a recognized configuration tag in your registry/,
      );
    });
  });

  describe("Attribute Validation Firewall", () => {
    test("should pass valid explicit tag attributes and optional global attributes", () => {
      assert.doesNotThrow(() => {
        createComponent(MOCK_TAG_ATTRIBUTES, MOCK_SHARED_ATTRIBUTES, {
          tag: "img",
          src: "logo.jpg",
          alt: "My Logo",
          id: "main-logo", // Global property
        } as const);
      });
    });

    test("should fail when encountering undocumented attributes", () => {
      assert.throws(
        () =>
          validateStructureComponent(
            MOCK_TAG_ATTRIBUTES,
            MOCK_SHARED_ATTRIBUTES,
            {
              tag: "p",
              href: "https://google.com", // Valid for <a>, invalid for <p>
            },
          ),
        /Attribute Error: Property 'href' is not a valid attribute for <p> or the Global configuration registry/,
      );
    });
  });

  describe("Void Element Controls", () => {
    test("should pass void elements when innerHTML is absent", () => {
      assert.doesNotThrow(() => {
        createComponent(MOCK_TAG_ATTRIBUTES, MOCK_SHARED_ATTRIBUTES, {
          tag: "img",
          src: "pic.png",
          alt: "Image text",
        } as const);
      });
    });

    test("should fail void elements if string content is passed", () => {
      assert.throws(
        () =>
          validateStructureComponent(
            MOCK_TAG_ATTRIBUTES,
            MOCK_SHARED_ATTRIBUTES,
            {
              tag: "img",
              src: "pic.png",
              alt: "Image text",
              innerHTML: ["Illegal Text Inside Void Element"],
            },
          ),
        /Validation Error: Tag '<img>' is configured as a void element and must not contain any innerHTML or children/,
      );
    });
  });

  describe("Text Content Controls", () => {
    test("should fail element with string content if it accepts text nodes", () => {
      assert.throws(() => {
        createComponent(MOCK_TAG_ATTRIBUTES, MOCK_SHARED_ATTRIBUTES, {
          tag: "p",
          innerHTML: "Clean inline content" as any,
        } as const);
      });
    });

    test("should fail element with string content if it explicitly bars text nodes", () => {
      assert.throws(
        () =>
          validateStructureComponent(
            MOCK_TAG_ATTRIBUTES,
            MOCK_SHARED_ATTRIBUTES,
            {
              tag: "ul",
              innerHTML: ["Illegal Direct Text Node Element"], // <ul> can only hold <li> blocks
            },
          ),
        /Validation Error: Tag '<ul>' innerHTML cannot contain a string without the #text/,
      );
    });
  });

  describe("Structural Hierarchy Arrays", () => {
    test("should pass valid nested configurations matching allowed child arrays", () => {
      assert.doesNotThrow(() => {
        createComponent(MOCK_TAG_ATTRIBUTES, MOCK_SHARED_ATTRIBUTES, {
          tag: "ul",
          innerHTML: [
            {
              child1: {
                tag: "li",
                innerHTML: ["Item One"],
              },
            },
          ],
        } as const);
      });
    });

    test("should catch illegal child elements placed inside structural limits", () => {
      assert.throws(
        () =>
          validateStructureComponent(
            MOCK_TAG_ATTRIBUTES,
            MOCK_SHARED_ATTRIBUTES,
            {
              tag: "ul",
              innerHTML: [
                {
                  badChild: {
                    tag: "p", // <p> is prohibited directly inside <ul> per mock configuration
                    innerHTML: ["Bad nested block"],
                  },
                },
              ],
            },
          ),
        /Structural Error: '<ul>' cannot contain a '<p>' element. Allowed elements: \[li\]/,
      );
    });

    test("should bubble up validation errors during recursive deep nested tree tracking", () => {
      assert.throws(
        () =>
          validateStructureComponent(
            MOCK_TAG_ATTRIBUTES,
            MOCK_SHARED_ATTRIBUTES,
            {
              tag: "ul",
              innerHTML: [
                {
                  item: {
                    tag: "li",
                    innerHTML: [
                      {
                        invalidGrandchild: {
                          tag: "div", // <li> only accepts text strings, not structural <div> components
                        },
                      },
                    ] as any,
                  },
                },
              ],
            },
          ),
        /Structural Error: '<li>' cannot contain a '<div>' element. Allowed elements: \[#text\]/,
      );
    });

    test("should fail on totally unparseable child dictionary nodes", () => {
      assert.throws(
        () =>
          validateStructureComponent(
            MOCK_TAG_ATTRIBUTES,
            MOCK_SHARED_ATTRIBUTES,
            {
              tag: "div",
              innerHTML: [
                {
                  brokenNode: "not-an-object-layout" as any,
                },
              ],
            },
          ),
        /Validation Error: Provided node is not a valid component object: "not-an-object-layout"/,
      );
    });
  });
});
