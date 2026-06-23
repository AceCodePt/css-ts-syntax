import { test, describe } from "node:test";
import assert from "node:assert";
import { renderComponent } from "../src/render/render-component.ts";
import { htmlTagConfig } from "../src/html/tag-config/index.ts";
import { htmlAttributeConfig } from "../src/html/attribute-config/html-attribute-config.ts";
import { createComponent } from "../src/create-component.ts";

// ==========================================
// 1. SETUP MINIMAL MOCK SCHEMA CONFIGS
// ==========================================
const MOCK_SHARED_ATTRIBUTES = htmlAttributeConfig({
  id: "string",
  class: "string",
});

const MOCK_TAG_ATTRIBUTES = htmlTagConfig({
  div: { innerHTML: "*" },
  p: { innerHTML: ["#text"] },
  img: {
    attributes: { src: "string", alt: "string" },
    innerHTML: [],
  },
  ul: { innerHTML: ["li"] },
  li: { innerHTML: ["#text"] },
});

// ==========================================
// 2. RUNTIME RENDER TEST SUITE
// ==========================================
describe("Component Renderer", () => {
  test("should render a basic element with text content", () => {
    const node = createComponent(MOCK_TAG_ATTRIBUTES, MOCK_SHARED_ATTRIBUTES, {
      tag: "p",
      innerHTML: ["Hello World"],
    } as const);

    const result = renderComponent(MOCK_TAG_ATTRIBUTES, node);
    assert.strictEqual(result, "<p>Hello World</p>");
  });

  test("should serialize standard string and number attributes", () => {
    const node = createComponent(MOCK_TAG_ATTRIBUTES, MOCK_SHARED_ATTRIBUTES, {
      tag: "div",
      id: "main-card",
      class: "container",
      innerHTML: ["Content"],
    } as const);

    const result = renderComponent(MOCK_TAG_ATTRIBUTES, node);
    assert.strictEqual(
      result,
      '<div id="main-card" class="container">Content</div>',
    );
  });

  test("should handle boolean attributes correctly (handling true, false, and undefined)", () => {
    const localTags = htmlTagConfig({
      button: {
        attributes: {
          disabled: "boolean",
          autofocus: "boolean",
          ariaLive: "string | undefined",
        },
        innerHTML: ["#text"],
      },
    });

    const node = createComponent(localTags, MOCK_SHARED_ATTRIBUTES, {
      tag: "button",
      disabled: true,
      autofocus: false,
      innerHTML: ["Submit"],
    } as const);

    const result = renderComponent(localTags, node);
    assert.strictEqual(result, "<button disabled>Submit</button>");
  });

  test("should dynamically render void elements without a closing tag based on schema", () => {
    const node = createComponent(MOCK_TAG_ATTRIBUTES, MOCK_SHARED_ATTRIBUTES, {
      tag: "img",
      src: "avatar.png",
      alt: "User profile",
    } as const);

    const result = renderComponent(MOCK_TAG_ATTRIBUTES, node);
    assert.strictEqual(result, '<img src="avatar.png" alt="User profile">');
  });

  test("should recursively render nested dictionary children hierarchies", () => {
    const node = createComponent(MOCK_TAG_ATTRIBUTES, MOCK_SHARED_ATTRIBUTES, {
      tag: "ul",
      id: "list-group",
      innerHTML: [
        {
          item1: {
            tag: "li",
            innerHTML: ["First Item"],
          },
        },
        {
          item2: {
            tag: "li",
            innerHTML: ["Second Item"],
          },
        },
      ],
    });

    const result = renderComponent(MOCK_TAG_ATTRIBUTES, node);
    assert.strictEqual(
      result,
      '<ul id="list-group"><li>First Item</li><li>Second Item</li></ul>',
    );
  });

  test("should bypass wrapper keys inside ComponentDictionaries cleanly", () => {
    const node = createComponent(MOCK_TAG_ATTRIBUTES, MOCK_SHARED_ATTRIBUTES, {
      tag: "div",
      innerHTML: [
        {
          "arbitrary-wrapper-key-here": {
            tag: "p",
            innerHTML: ["Deep Text"],
          },
        },
      ],
    } as const);

    const result = renderComponent(MOCK_TAG_ATTRIBUTES, node);
    assert.strictEqual(result, "<div><p>Deep Text</p></div>");
  });
});
