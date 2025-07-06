import { ArrowUpWideNarrow, ArrowDownWideNarrow } from "lucide-react";
import MyButton from "./MyButton";
import { QuerySortValues } from "../../types/query";

type MyButtonWithSortProps = {
	sort: QuerySortValues | undefined;
	setSort: (prev: QuerySortValues | undefined) => void;
} & React.ComponentProps<typeof MyButton>;

export default function MyButtonWithSort({
	sort,
	setSort,
	children,
	...props
}: MyButtonWithSortProps) {
	return (
		<MyButton
			size="medium"
			variant={sort != null ? "primary" : "outline"}
			onClick={() => {
				setSort(sort === undefined ? "asc" : sort === "asc" ? "desc" : undefined);
			}}
			{...props}
		>
			{sort === "asc" ? (
				<ArrowUpWideNarrow className="h-5 w-5" />
			) : sort === "desc" ? (
				<ArrowDownWideNarrow className="h-5 w-5" />
			) : (
				null
			)}
			{children}
		</MyButton>
	);
}