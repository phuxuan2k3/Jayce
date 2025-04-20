import FetchState from "../../../../../components/wrapper/FetchState";
import GradientBorderGood from "../../../../../components/ui/border/GradientBorder.good";
import { GetTestsApiArg, useGetTagsQuery } from "../../../../../features/tests/api/test.api-gen";

type Props = {
	filter: GetTestsApiArg;
	setFilters: React.Dispatch<React.SetStateAction<GetTestsApiArg>>;
}

const addTagToTagsFilter = (filter: GetTestsApiArg["tags"], tag: number): GetTestsApiArg["tags"] => {
	if (!filter) return tag.toString();
	if (typeof filter === 'string') return [filter, tag.toString()];
	if (Array.isArray(filter)) return [...filter, tag.toString()];
	return filter;
}

const removeTagFromTagsFilter = (filter: GetTestsApiArg["tags"], tag: number): GetTestsApiArg["tags"] => {
	if (!filter) return filter;
	if (typeof filter === 'string') return filter === tag.toString() ? undefined : filter;
	if (Array.isArray(filter)) return filter.filter((id) => id !== tag.toString());
	return filter;
}

const determineTagsFilterHasTag = (filterTags: GetTestsApiArg["tags"], tagId: number): boolean => {
	if (!filterTags) return false;
	if (typeof filterTags === 'string') return filterTags === tagId.toString();
	if (Array.isArray(filterTags)) return filterTags.includes(tagId.toString());
	return false;
}

export default function TagsList({ filter, setFilters }: Props) {
	const { data: tags, isLoading, error } = useGetTagsQuery();

	if (!tags) return null;

	const handleTagsToggle = (tagId: number) => {
		const filterTagsHasTag = determineTagsFilterHasTag(filter.tags, tagId);
		if (filterTagsHasTag) {
			setFilters({
				...filter,
				tags: addTagToTagsFilter(filter.tags, tagId)
			});
		}
		else {
			setFilters({
				...filter,
				tags: removeTagFromTagsFilter(filter.tags, tagId)
			});
		}
	};

	return (
		<section className="shadow-primary mb-8 px-6 pt-4 pb-8 rounded-lg">
			<h2 className="text-lg font-semibold mb-4">Tags</h2>
			<FetchState
				isLoading={isLoading}
				error={error}
			>
				<div className="flex flex-wrap gap-2">
					{tags?.map((tag) => {
						const isTagSelected = determineTagsFilterHasTag(filter.tags, tag.id);
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