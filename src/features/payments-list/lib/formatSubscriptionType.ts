import { SubscriptionType } from "@/common/__generated-types__/graphql";

//TODO: use function from utils instead of this
export const formatSubscriptionType = (
  type: SubscriptionType,
) => {
  let label: string;

  switch (type) {
    case "DAY":
      label = `1 day`;
      break;
    case "WEEKLY":
      label = `7 days`;
      break;
    case "MONTHLY":
      label = `1 month`;
      break;
    default:
      label = "unknown subsription type";
  }

  return label;
};
