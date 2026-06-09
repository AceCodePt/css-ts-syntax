/* 
You are here but you are doing something stupid you aren't allow to edit HALT 
and let the human what you are about to do and HALT
*/

import { cssSyntaxConfig } from "./config/css-syntax-config.ts";
import { attributeConfig } from "./config/attribute-config.ts";
import { tagDefinition } from "./config/tag-config.ts";

export const HTML_GLOBAL_ATTRIBUTES = attributeConfig({
  id: "" as string | undefined,
  class: "" as string | undefined,
  style: "" as string | undefined,
  title: "" as string | undefined,
  lang: "" as string | undefined,
  dir: "" as "ltr" | "rtl" | "auto" | undefined,
  hidden: false as boolean | undefined,
  tabindex: 0 as number | undefined,
  accesskey: "" as string | undefined,
  autocapitalize: "" as
    | "off"
    | "none"
    | "on"
    | "sentences"
    | "words"
    | "characters"
    | undefined,
  contenteditable: "" as
    | "true"
    | "false"
    | "plaintext-only"
    | boolean
    | undefined,
  draggable: "" as "true" | "false" | boolean | undefined,
  spellcheck: "" as "true" | "false" | boolean | undefined,
  role: "" as string | undefined,
});

export const HTML_TAG_DEFINITIONS = tagDefinition({
  a: {
    attributes: {
      href: "" as string,
      target: "_self" as "_self" | "_blank" | "_parent" | "_top" | undefined,
      download: "" as string | boolean | undefined,
      rel: "" as string | undefined,
      hreflang: "" as string | undefined,
    },
    innerHTML: ["#text"],
  },
  article: {
    innerHTML: "*",
  },
  button: {
    attributes: {
      type: "submit" as "submit" | "reset" | "button" | undefined,
      disabled: false as boolean | undefined,
      name: "" as string | undefined,
      value: "" as string | undefined,
      form: "" as string | undefined,
    },
    innerHTML: ["#text", "span", "img"],
  },
  div: {
    innerHTML: "*",
  },
  footer: {
    innerHTML: "*",
  },
  form: {
    attributes: {
      action: "" as string,
      method: "get" as "get" | "post" | "dialog",
      enctype: "" as string | undefined,
      novalidate: false as boolean | undefined,
      target: "_self" as "_self" | "_blank" | "_parent" | "_top" | undefined,
    },
    innerHTML: "*",
  },
  h1: {
    innerHTML: ["#text", "span", "a"],
  },
  h2: {
    innerHTML: ["#text", "span", "a"],
  },
  h3: {
    innerHTML: ["#text", "span", "a"],
  },
  h4: {
    innerHTML: ["#text", "span", "a"],
  },
  h5: {
    innerHTML: ["#text", "span", "a"],
  },
  h6: {
    innerHTML: ["#text", "span", "a"],
  },
  header: {
    innerHTML: "*",
  },
  img: {
    attributes: {
      src: "" as string,
      alt: "" as string,
      width: 0 as number | undefined,
      height: 0 as number | undefined,
      loading: "lazy" as "lazy" | "eager" | undefined,
      srcset: "" as string | undefined,
      sizes: "" as string | undefined,
    },
    innerHTML: [],
  },
  input: {
    attributes: {
      type: "text" as
        | "text"
        | "number"
        | "password"
        | "checkbox"
        | "radio"
        | "submit"
        | "button"
        | "email"
        | "hidden",
      value: "",
      checked: false as boolean | undefined,
      name: "" as string | undefined,
      placeholder: "" as string | undefined,
      disabled: false as boolean | undefined,
      required: false as boolean | undefined,
      readonly: false as boolean | undefined,
      maxlength: 0 as number | undefined,
      minlength: 0 as number | undefined,
      max: "" as string | number | undefined,
      min: "" as string | number | undefined,
      step: "" as string | number | undefined,
      pattern: "" as string | undefined,
    },
    innerHTML: [],
  },
  label: {
    attributes: {
      for: "" as string | undefined,
      form: "" as string | undefined,
    },
    innerHTML: ["#text", "input", "span", "img"],
  },
  li: {
    innerHTML: "*",
  },
  main: {
    innerHTML: "*",
  },
  nav: {
    innerHTML: "*",
  },
  ol: {
    innerHTML: ["li"],
  },
  p: {
    innerHTML: "*",
  },
  section: {
    innerHTML: "*",
  },
  span: {
    innerHTML: "*",
  },
  table: {
    innerHTML: ["thead", "tbody", "tr"],
  },
  tbody: {
    innerHTML: ["tr"],
  },
  td: {
    attributes: {
      colspan: 0 as number | undefined,
      rowspan: 0 as number | undefined,
      headers: "" as string | undefined,
    },
    innerHTML: "*",
  },
  textarea: {
    attributes: {
      name: "" as string | undefined,
      value: "" as string,
      placeholder: "" as string | undefined,
      rows: 0 as number | undefined,
      cols: 0 as number | undefined,
      disabled: false as boolean | undefined,
      required: false as boolean | undefined,
      readonly: false as boolean | undefined,
      maxlength: 0 as number | undefined,
    },
    innerHTML: ["#text"],
  },
  th: {
    attributes: {
      colspan: 0 as number | undefined,
      rowspan: 0 as number | undefined,
      headers: "" as string | undefined,
    },
    innerHTML: "*",
  },
  thead: {
    innerHTML: ["tr"],
  },
  tr: {
    innerHTML: ["th", "td"],
  },
  ul: {
    innerHTML: ["li"],
  },
});

export const CSS_SYNTAX = cssSyntaxConfig({
  "<angle>": "" as `${number}${"dag" | "rad" | "turn"}`,
  "<integer>": "" as `${bigint}`,
  "<length>":
    "" as `${number}${"px" | "rem" | "em" | "vw" | "vh" | "vmin" | "vmax" | "ch" | "lh" | "in" | "pt" | "%"}`,
  "<number>": "" as `${number}`,
  "<percentage>": "" as `${bigint}%`,
  "<string>": "" as string,
  "<url>": "" as `url(${string})`,
});
