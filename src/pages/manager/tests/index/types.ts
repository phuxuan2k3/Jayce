export const StatusesAsConst = ["UPCOMING", "OPEN", "CLOSED"] as const;
export type Status = typeof StatusesAsConst[number];
