type JoinTuple<
  T extends readonly string[],
  Sep extends string,
> = T extends readonly [infer F extends string, ...infer R extends string[]]
  ? R["length"] extends 0
    ? F
    : `${F}${Sep}${JoinTuple<R, Sep>}`
  : string;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type LastOfUnion<U> =
  UnionToIntersection<U extends any ? () => U : never> extends () => infer R
    ? R
    : never;

// Recursively pulls one element off the union, joins the rest, prepends with separator.
// Using Extract<..., string> keeps TS convinced the payload stays a string at every step.
type JoinUnion<
  U extends string,
  Sep extends string,
  Last extends string = Extract<LastOfUnion<U>, string>,
> = [U] extends [never]
  ? ""
  : [Exclude<U, Last>] extends [never]
    ? Last
    : `${JoinUnion<Exclude<U, Last>, Sep>}${Sep}${Last}`;

declare global {
  interface ReadonlyArray<T> {
    join<TThis extends readonly string[], const S extends string>(
      this: TThis,
      separator: S,
    ): JoinUnion<TThis[number], S>;
  }
}
export {};

const z = [
  { a: "b", check: { a: "3" } },
  { a: "a", check: { a: "1" } },
  { a: "c", check: { a: "2" } },
] as const;
const y = z.map((i) => i.check.a);
//    ^? const y: "a|b|c"
