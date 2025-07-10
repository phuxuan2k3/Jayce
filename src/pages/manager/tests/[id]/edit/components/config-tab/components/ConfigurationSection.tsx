import { ExamPersistCoreSchema } from "../../../../../../../../features/tests/ui-items/test/types";
import MyCheckbox from "../../../../../../../../features/tests/ui/forms/MyCheckbox";
import MyDescription from "../../../../../../../../features/tests/ui/forms/MyDescription";
import MyFieldLayout from "../../../../../../../../features/tests/ui/forms/MyFieldLayout";
import MyInput from "../../../../../../../../features/tests/ui/forms/MyInput";
import MyLabel from "../../../../../../../../features/tests/ui/forms/MyLabel";
import { InfoIcon } from "lucide-react";

export function ConfigurationSection({
	numberOfAttemptsAllowed,
	numberOfParticipants,
	isAnswerVisible,
	isAllowedToSeeOtherResults,
	isPublic,
	onChange,
}: {
	numberOfAttemptsAllowed?: number;
	numberOfParticipants?: number;
	isAnswerVisible: boolean;
	isAllowedToSeeOtherResults: boolean;
	isPublic?: boolean;
	onChange: (patch: Partial<ExamPersistCoreSchema["detail"]>) => void;
}) {
	return (
		<div className="flex flex-col gap-y-4 w-full">
			<div className="flex p-4 bg-primary-toned-50 rounded-md mb-2">
				<div className="flex items-center gap-2 w-full">
					<InfoIcon className="text-primary w-5 h-5" />
					<span className="text-primary-toned-700 text-sm">Maximum attempts and number of participants cannont be changed after the exam has published.</span>
				</div>
			</div>

			<div className="grid grid-cols-[2fr_3fr] gap-x-8 gap-y-4 w-full">
				<MyFieldLayout className="order-1">
					<MyLabel htmlFor="max-attempts">Maximum Attempts:</MyLabel>
					<MyInput
						id="max-attempts"
						type="number"
						disabled
						min="1"
						placeholder="Number of attempts"
						value={numberOfAttemptsAllowed || 'Unlimited'}
					/>
					<MyDescription text="Maximum number of attempts allowed for each participant" />
				</MyFieldLayout>

				<MyFieldLayout className="order-3">
					<MyLabel htmlFor="test-participants">Number of Participants:</MyLabel>
					<MyInput
						id="test-participants"
						type="number"
						min="1"
						placeholder="Number of participants"
						disabled
						value={numberOfParticipants || 'Unlimited'}
					/>
					<MyDescription text="Maximum participants allowed" />
				</MyFieldLayout>


				<div className="order-2 row-span-2 flex flex-col gap-4 w-full h-full items-start justify-center bg-primary-toned-50 px-8 py-8 rounded-lg text-wrap">
					<h3 className="text-xl font-semibold text-primary-toned-700 mb-2">Exam's options</h3>

					<MyCheckbox
						id="show-results"
						checked={isAnswerVisible}
						onChange={checked => onChange({ isAnswerVisible: checked })}
						label={
							<MyDescription
								flexShrink0={false}
								text="Allow participants to see their results after completion"
							/>
						}
					/>
					<MyCheckbox
						id="show-results-others"
						checked={isAllowedToSeeOtherResults}
						onChange={checked => onChange({ isAllowedToSeeOtherResults: checked })}
						label={
							<MyDescription
								flexShrink0={false}
								text="Allow participants to see other participants' results"
							/>
						}
					/>
					<MyCheckbox
						id="is-public"
						checked={!!isPublic}
						onChange={checked => onChange({ isPublic: checked })}
						label={
							<MyDescription
								flexShrink0={false}
								text="Make this exam public, allowing anyone to access it"
							/>
						}
					/>
				</div>
			</div>
		</div>
	);
}
