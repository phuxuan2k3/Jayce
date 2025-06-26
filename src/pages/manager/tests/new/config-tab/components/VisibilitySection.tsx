import { ExamPersistCore } from "../../../../../../infra-test/ui-items/test/types";

export function VisibilitySection({
	isAnswerVisible,
	isAllowedToSeeOtherResults,
	isPublic,
	onChange,
}: {
	isAnswerVisible: boolean;
	isAllowedToSeeOtherResults: boolean;
	isPublic?: boolean;
	onChange: (patch: Partial<ExamPersistCore["detail"]>) => void;
}) {
	return (
		<div className="col-start-2 flex flex-col gap-2 w-full">
			<div className="flex items-center gap-x-2">
				<input
					type="checkbox"
					id="show-results"
					className="mr-2"
					checked={isAnswerVisible}
					onChange={e => onChange({ isAnswerVisible: e.target.checked })}
				/>
				<label htmlFor="show-results" className="text-sm text-primary-toned-500">Allow participants to see their results after completion</label>
			</div>
			<div className="flex items-center gap-x-2">
				<input
					type="checkbox"
					id="show-results-others"
					className="mr-2"
					checked={isAllowedToSeeOtherResults}
					onChange={e => onChange({ isAllowedToSeeOtherResults: e.target.checked })}
				/>
				<label htmlFor="show-results-others" className="text-sm text-primary-toned-500">Allow participants to see results of other participants</label>
			</div>
			<div className="flex items-center gap-x-2 w-full">
				<input
					type="checkbox"
					id="is-public"
					className="mr-2"
					checked={!!isPublic}
					onChange={e => onChange({ isPublic: e.target.checked })}
				/>
				<label htmlFor="is-public" className="text-sm text-primary-toned-500">Make this exam public</label>
			</div>
		</div>
	);
}
