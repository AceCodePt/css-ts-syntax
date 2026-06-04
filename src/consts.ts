import { sharedAttributeConfig } from "./config/shared-attribute-config.ts";
import { tagConfig } from "./config/tag-config.ts";

export const HTML_SHARED_ATTRIBUTES = sharedAttributeConfig({
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
  role: "" as string | undefined, // For ARIA accessibility landmarking
});

export const HTML_TAG_ATTRIBUTES = tagConfig({
  div: {
    innerHTML: "*",
  },
  section: {
    innerHTML: "*",
  },
  article: {
    innerHTML: "*",
  },
  main: {
    innerHTML: "*",
  },
  header: {
    innerHTML: "*",
  },
  footer: {
    innerHTML: "*",
  },
  nav: {
    innerHTML: "*",
  },
  p: {
    innerHTML: "*",
  },
  span: {
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
  a: {
    href: "" as string,
    target: "_self" as "_self" | "_blank" | "_parent" | "_top" | undefined,
    download: "" as string | boolean | undefined,
    rel: "" as string | undefined,
    hreflang: "" as string | undefined,
    innerHTML: [],
  },
  ul: {
    innerHTML: ["li"],
  },
  ol: {
    innerHTML: ["li"],
  },
  li: {
    innerHTML: "*",
  },
  form: {
    action: "" as string,
    method: "get" as "get" | "post" | "dialog",
    enctype: "" as string | undefined,
    novalidate: false as boolean | undefined,
    target: "_self" as "_self" | "_blank" | "_parent" | "_top" | undefined,
    innerHTML: "*",
  },
  input: {
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
    value: "" as string,
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
    innerHTML: [],
  },
  button: {
    type: "submit" as "submit" | "reset" | "button" | undefined,
    disabled: false as boolean | undefined,
    name: "" as string | undefined,
    value: "" as string | undefined,
    form: "" as string | undefined,
    innerHTML: ["#text", "span", "img"],
  },
  textarea: {
    name: "" as string | undefined,
    value: "" as string,
    placeholder: "" as string | undefined,
    rows: 0 as number | undefined,
    cols: 0 as number | undefined,
    disabled: false as boolean | undefined,
    required: false as boolean | undefined,
    readonly: false as boolean | undefined,
    maxlength: 0 as number | undefined,
    innerHTML: ["#text"],
  },
  label: {
    for: "" as string | undefined,
    form: "" as string | undefined,
    innerHTML: ["#text", "input", "span", "img"],
  },
  img: {
    src: "" as string,
    alt: "" as string,
    width: 0 as number | undefined,
    height: 0 as number | undefined,
    loading: "lazy" as "lazy" | "eager" | undefined,
    srcset: "" as string | undefined,
    sizes: "" as string | undefined,
    innerHTML: [],
  },
  table: {
    innerHTML: ["thead", "tbody", "tr"],
  },
  thead: {
    innerHTML: ["tr"],
  },
  tbody: {
    innerHTML: ["tr"],
  },
  td: {
    colspan: 0 as number | undefined,
    rowspan: 0 as number | undefined,
    headers: "" as string | undefined,
    innerHTML: "*",
  },
  th: {
    colspan: 0 as number | undefined,
    rowspan: 0 as number | undefined,
    headers: "" as string | undefined,
    innerHTML: "*",
  },
  tr: {
    innerHTML: ["th", "td"],
  },
});
