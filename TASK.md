---

---

# Tasks

## DSL
- [x] Primitives - string, number, bigint, boolean, undefined,
- - [x] Type Validation
- - [x] Type Inference
- - [x] Runtime Validation
- - [x] Parse
- - [x] Test

- [x] Literals - true, false
- - [x] Type Validation
- - [x] Type Inference
- - [x] Runtime Validation
- - [x] Parse
- - [x] Test

- [x] Literal Numbers - 0, 1...
- - [x] Type Validation
- - [x] Type Inference
- - [x] Runtime Validation
- - [x] Parse
- - [x] Test

- [x] Literal String - "", '', ``
- - [x] Type Validation
- - [x] Type Inference
- - [x] Runtime Validation
- - [x] Parse
- - [x] Test

- [x] Literal String with pipe - '|' \"|\" `|` [EDGE CASE]
- - [x] Type Validation
- - [x] Type Inference
- - [x] Runtime Validation
- - [x] Parse
- - [x] Test

- [x] Union Type - |
- - [x] Union Type with Primitives - string | number | bigint | boolean | undefined
- - - [x] Type Validation
- - - [x] Type Inference
- - - [x] Runtime Validation
- - - [x] Parse
- - - [x] Test

- - [x] Union Type with Literal Value
- - - [x] Boolean Literal
- - - - [x] Type Validation
- - - - [x] Type Inference
- - - - [x] Runtime Validation
- - - - [x] Parse
- - - - [x] Test

- - - [x] Number Literal
- - - - [x] Type Validation
- - - - [x] Type Inference
- - - - [x] Runtime Validation
- - - - [x] Parse
- - - - [x] Test

- - - [x] String Literal
- - - - [x] Type Validation
- - - - [x] Type Inference
- - - - [x] Runtime Validation
- - - - [x] Parse
- - - - [x] Test

- - [x] Complex union - true | 0 | 'a' | `b` | undefined | "c"
- - - [x] Type Validation
- - - [x] Type Inference
- - - [x] Runtime Validation
- - - [x] Parse
- - - [x] Test

- [x] Template literal - `${ }`
- - [x] Primitives - string, number, bigint, boolean, undefined,
- - - [x] Type Validation
- - - [x] Type Inference
- - - [x] Runtime Validation
- - - [x] Parse
- - - [x] Test

- - [x] Literals - true, 0, "foo", 'bar'
- - - [x] Type Validation
- - - [x] Type Inference
- - - [x] Runtime Validation
- - - [x] Parse
- - - [x] Test


- - [x] Complex Multi `before${'a' | 'b'}mid${1 | 2}end`
- - - [x] Type Validation
- - - [x] Type Inference
- - - [x] Runtime Validation
- - - [x] Parse
- - - [x] Test
 
- - [ ] Template literal - `\`${number | string}\`` EDGE CASE
- - - [ ] Type Validation
- - - [ ] Type Inference
- - - [ ] Runtime Validation
- - - [ ] Parse
- - - [ ] Test

- [ ] Negative cases
- - [ ] Fails on non existing keyword "xyz"
- - - [ ] Type Validation
- - - [ ] Type Inference
- - - [ ] Runtime Validation
- - - [ ] Parse
- - - [ ] Test


## HTML Attributes
### Type Validation
- [x] Have html attribute config support type check of DSL 
- [x] Have html attribute tag support type check of DSL 
- [x] Have css syntax support type check of DSL 
- [ ] Have css 
### Variations
## HTML Tags
### Variations
## CSS Syntax
### Variations
## CSS Attributes
### Variations
