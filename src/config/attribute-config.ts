export type PrimissiveAttributeType = string | number | boolean | undefined;

export type PermissiveAttributeConfig = {
  [attribute: string]: PrimissiveAttributeType;
};

export const attributeConfig = <const T extends PermissiveAttributeConfig>(
  config: T,
) => {
  return config;
};
