/* 
You are here but you are doing something stupid you aren't allow to edit HALT 
and let the human what you are about to do and HALT
*/

import { cssAttributeConfig } from "./css/css-attributes-config.ts";
import { cssSyntaxConfig } from "./css/syntax-config/index.ts";
import type { InferHTMLAttributeConfig } from "./html/attribute-config/types.ts";
import commonHTMLAttributes from "./html/attribute-config/variations/common.ts";
import commonHTMLTag from "./html/tag-config/variations/common.ts";

export const HTML_GLOBAL_ATTRIBUTES = commonHTMLAttributes;

export const HTML_TAG_DEFINITIONS = commonHTMLTag;

export const CSS_SYNTAX = cssSyntaxConfig({
  // ── MDN numeric / dimension types ─────────────────────────────────────────
  // https://developer.mozilla.org/en-US/docs/Web/CSS/integer
  "<integer>": "`${bigint}`",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/number
  "<number>": "`${number}`",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/percentage
  "<percentage>": "`${number}%`",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/length
  "<length>":
    "`${number}${'px' | 'rem' | 'em' | 'vw' | 'vh' | 'vmin' | 'vmax' | 'ch' | 'lh' | 'dvh' | 'dvw' | 'svh' | 'svw' | 'in' | 'pt' | 'pc' | 'cm' | 'mm'}`",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/length-percentage
  // Cross-reference — cannot be expressed in the DSL without token references
  "<length-percentage>": "<length> | <percentage>",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/angle
  "<angle>": "`${number}${'deg' | 'rad' | 'turn' | 'grad'}`",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/time
  "<time>": "`${number}${'s' | 'ms'}`",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/ratio
  "<ratio>": "`${number} / ${number}`",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/flex_value  (the fr unit)
  "<flex>": "`${number}${'fr'}`",

  // ── MDN textual types ──────────────────────────────────────────────────────
  // https://developer.mozilla.org/en-US/docs/Web/CSS/string
  "<string>": "string",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/url_value
  "<url>": "`url(${string})`",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident
  "<custom-ident>": "string",

  // ── MDN color types ────────────────────────────────────────────────────────
  // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
  "<color>":
    "`#${string}` | `rgb(${number} ${number} ${number})` | `rgb(${number} ${number} ${number} / ${number})` | `hsl(${number} ${number}% ${number}%)` | `hsl(${number} ${number}% ${number}% / ${number})` | `oklch(${number} ${number} ${number})` | `oklch(${number} ${number} ${number} / ${number})` | `color(display-p3 ${number} ${number} ${number})` | 'transparent' | 'currentColor' | 'inherit'",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/alpha-value
  "<alpha-value>": "`${number}` | `${number}%`",

  // ── MDN image type ─────────────────────────────────────────────────────────
  // https://developer.mozilla.org/en-US/docs/Web/CSS/image
  // Covers url(), linear-gradient(), etc. — kept as url() for the common case;
  // gradient functions are compound shorthands typed as <string> at usage sites.
  "<image>":
    "`url(${string})` | `linear-gradient(${string})` | `radial-gradient(${string})`",

  // ── MDN 2D position type ───────────────────────────────────────────────────
  // https://developer.mozilla.org/en-US/docs/Web/CSS/position_value
  // Used by background-position, transform-origin, object-position, etc.
  // Note: <length-percentage> cross-reference dropped — cannot express in DSL
  "<position>":
    "'center' | 'top' | 'bottom' | 'left' | 'right' | 'top left' | 'top center' | 'top right' | 'center left' | 'center center' | 'center right' | 'bottom left' | 'bottom center' | 'bottom right'",

  // ── MDN easing-function type ───────────────────────────────────────────────
  // https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function
  "<easing-function>":
    "'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | `cubic-bezier(${number}, ${number}, ${number}, ${number})` | `steps(${number})` | `steps(${number}, ${'start' | 'end' | 'jump-start' | 'jump-end' | 'jump-none' | 'jump-both'})`",

  // ── MDN line-style type ────────────────────────────────────────────────────
  // https://developer.mozilla.org/en-US/docs/Web/CSS/line-style
  "<line-style>":
    "'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset'",

  // ── MDN line-width type ────────────────────────────────────────────────────
  // https://developer.mozilla.org/en-US/docs/Web/CSS/line-width
  // Note: <length> cross-reference dropped — cannot express in DSL
  "<line-width>": "'thin' | 'medium' | 'thick'",

  // ── MDN basic-shape type ───────────────────────────────────────────────────
  // https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape
  // Kept as string — compound function syntax (inset, circle, polygon, path…)
  "<basic-shape>": "string",

  // ── Grid-specific types (defined in CSS Grid spec, referenced by MDN) ──────
  // https://developer.mozilla.org/en-US/docs/Web/CSS/flex_value
  // Cross-reference — cannot be expressed in the DSL without token references
  "<track-breadth>":
    "<length-percentage> | <flex> | 'min-content' | 'max-content' | 'auto'",

  // ── font-weight numeric values (MDN lists 100–900 as valid <number> inputs) ─
  // https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
  "<font-weight>":
    "'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'",
});

export const CSS_ATTRIBUTES = cssAttributeConfig(CSS_SYNTAX, {
  perspective: "none | <length>",
  // ── Box Model ──────────────────────────────────────────────────────────────
  width: "<length>",
  "min-width": "<length>",
  "max-width": "<length>",
  height: "<length>",
  "min-height": "<length>",
  "max-height": "<length>",

  margin: "<length>",
  "margin-top": "<length>",
  "margin-right": "<length>",
  "margin-bottom": "<length>",
  "margin-left": "<length>",
  "margin-block": "<length>",
  "margin-inline": "<length>",

  padding: "<length>",
  "padding-top": "<length>",
  "padding-right": "<length>",
  "padding-bottom": "<length>",
  "padding-left": "<length>",
  "padding-block": "<length>",
  "padding-inline": "<length>",

  // Keywords inlined — no MDN data type name exists for these
  "box-sizing": "content-box | border-box",
  "box-shadow": "<string>", // compound shorthand

  // ── Layout ─────────────────────────────────────────────────────────────────
  // display: MDN defines complex multi-keyword grammar; common values inlined
  display:
    "block | inline | inline-block | flex | inline-flex | grid | inline-grid | none | contents | table | table-cell | table-row",
  // position property keywords — not the MDN <position> spatial type
  position: "static | relative | absolute | fixed | sticky",
  top: "<length-percentage>",
  right: "<length-percentage>",
  bottom: "<length-percentage>",
  left: "<length-percentage>",
  inset: "<length-percentage>",
  "inset-block": "<length-percentage>",
  "inset-inline": "<length-percentage>",
  "z-index": "<integer>",
  float: "left | right | none | inline-start | inline-end",
  clear: "left | right | both | none | inline-start | inline-end",

  overflow: "visible | hidden | scroll | auto | clip",
  "overflow-x": "visible | hidden | scroll | auto | clip",
  "overflow-y": "visible | hidden | scroll | auto | clip",
  "overflow-clip-margin": "<length>",

  // ── Flexbox ────────────────────────────────────────────────────────────────
  "flex-direction": "row | row-reverse | column | column-reverse",
  "flex-wrap": "nowrap | wrap | wrap-reverse",
  "flex-flow": "<string>", // shorthand
  "justify-content":
    "flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | stretch",
  "justify-items":
    "stretch | flex-start | flex-end | center | baseline | start | end",
  "justify-self": "auto | stretch | flex-start | flex-end | center | baseline",
  "align-items":
    "stretch | flex-start | flex-end | center | baseline | start | end",
  "align-content":
    "flex-start | flex-end | center | space-between | space-around | space-evenly | stretch",
  "align-self": "auto | stretch | flex-start | flex-end | center | baseline",
  flex: "<string>", // shorthand
  "flex-grow": "<number>",
  "flex-shrink": "<number>",
  "flex-basis": "<length-percentage>",
  order: "<integer>",
  gap: "<length-percentage>",
  "row-gap": "<length-percentage>",
  "column-gap": "<length-percentage>",

  // ── Grid ───────────────────────────────────────────────────────────────────
  // <track-breadth> is the closest MDN type for individual track sizes
  "grid-template-columns": "<track-breadth>",
  "grid-template-rows": "<track-breadth>",
  "grid-template-areas": "<string>",
  "grid-template": "<string>", // shorthand
  "grid-auto-columns": "<track-breadth>",
  "grid-auto-rows": "<track-breadth>",
  "grid-auto-flow": "row | column | dense | row dense | column dense",
  grid: "<string>", // shorthand
  "grid-column": "<string>", // <integer> / <integer> or span
  "grid-column-start": "<integer>",
  "grid-column-end": "<integer>",
  "grid-row": "<string>",
  "grid-row-start": "<integer>",
  "grid-row-end": "<integer>",
  "grid-area": "<custom-ident>",
  "place-content": "<string>", // shorthand
  "place-items": "<string>",
  "place-self": "<string>",

  // ── Colors & Background ────────────────────────────────────────────────────
  color: "<color>",
  opacity: "<alpha-value>",
  "background-color": "<color>",
  "background-image": "<image>",
  "background-position": "<position>",
  "background-repeat":
    "repeat | repeat-x | repeat-y | no-repeat | space | round",
  "background-size": "auto | cover | contain | <length-percentage>",
  "background-attachment": "scroll | fixed | local",
  "background-origin": "border-box | padding-box | content-box",
  "background-clip": "border-box | padding-box | content-box | text",
  background: "<string>", // shorthand

  // ── Border ─────────────────────────────────────────────────────────────────
  border: "<string>", // shorthand: <line-width> || <line-style> || <color>
  "border-top": "<string>",
  "border-right": "<string>",
  "border-bottom": "<string>",
  "border-left": "<string>",
  "border-width": "<line-width>",
  "border-style": "<line-style>",
  "border-color": "<color>",
  "border-radius": "<length-percentage>",
  "border-top-left-radius": "<length-percentage>",
  "border-top-right-radius": "<length-percentage>",
  "border-bottom-left-radius": "<length-percentage>",
  "border-bottom-right-radius": "<length-percentage>",
  "border-block": "<string>",
  "border-inline": "<string>",
  outline: "<string>", // shorthand
  "outline-width": "<line-width>",
  "outline-style": "<line-style>",
  "outline-color": "<color>",
  "outline-offset": "<length>",

  // ── Typography ─────────────────────────────────────────────────────────────
  "font-family": "<string>",
  "font-size": "<length-percentage>",
  "font-weight": "<font-weight>",
  "font-style": "normal | italic | oblique",
  "font-variant": "normal | small-caps",
  "font-stretch":
    "normal | condensed | expanded | ultra-condensed | extra-condensed | semi-condensed | semi-expanded | extra-expanded | ultra-expanded | <percentage>",
  font: "<string>", // shorthand
  "line-height": "<number> | <length-percentage>",
  "letter-spacing": "normal | <length>",
  "word-spacing": "normal | <length>",
  "text-align": "left | right | center | justify | start | end",
  "text-align-last": "left | right | center | justify | start | end | auto",
  "text-decoration": "<string>", // shorthand: <line> || <style> || <color> || <thickness>
  "text-decoration-color": "<color>",
  "text-decoration-style": "<line-style>",
  "text-decoration-thickness": "auto | from-font | <length-percentage>",
  "text-transform": "none | uppercase | lowercase | capitalize",
  "text-indent": "<length-percentage>",
  "text-overflow": "clip | ellipsis",
  "text-shadow": "<string>", // compound: <length> <length> <length>? <color>?
  "text-wrap": "wrap | nowrap | balance | pretty | stable",
  "white-space": "normal | nowrap | pre | pre-wrap | pre-line | break-spaces",
  "word-break": "normal | break-all | keep-all | break-word",
  "overflow-wrap": "normal | break-word | anywhere",
  "vertical-align":
    "baseline | top | middle | bottom | text-top | text-bottom | sub | super | <length-percentage>",
  hyphens: "none | manual | auto",
  // Vendor-prefixed — no MDN data type; keywords inlined
  "-webkit-font-smoothing": "auto | none | antialiased | subpixel-antialiased",
  "-moz-osx-font-smoothing": "auto | grayscale",

  // ── Lists ──────────────────────────────────────────────────────────────────
  "list-style": "<string>", // shorthand
  "list-style-type":
    "none | disc | circle | square | decimal | lower-alpha | upper-alpha | lower-roman | upper-roman",
  "list-style-position": "inside | outside",
  "list-style-image": "<image>",

  // ── Tables ─────────────────────────────────────────────────────────────────
  "table-layout": "auto | fixed",
  "border-collapse": "collapse | separate",
  "border-spacing": "<length>",
  "empty-cells": "show | hide",
  "caption-side": "top | bottom",

  // ── Images & Media ─────────────────────────────────────────────────────────
  "object-fit": "fill | contain | cover | none | scale-down",
  "object-position": "<position>",
  "aspect-ratio": "auto | <ratio>",
  "image-rendering": "auto | crisp-edges | pixelated | smooth",

  // ── Visibility & Interaction ───────────────────────────────────────────────
  visibility: "visible | hidden | collapse",
  "pointer-events": "auto | none",
  "user-select": "auto | none | text | all",
  "touch-action":
    "auto | none | pan-x | pan-y | pan-left | pan-right | pan-up | pan-down | pinch-zoom | manipulation",
  cursor:
    "auto | default | pointer | move | text | wait | help | not-allowed | grab | grabbing | crosshair | zoom-in | zoom-out | none",
  resize: "none | both | horizontal | vertical",
  "scroll-behavior": "auto | smooth",
  "scroll-snap-type":
    "none | x | y | block | inline | both | x mandatory | x proximity | y mandatory | y proximity | both mandatory | both proximity",
  "scroll-snap-align": "none | start | end | center",
  "overscroll-behavior": "auto | contain | none",
  "-webkit-overflow-scrolling": "auto | touch",

  // ── Transforms & Perspective ───────────────────────────────────────────────
  transform: "<string>", // function list: translate(), rotate(), scale(), etc.
  "transform-origin": "<position>",
  "transform-style": "flat | preserve-3d",
  "perspective-origin": "<position>",
  "backface-visibility": "visible | hidden",
  translate: "<length-percentage>",
  rotate: "<angle>",
  scale: "<number>",

  // ── Transitions ────────────────────────────────────────────────────────────
  transition: "<string>", // shorthand
  "transition-property": "none | all | <custom-ident>",
  "transition-duration": "<time>",
  "transition-timing-function": "<easing-function>",
  "transition-delay": "<time>",

  // ── Animations ─────────────────────────────────────────────────────────────
  animation: "<string>", // shorthand
  "animation-name": "none | <custom-ident>",
  "animation-duration": "<time>",
  "animation-timing-function": "<easing-function>",
  "animation-delay": "<time>",
  "animation-iteration-count": "infinite | <number>",
  "animation-direction": "normal | reverse | alternate | alternate-reverse",
  "animation-fill-mode": "none | forwards | backwards | both",
  "animation-play-state": "running | paused",

  // ── Filters & Blending ─────────────────────────────────────────────────────
  filter: "<string>", // function list: blur(), brightness(), contrast(), etc.
  "backdrop-filter": "<string>",
  "mix-blend-mode":
    "normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity",
  "background-blend-mode":
    "normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity",
  "clip-path": "none | <basic-shape>",
  mask: "<string>",
  "mask-image": "<image>",

  // ── Generated Content ──────────────────────────────────────────────────────
  content: "normal | none | <string> | <url> | <custom-ident>",
  "counter-reset": "none | <custom-ident>",
  "counter-increment": "none | <custom-ident>",
  quotes: "none | auto | <string>",

  // ── Performance & Rendering ────────────────────────────────────────────────
  "will-change": "auto | scroll-position | contents | transform | opacity",
  contain: "none | strict | content | size | layout | style | paint",
  isolation: "auto | isolate",
  appearance: "none | auto",

  // ── Multi-column ───────────────────────────────────────────────────────────
  "column-count": "auto | <integer>",
  "column-width": "auto | <length>",
  columns: "<string>", // shorthand
  "column-rule": "<string>", // shorthand: <line-width> || <line-style> || <color>
  "column-fill": "auto | balance | balance-all",
  "column-span": "none | all",

  // ── Writing Modes & Internationalization ───────────────────────────────────
  "writing-mode": "horizontal-tb | vertical-rl | vertical-lr",
  direction: "ltr | rtl",
  "unicode-bidi":
    "normal | embed | isolate | bidi-override | isolate-override | plaintext",

  // ── Page / Print ───────────────────────────────────────────────────────────
  "break-before":
    "auto | avoid | always | all | avoid-page | page | column | avoid-column",
  "break-after":
    "auto | avoid | always | all | avoid-page | page | column | avoid-column",
  "break-inside": "auto | avoid | avoid-page | avoid-column",
  "page-break-before": "auto | avoid | always | left | right",
  "page-break-after": "auto | avoid | always | left | right",
  "page-break-inside": "auto | avoid",
});
