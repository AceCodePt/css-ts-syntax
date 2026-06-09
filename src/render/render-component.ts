import type { PermissiveAttributeConfig } from "../config/attribute-config.ts";
import type { PremissiveTagDefinition } from "../config/tag-config.ts";
import type { PremissableComponentNode } from "../create-component.ts";

export function renderComponent<
  const TagConfig extends PremissiveTagDefinition,
  const GlobalAttributeConfig extends PermissiveAttributeConfig,
  const T extends keyof TagConfig & string,
  const Component extends PremissableComponentNode<
    TagConfig,
    GlobalAttributeConfig,
    T
  >,
>(
  htmlTagAttributes: TagConfig,
  htmlGlobalAttributeConfig: GlobalAttributeConfig,
  node: Component,
): string {
  const record = node;
  const tag = record.tag;
  const innerHTML = record.innerHTML || [];
  const attributes = record.attributes || {};

  // ==========================================
  // 1. SERIALIZE ATTRIBUTES
  // ==========================================
  let attributesHtml = "";
  const allPossibleAttributes = Object.keys(
    Object.assign(
      {},
      htmlTagAttributes[tag]?.["attributes"],
      htmlGlobalAttributeConfig,
    ),
  );

  for (const [key, value] of Object.entries(attributes)) {
    if (!allPossibleAttributes.includes(key)) {
      throw new Error(`Key ${key} wasn't found on ${tag}`);
    }

    if (value === undefined || value === false) continue;

    if (value === true) {
      attributesHtml += ` ${key}`;
      continue;
    }

    attributesHtml += ` ${key}="${String(value)}"`;
  }

  const schemaForTag = htmlTagAttributes[tag];
  const isVoidElement =
    schemaForTag &&
    Array.isArray(schemaForTag.innerHTML) &&
    schemaForTag.innerHTML.length === 0;

  if (isVoidElement || !innerHTML) {
    return `<${tag}${attributesHtml}>`; // No closing tag, purely schema-driven
  }

  let childrenHtml = "";

  for (const childDict of innerHTML) {
    if (childDict && typeof childDict === "object") {
      for (const childNode of Object.values(childDict)) {
        childrenHtml += renderComponent(
          htmlTagAttributes,
          htmlGlobalAttributeConfig,
          childNode,
        );
      }
    } else {
      childrenHtml += childDict.toString();
    }
  }

  return `<${tag}${attributesHtml}>${childrenHtml}</${tag}>`;
}
