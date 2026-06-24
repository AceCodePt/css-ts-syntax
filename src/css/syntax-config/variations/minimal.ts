import { SUPPORTED_KEYWORDS } from "@/dsl/index.ts";
import { cssSyntaxConfig } from "../index.ts";

export default cssSyntaxConfig(SUPPORTED_KEYWORDS, {
  // https://developer.mozilla.org/en-US/docs/Web/CSS/integer
  "<integer>": "`${bigint}`",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/number
  "<number>": "`${number}`",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/percentage
  "<percentage>": "`${number}%`",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/length
  "<length>":
    "`${number}${'px' | 'rem' | 'em' | 'vw' | 'vh'}`",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
  "<color>":
    "`#${string}` | `rgb(${number} ${number} ${number})` | 'transparent' | 'currentColor' | 'inherit'",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/string
  "<string>": "string",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/url_value
  "<url>": "`url(${string})`",
});
