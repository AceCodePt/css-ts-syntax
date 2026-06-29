# Tasks

## DSL

- [x] **Primitives** - `string`, `number`, `bigint`, `boolean`, `undefined`
  - [x] Type Validation
  - [x] Type Inference
  - [x] Runtime Validation
  - [x] Parse
  - [x] Test

- [x] **Literals** - `true`, `false`
  - [x] Type Validation
  - [x] Type Inference
  - [x] Runtime Validation
  - [x] Parse
  - [x] Test

- [x] **Literal Numbers** - `0`, `1`, ...
  - [x] Type Validation
  - [x] Type Inference
  - [x] Runtime Validation
  - [x] Parse
  - [x] Test

- [x] **Literal Strings** - `""`, `''`, ` `` `
  - [x] Type Validation
  - [x] Type Inference
  - [x] Runtime Validation
  - [x] Parse
  - [x] Test

- [x] **Literal String with pipe** - `'|'`, `"|"`, `` `|` `` *(edge case)*
  - [x] Type Validation
  - [x] Type Inference
  - [x] Runtime Validation
  - [x] Parse
  - [x] Test


- [x] **Union Type** - `|`
  - [x] With Primitives - `string | number | bigint | boolean | undefined`
    - [x] Type Validation
    - [x] Type Inference
    - [x] Runtime Validation
    - [x] Parse
    - [x] Test
  - [x] With Literal Values
    - [x] Boolean Literal
      - [x] Type Validation
      - [x] Type Inference
      - [x] Runtime Validation
      - [x] Parse
      - [x] Test
    - [x] Number Literal
      - [x] Type Validation
      - [x] Type Inference
      - [x] Runtime Validation
      - [x] Parse
      - [x] Test
    - [x] String Literal
      - [x] Type Validation
      - [x] Type Inference
      - [x] Runtime Validation
      - [x] Parse
      - [x] Test
  - [x] Complex union - `true | 0 | 'a' | \`b\` | undefined | "c"`
    - [x] Type Validation
    - [x] Type Inference
    - [x] Runtime Validation
    - [x] Parse
    - [x] Test

- [x] **Template Literals** - `` `${ }` ``
  - [x] Primitives - `string`, `number`, `bigint`, `boolean`, `undefined`
    - [x] Type Validation
    - [x] Type Inference
    - [x] Runtime Validation
    - [x] Parse
    - [x] Test
  - [x] Literals - `true`, `0`, `"foo"`, `'bar'`
    - [x] Type Validation
    - [x] Type Inference
    - [x] Runtime Validation
    - [x] Parse
    - [x] Test
  - [x] Complex Multi - `` `before${'a' | 'b'}mid${1 | 2}end` ``
    - [x] Type Validation
    - [x] Type Inference
    - [x] Runtime Validation
    - [x] Parse
    - [x] Test
  - [ ] Nested template literal - `` `\`${number | string}\`` `` *(edge case)*
    - [ ] Type Validation
    - [ ] Type Inference
    - [ ] Runtime Validation
    - [ ] Parse
    - [ ] Test

- [x] Recursive DSL - `<length>` as `${number}{'%' | 'px'}` 
  - [x] Type Validation
  - [x] Type Inference
  - [x] Runtime Validation
  - [x] Parse
  - [x] Test

- [ ] **Negative Cases**
  - [ ] Fails on non-existing keyword `"xyz"`
    - [ ] Type Validation
    - [ ] Type Inference
    - [ ] Runtime Validation
    - [ ] Parse
    - [ ] Test
  - [ ] Fails on partially parsable union `"'xyz' | xyz"`
    - [ ] Type Validation
    - [ ] Type Inference
    - [ ] Runtime Validation
    - [ ] Parse
    - [ ] Test
  - [ ] Fails on empty string `""`
    - [ ] Type Validation
    - [ ] Type Inference
    - [ ] Runtime Validation
    - [ ] Parse
    - [ ] Test
  - [ ] Fails on trailing pipe `"string |"`
    - [ ] Type Validation
    - [ ] Type Inference
    - [ ] Runtime Validation
    - [ ] Parse
    - [ ] Test
  - [ ] Fails on leading pipe `"| string"`
    - [ ] Type Validation
    - [ ] Type Inference
    - [ ] Runtime Validation
    - [ ] Parse
    - [ ] Test
  - [ ] Fails on double pipe `"string || number"`
    - [ ] Type Validation
    - [ ] Type Inference
    - [ ] Runtime Validation
    - [ ] Parse
    - [ ] Test
  - [ ] Fails on empty union parts `"string |  | number"`
    - [ ] Type Validation
    - [ ] Type Inference
    - [ ] Runtime Validation
    - [ ] Parse
    - [ ] Test
  - [ ] Fails on just a pipe `"|"`
    - [ ] Type Validation
    - [ ] Type Inference
    - [ ] Runtime Validation
    - [ ] Parse
    - [ ] Test
  - [ ] Fails on illegal characters `( ) [ ] { }`
    - [ ] Type Validation
    - [ ] Type Inference
    - [ ] Runtime Validation
    - [ ] Parse
    - [ ] Test
  - [ ] Fails on mismatched quotes `"'unclosed"`, `"unclosed'"`
    - [ ] Type Validation
    - [ ] Type Inference
    - [ ] Runtime Validation
    - [ ] Parse
    - [ ] Test
  - [ ] Fails on whitespace-only `"   "`
    - [ ] Type Validation
    - [ ] Type Inference
    - [ ] Runtime Validation
    - [ ] Parse
    - [ ] Test
  - [ ] Fails on unknown keyword in template interpolation `` `/${${unknown}}/` ``
    - [ ] Type Validation
    - [ ] Type Inference
    - [ ] Runtime Validation
    - [ ] Parse
    - [ ] Test
  - [ ] Fails on type mismatch in `parseValueAgainstDSL` - value doesn't match DSL
    - [ ] `"string"` rejects non-strings (number, boolean, undefined)
    - [ ] `"number"` rejects non-numbers (string, bigint)
    - [ ] `"boolean"` rejects truthy/falsy non-booleans (1, "")
    - [ ] `"undefined"` rejects null

---

## HTML Attributes

- [ ] **`htmlAttributeConfig` builder** - validates attribute DSL strings at runtime
  - [ ] Type Validation
  - [ ] Type Inference
  - [ ] Runtime Validation
  - [ ] Test

- [ ] **Edge Cases**
  - [ ] Empty config `{}` accepted
  - [ ] Typed `as const` vs mutable config
  - [ ] Object reference identity preserved
  - [ ] Invalid DSL string throws error

## HTML Tags

- [ ] **`htmlTagConfig` builder** - validates tag definitions, cross-references, and attribute DSL
  - [ ] Type Validation
  - [ ] Type Inference
  - [ ] Runtime Validation
  - [ ] Test

- [ ] **innerHTML cross-references**
  - [ ] Validates referenced tags exist in config
  - [ ] `#text` allowed for text-containing tags
  - [ ] `*` wildcard allows any child tag
  - [ ] Self-referencing tags (`div` containing `div`)
  - [ ] Mixed `#text` + tag references
  - [ ] Void elements (empty `innerHTML: []`)

- [ ] **Tag-specific attributes**
  - [ ] Attributes validated via DSL on each tag
  - [ ] Literal union attributes (`dir: "'ltr' | 'rtl' | 'auto' | undefined"`)
  - [ ] Per-tag attribute overrides

## CSS Syntax

- [ ] **`cssSyntaxConfig` builder** - validates syntax token definitions with recursive keyword resolution
  - [ ] Type Validation
  - [ ] Type Inference
  - [ ] Runtime Validation
  - [ ] Test

- [ ] **Recursive keyword resolution** - `<length>` defined as template literal, used in `<length-percentage>` as `"<length> | <percentage>"`
  - [ ] Type Validation
  - [ ] Type Inference
  - [ ] Runtime Validation
  - [ ] Parse
  - [ ] Test

- [ ] **Edge Cases**
  - [ ] Circular or self-referencing syntax tokens
  - [ ] Unknown token reference raises error
  - [ ] Mixed token + literal unions

## CSS Attributes

- [ ] **`cssAttributeConfig` builder** - maps CSS property names to syntax tokens or literal DSL strings
  - [ ] Type Validation
  - [ ] Type Inference
  - [ ] Runtime Validation
  - [ ] Test

- [ ] **Token resolution & type inference**
  - [ ] Single token resolves to raw DSL string
  - [ ] Quoted literals infer as quoted string types
  - [ ] Mixed token + literal unions
  - [ ] Multiple attributes infer as mapped object
  - [ ] Unknown token is a type-level error

## CSS Properties

- [ ] **`cssPropertiesConfig` builder** - validates CSS `@property` rule definitions (`syntax`, `inherits`, `initial-value`)
  - [ ] Type Validation
  - [ ] Type Inference
  - [ ] Runtime Validation
  - [ ] Test

- [ ] **`syntax` field validation**
  - [ ] Must reference valid CSS syntax tokens
  - [ ] DSL string validated at runtime via `dslString()`
  - [ ] Supports complex DSL unions

- [ ] **`inherits` field**
  - [ ] Boolean validation
  - [ ] Default handling

- [ ] **`initial-value` field**
  - [ ] Validated against resolved syntax type
  - [ ] Optional (may be omitted)
  - [ ] Must match the `syntax` DSL at the type level

- [ ] **Property name validation** - names must start with `--`
  - [ ] Type-level error for invalid names
  - [ ] Runtime check for `--` prefix

- [ ] **Edge Cases**
  - [ ] Empty config `{}`
  - [ ] Multiple custom properties
  - [ ] Property names with `_` prefix (`--_a`)

---

## Create Component

- [ ] **`createComponent` function** - validates a component structure against all configs
  - [ ] Type Validation
  - [ ] Type Inference
  - [ ] Runtime Validation
  - [ ] Test

- [ ] **Tag validation**
  - [ ] Recognized tag from tag config passes
  - [ ] Unknown tag is a type-level error
  - [ ] Missing `tag` property is rejected

- [ ] **Attribute validation**
  - [ ] Global attributes merged with tag-specific attributes
  - [ ] Attribute values type-checked against inferred DSL types
  - [ ] Undocumented attributes are rejected
  - [ ] Optional attributes (`| undefined`) accept omission

- [ ] **innerHTML validation**
  - [ ] Text nodes allowed only when `#text` is in tag's innerHTML
  - [ ] Child components must have tags listed in parent's innerHTML
  - [ ] `*` wildcard allows any child tag
  - [ ] Void elements (empty `innerHTML: []`) reject children
  - [ ] Nested hierarchy validated recursively
  - [ ] Mixed text + child components

- [ ] **CSS validation**
  - [ ] Property values validated against CSS syntax config via `DSLInfer`
  - [ ] CSS custom properties (`--*`) resolved against CSS properties config
  - [ ] Child CSS selectors (`> childName`) allow per-child CSS blocks
  - [ ] Nested CSS selectors validated recursively
