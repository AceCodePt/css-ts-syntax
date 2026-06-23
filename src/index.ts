// Let's first describe the basic types

import { cssPropertiesConfig } from "./css/css-properties-config.ts";
import {
  CSS_SYNTAX,
  HTML_GLOBAL_ATTRIBUTES,
  HTML_TAG_DEFINITIONS,
} from "./consts.ts";
import { createComponent } from "./create-component.ts";

// const x = 1;
// const y = var(x);

// --x: 1
// --y: --x;

// const ROOT_/* DATA_TYPES = {
//   integer: "integer",
//   number: "number",
//   string: "string",
// };

// // Enum link data types
// // TBD - There are a lot and I want to concentrate on the syntax

// // Let's talk syntax operators
// const UNARY_SYNTAX_OPERATOR = [
//   "*" /* 0 or more times	*/,
//   "+" /* 1 or more times	 */,
//   "?" /* 0 or 1 time (that is optional)	 */,
//   "#" /* 1 or more times, with each occurrence separated by a comma (,) */,
//   "!" /* Group must produce at least 1 value */,
// ] as const;

// const BINARY_SYNTAX_OPERATOR = [
//   " " /* Juxtaposition - Components are mandatory and should appear in that order */,
//   " && " /* Components are mandatory but may appear in any order */,
//   " || " /* At least one of the components must be present, and they may appear in any order.	 */,
//   " | " /* Exactly one of the components must be present */,
// ] as const;

// // There are the syntax operators with their value as descriptors
// const SPECIAL_SYNTAX_OPERATORS = [
//   "[{value}]" as `[${string}]` /* Group components to bypass precedence rules */,
//   "{{value},{value}}" as `{${number},${number}}` /* At least min times, at most max times */,
// ];

// const syntax = "<string>";
// type Syntax = string;

// <h1><a href="">  </a> asdfasf</h1>
// const card = createComponent(HTML_TAG_ATTRIBUTES, HTML_SHARED_ATTRIBUTES, {
//   tag: "h1",
//   innerHTML: ["asdfasd", { link: { tag: "span" } }, "asdfs"],
// });

// console.log(renderComponent(HTML_TAG_ATTRIBUTES, card));

export const CSS_PROPERTIES = cssPropertiesConfig(CSS_SYNTAX, {
  "--a": {
    syntax: "<percentage>",
    inherits: true,
    "initial-value": "1%",
  },
  "--_asdf": {
    syntax: "<integer>",
    inherits: false,
    "initial-value": "132",
  },
});

// // LSP
// function check(str: string) {
//   return {
//     check: "",
//   };
// }

// function useCheck() {
//   return check("").check;
// }

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
});

// console.log(renderComponent(HTML_TAG_DEFINITIONS, HTML_GLOBAL_ATTRIBUTES, x));

// const CARD_COMPONENT = (imgSrc: string, title: string, description: string) => {
//   return createComponent(HTML_TAG_DEFINITIONS, HTML_GLOBAL_ATTRIBUTES, {
//     tag: "div",
//     class: "card",
//     dir: "auto",
//     innerHTML: [
//       {
//         img: {
//           tag: "img",
//           src: imgSrc,
//           alt: "Card image",
//         },
//       },
//       {
//         title: {
//           tag: "h1",
//           innerHTML: [title],
//         },
//       },
//       {
//         description: {
//           tag: "h6",
//           innerHTML: [description],
//         },
//       },
//       {
//         "call-to-action": {
//           tag: "button",
//           innerHTML: [
//             { star: { tag: "span", innerHTML: [""] } },
//             { text: { tag: "span", innerHTML: ["you will love that"] } },
//           ],
//         },
//       },
//     ],
//   });
// };

// console.log(
//   renderComponent(
//     HTML_TAG_DEFINITIONS,
//     CARD_COMPONENT("", "title", "description"),
//   ),
// );
