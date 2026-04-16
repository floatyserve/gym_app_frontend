export const ResourceType = {
  ACCESS_CARD: "ACCESS_CARD",
  CUSTOMER: "CUSTOMER",
  WORKER: "WORKER",
  USER: "USER",
  VISIT: "VISIT",
  LOCKER: "LOCKER",
  MEMBERSHIP: "MEMBERSHIP",
} as const;

export type ResourceType = typeof ResourceType[keyof typeof ResourceType];
