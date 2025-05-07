import FetchState from "../../../../../components/wrapper/FetchState";
import GradientBorderGood from "../../../../../components/ui/border/GradientBorder.good";
import { GetTestsApiArg, useGetTagsQuery } from "../../../../../features/tests/legacy/test.api-gen";

type Props = {
	filterTags: GetTestsApiArg["tags"];
	onTagsChange: (tags: GetTestsApiArg["tags"]) => void;
}

export default function TagsList({
	filterTags,
	onTagsChange,
}: Props) {
	const { data: suggestedTags, isLoading, error } = useGetTagsQuery();
	if (!suggestedTags) return null;

	const handleTagsToggle = (tagId: number) => {
		const filterTagsHasTag = determineTagsFilterHasTag(filterTags, tagId);
		if (filterTagsHasTag) {
			const newTags = removeTagFromTagsFilter(filterTags, tagId);
			onTagsChange(newTags);
		}
		else {
			const newTags = addTagToTagsFilter(filterTags, tagId);
			onTagsChange(newTags);
		}
	};

	return (
		<>
			<h2 className="text-lg font-semibold mb-4">Tags</h2>
			<FetchState
				isLoading={isLoading}
				error={error}
			>
				<div className="flex flex-wrap gap-2">
					{suggestedTags?.map((tag) => {
						const isTagSelected = determineTagsFilterHasTag(filterTags, tag.id);
						return (
							<GradientBorderGood
								className={`cursor-pointer select-none ${isTagSelected ? "text-white" : "text-black"}`}
								onClick={() => handleTagsToggle(tag.id)}
								bgClass={isTagSelected ? "bg-primary-toned-600" : null}
								key={tag.id}>
								{tag.name}
							</GradientBorderGood>
						);
					})}
				</div>
			</FetchState>
		</>
	);
}

const addTagToTagsFilter = (tagsFilter: GetTestsApiArg["tags"], tagId: number): GetTestsApiArg["tags"] => {
	if (!tagsFilter) return tagId.toString();
	if (typeof tagsFilter === 'string') return [tagsFilter, tagId.toString()];
	if (Array.isArray(tagsFilter)) return [...tagsFilter, tagId.toString()];
	return tagsFilter;
}

const removeTagFromTagsFilter = (tagsFilter: GetTestsApiArg["tags"], tagId: number): GetTestsApiArg["tags"] => {
	if (!tagsFilter) return tagsFilter;
	if (typeof tagsFilter === 'string') return tagsFilter === tagId.toString() ? undefined : tagsFilter;
	if (Array.isArray(tagsFilter)) return tagsFilter.filter((id) => id !== tagId.toString());
	return tagsFilter;
}

const determineTagsFilterHasTag = (filterTags: GetTestsApiArg["tags"], tagId: number): boolean => {
	if (!filterTags) return false;
	if (typeof filterTags === 'string') return filterTags === tagId.toString();
	if (Array.isArray(filterTags)) return filterTags.includes(tagId.toString());
	return false;
}
