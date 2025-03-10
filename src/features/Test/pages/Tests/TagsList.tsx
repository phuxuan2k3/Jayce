import FetchState from "../../../../components/layouts/FetchState";
import GradientBorderGood from "../../../../components/ui/border/GradientBorder.good";
import { GetTestsApiArg, useGetTagsQuery } from "../../api/test.api-gen";

type Props = {
	filter: GetTestsApiArg;
	setFilters: React.Dispatch<React.SetStateAction<GetTestsApiArg>>;
}

export default function TagsList({ filter, setFilters }: Props) {
	const { data: tags, isLoading, error } = useGetTagsQuery();

	const handleTagsToggle = (tagId: number) => {
		if (filter.tags?.includes(tagId)) {
			setFilters({
				...filter,
				tags: filter.tags.filter((id) => id !== tagId)
			});
		}
		else {
			setFilters({
				...filter,
				tags: filter.tags ? [...filter.tags, tagId] : [tagId]
			});
		}
	};

	return (
		<section className="shadow-primary mb-8 px-6 pt-4 pb-8 rounded-lg">
			<h2 className="text-lg font-semibold mb-4">Tags</h2>
			<FetchState
				isLoading={isLoading}
				error={error}
				data={tags}
			>
				<div className="flex flex-wrap gap-2">
					{tags?.map((tag) => {
						const isTagSelected = filter.tags?.includes(tag.id) ?? false;
						return (
							<GradientBorderGood
								className={`cursor-pointer select-none ${isTagSelected ? "text-white" : "text-black"}`}
								onClick={() => handleTagsToggle(tag.id)}
								bgClass={isTagSelected ? "bg-blue-chill-700" : null}
								key={tag.id}>
								{tag.name}
							</GradientBorderGood>
						);
					})}
				</div>
			</FetchState>
		</section>
	);
}