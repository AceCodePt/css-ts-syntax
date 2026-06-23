export function renderComponent(
  _htmlTagAttributes: Record<
    string,
    { attributes?: Record<string, unknown>; innerHTML: unknown }
  >,
  _htmlGlobalAttributeConfigOrNode: unknown,
  _node?: unknown,
): string {
  // let htmlGlobalAttributeConfig: Record<string, unknown>;
  // let record: Record<string, unknown>;

  // if (node !== undefined) {
  //   htmlGlobalAttributeConfig = htmlGlobalAttributeConfigOrNode as Record<
  //     string,
  //     unknown
  //   >;
  //   record = node as Record<string, unknown>;
  // } else {
  //   htmlGlobalAttributeConfig = {};
  //   record = htmlGlobalAttributeConfigOrNode as Record<string, unknown>;
  // }

  // const tag = record.tag as string;
  // const innerHTML = record.innerHTML || [];
  // const attributes = record.attributes || {};

  // // ==========================================
  // // 1. SERIALIZE ATTRIBUTES
  // // ==========================================
  // let attributesHtml = "";

  // for (const [key, value] of Object.entries(attributes)) {
  //   if (value === undefined || value === false) continue;

  //   if (value === true) {
  //     attributesHtml += ` ${key}`;
  //     continue;
  //   }

  //   attributesHtml += ` ${key}="${String(value)}"`;
  // }

  // const schemaForTag = htmlTagAttributes[tag];
  // const isVoidElement =
  //   schemaForTag &&
  //   Array.isArray(schemaForTag.innerHTML) &&
  //   schemaForTag.innerHTML.length === 0;

  // if (isVoidElement || !innerHTML) {
  //   return `<${tag}${attributesHtml}>`; // No closing tag, purely schema-driven
  // }

  // let childrenHtml = "";

  // for (const childDict of innerHTML) {
  //   if (childDict && typeof childDict === "object") {
  //     for (const childNode of Object.values(childDict)) {
  //       childrenHtml += renderComponent(
  //         htmlTagAttributes,
  //         htmlGlobalAttributeConfig,
  //         childNode,
  //       );
  //     }
  //   } else {
  //     childrenHtml += childDict.toString();
  //   }
  // }

  return "";
  // return `<${tag}${attributesHtml}>${childrenHtml}</${tag}>`;
}
