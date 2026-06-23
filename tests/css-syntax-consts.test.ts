import { describe, test } from "node:test";
import type { Equal, Expect } from "./type-utils.ts";
import { assertType } from "./type-utils.ts";
import { CSS_SYNTAX } from "../src/consts.ts";

// ─────────────────────────────────────────────────────────────────────────────
// These tests pin the inferred TypeScript value type of each CSS_SYNTAX entry.
//
// cssSyntaxConfig now infers types from DSL strings via InferSyntaxDSL, so
// Syntax[K] is the TypeScript type directly (e.g. `${bigint}`, not the DSL
// string "`${bigint}`").
//
// as-cast entries (<length-percentage>, <track-breadth>) pass through unchanged.
// ─────────────────────────────────────────────────────────────────────────────

type Syntax = typeof CSS_SYNTAX;

describe("CSS_SYNTAX — inferred value types", () => {

  test("<integer>", () => {
    assertType<Expect<Equal<Syntax["<integer>"], `${bigint}`>>>();
  });

  test("<number>", () => {
    assertType<Expect<Equal<Syntax["<number>"], `${number}`>>>();
  });

  test("<percentage>", () => {
    assertType<Expect<Equal<Syntax["<percentage>"], `${number}%`>>>();
  });

  test("<length>", () => {
    type Expected =
      | `${number}px` | `${number}rem` | `${number}em`
      | `${number}vw`  | `${number}vh`
      | `${number}vmin` | `${number}vmax`
      | `${number}ch`  | `${number}lh`
      | `${number}dvh` | `${number}dvw`
      | `${number}svh` | `${number}svw`
      | `${number}in`  | `${number}pt`  | `${number}pc`
      | `${number}cm`  | `${number}mm`;
    assertType<Expect<Equal<Syntax["<length>"], Expected>>>();
  });

  test("<angle>", () => {
    type Expected =
      | `${number}deg` | `${number}rad`
      | `${number}turn` | `${number}grad`;
    assertType<Expect<Equal<Syntax["<angle>"], Expected>>>();
  });

  test("<time>", () => {
    assertType<Expect<Equal<Syntax["<time>"], `${number}s` | `${number}ms`>>>();
  });

  test("<ratio>", () => {
    assertType<Expect<Equal<Syntax["<ratio>"], `${number} / ${number}`>>>();
  });

  test("<flex>", () => {
    assertType<Expect<Equal<Syntax["<flex>"], `${number}fr`>>>();
  });

  test("<string>", () => {
    assertType<Expect<Equal<Syntax["<string>"], string>>>();
  });

  test("<url>", () => {
    assertType<Expect<Equal<Syntax["<url>"], `url(${string})`>>>();
  });

  test("<custom-ident>", () => {
    assertType<Expect<Equal<Syntax["<custom-ident>"], string>>>();
  });

  test("<color>", () => {
    type Expected =
      | `#${string}`
      | `rgb(${number} ${number} ${number})`
      | `rgb(${number} ${number} ${number} / ${number})`
      | `hsl(${number} ${number}% ${number}%)`
      | `hsl(${number} ${number}% ${number}% / ${number})`
      | `oklch(${number} ${number} ${number})`
      | `oklch(${number} ${number} ${number} / ${number})`
      | `color(display-p3 ${number} ${number} ${number})`
      | "transparent" | "currentColor" | "inherit";
    assertType<Expect<Equal<Syntax["<color>"], Expected>>>();
  });

  test("<alpha-value>", () => {
    assertType<Expect<Equal<Syntax["<alpha-value>"], `${number}` | `${number}%`>>>();
  });

  test("<image>", () => {
    type Expected =
      | `url(${string})`
      | `linear-gradient(${string})`
      | `radial-gradient(${string})`;
    assertType<Expect<Equal<Syntax["<image>"], Expected>>>();
  });

  test("<position>", () => {
    type Expected =
      | "center" | "top" | "bottom" | "left" | "right"
      | "top left" | "top center" | "top right"
      | "center left" | "center center" | "center right"
      | "bottom left" | "bottom center" | "bottom right";
    assertType<Expect<Equal<Syntax["<position>"], Expected>>>();
  });

  test("<easing-function>", () => {
    type Expected =
      | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear"
      | `cubic-bezier(${number}, ${number}, ${number}, ${number})`
      | `steps(${number})`
      | `steps(${number}, ${"start" | "end" | "jump-start" | "jump-end" | "jump-none" | "jump-both"})`;
    assertType<Expect<Equal<Syntax["<easing-function>"], Expected>>>();
  });

  test("<line-style>", () => {
    type Expected =
      | "none" | "hidden" | "dotted" | "dashed" | "solid"
      | "double" | "groove" | "ridge" | "inset" | "outset";
    assertType<Expect<Equal<Syntax["<line-style>"], Expected>>>();
  });

  test("<line-width>", () => {
    assertType<Expect<Equal<Syntax["<line-width>"], "thin" | "medium" | "thick">>>();
  });

  test("<basic-shape>", () => {
    assertType<Expect<Equal<Syntax["<basic-shape>"], string>>>();
  });

  test("<font-weight>", () => {
    type Expected =
      | "normal" | "bold" | "bolder" | "lighter"
      | "100" | "200" | "300" | "400" | "500"
      | "600" | "700" | "800" | "900";
    assertType<Expect<Equal<Syntax["<font-weight>"], Expected>>>();
  });

  test("<length-percentage> as-cast passes through unchanged", () => {
    assertType<Expect<Equal<Syntax["<length-percentage>"], "<length>" | "<percentage>">>>();
  });

  test("<track-breadth> as-cast passes through unchanged", () => {
    type Expected = "<length-percentage>" | "<flex>" | "min-content" | "max-content" | "auto";
    assertType<Expect<Equal<Syntax["<track-breadth>"], Expected>>>();
  });
});
