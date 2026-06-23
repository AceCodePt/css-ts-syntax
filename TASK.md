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

---

## HTML Attributes

- [x] Type Validation
- [x] Type Inference
- [ ] Runtime Validation
- [ ] Parse
- [ ] Test
- [x] Variations

## HTML Tags

### Variations

## CSS Syntax

### Variations

## CSS Attributes

### Variations
