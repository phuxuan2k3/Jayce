export const JoinTabTypeAsConst = ["PUBLIC", "ONGOING", "HISTORY"] as const;
export type JoinTabType = (typeof JoinTabTypeAsConst)[number];

