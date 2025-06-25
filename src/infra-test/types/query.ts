export type QueryBoolean = "0" | "1" | undefined;

export function toggleQueryBoolean(value: QueryBoolean): QueryBoolean {
	if (value === "1") return "0";
	if (value === "0") return "1";
	return undefined;
}