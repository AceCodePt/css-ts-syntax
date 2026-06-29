// Let's first describe the basic types

import { cssPropertiesConfig } from "./css/css-properties-config.ts";
import {
  CSS_ATTRIBUTES,
  CSS_SYNTAX,
  HTML_GLOBAL_ATTRIBUTES,
  HTML_TAG_DEFINITIONS,
} from "./consts.ts";
import { createComponent } from "./create-component.ts";
import { SUPPORTED_KEYWORDS } from "./dsl/index.ts";

export const CSS_PROPERTIES = cssPropertiesConfig(
  SUPPORTED_KEYWORDS,
  CSS_SYNTAX,
  {
    "--a": {
      syntax: "<percentage>",
      inherits: true,
      "initial-value": "1%",
    },
    "--_a": {
      syntax: "<integer>",
      inherits: false,
      "initial-value": "1",
    },
    "--background-color": {
      syntax: "<color>",
      inherits: false,
      "initial-value": "hsl(1 1% 1%)",
    },
  },
);

// index.html
// <div>
// <div> assdf <span class="bedge"/> </div>
// </div>

// index.css
// div { > span { } }

// Abstract Syntax tree
const card = createComponent(HTML_TAG_DEFINITIONS, HTML_GLOBAL_ATTRIBUTES, {
  tag: "div",
  attributes: {},
  innerHTML: {
    img: {
      tag: "img",
      attributes: { src: "" },
    },
    title: {
      tag: "li",
      innerHTML: {
        check: "check",
        asdfd: {
          tag: "input",
          attributes: { type: "hidden", value: "" },
        },
      },
    },
  },
);

// console.log(
//   renderComponent(
//     HTML_TAG_DEFINITIONS,
//     CARD_COMPONENT("", "title", "description"),
//   ),
// );
