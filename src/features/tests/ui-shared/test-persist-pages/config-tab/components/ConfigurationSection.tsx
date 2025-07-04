import { ExamPersistCoreSchema } from "../../../../ui-items/test/types";
import MyDescription from "../../../../ui/forms/MyDescription";
import MyFieldLayout from "../../../../ui/forms/MyFieldLayout";
import MyInput from "../../../../ui/forms/MyInput";
import MyLabel from "../../../../ui/forms/MyLabel";
import MyCheckbox from "../../../../ui/forms/MyCheckbox";
import MySwitch from "../../../../ui/forms/MySwitch";

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
			<div className="grid grid-cols-[2fr_3fr] gap-x-8 gap-y-4 w-full">
				<MyFieldLayout className="order-1">
					<MySwitch
						checked={numberOfAttemptsAllowed !== undefined && numberOfAttemptsAllowed > 0}
						onChange={checked => onChange({ numberOfAttemptsAllowed: checked ? 1 : undefined })}
						id="max-attempts-switch"
						label={
							<MyLabel htmlFor="max-attempts">Maximum Attempts:</MyLabel>
						}
						className="flex-row-reverse items-end justify-between w-full mb-1"
					/>
					<MyInput
						id="max-attempts"
						type="number"
						min="1"
						placeholder="Number of attempts"
						disabled={numberOfAttemptsAllowed === undefined}
						value={numberOfAttemptsAllowed || ''}
						onChange={e => onChange({ numberOfAttemptsAllowed: Number(e.target.value) })}
					/>
					<MyDescription text="Maximum number of attempts allowed for each participant" />
				</MyFieldLayout>

				<MyFieldLayout className="order-3">
					<MySwitch
						checked={numberOfParticipants !== undefined && numberOfParticipants > 0}
						onChange={checked => onChange({ numberOfParticipants: checked ? 1 : undefined })}
						id="test-participants-switch"
						label={
							<MyLabel htmlFor="test-participants">Number of Participants:</MyLabel>
						}
						className="flex-row-reverse items-end justify-between w-full mb-1"
					/>

					<MyInput
						id="test-participants"
						type="number"
						min="1"
						placeholder="Number of participants"
						disabled={numberOfParticipants === undefined}
						value={numberOfParticipants || ''}
						onChange={e => onChange({ numberOfParticipants: e.target.value ? Number(e.target.value) : undefined })}
					/>
					<MyDescription text="Maximum participants allowed" />
				</MyFieldLayout>


				<div className="order-2 row-span-2 flex flex-col gap-4 w-full h-full items-start justify-center bg-primary-toned-50 px-8 rounded-lg">
					<h3 className="text-xl font-semibold text-primary-toned-700 mb-2">Exam's options</h3>

					<MyCheckbox
						id="show-results"
						checked={isAnswerVisible}
						onChange={checked => onChange({ isAnswerVisible: checked })}
						label={
							<MyDescription text="Allow participants to see their results after completion" />
						}
					/>

					<MyCheckbox
						id="show-results-others"
						checked={isAllowedToSeeOtherResults}
						onChange={checked => onChange({ isAllowedToSeeOtherResults: checked })}
						label={
							<MyDescription text="Allow participants to see other participants' results" />
						}
					/>

					<MyCheckbox
						id="is-public"
						checked={!!isPublic}
						onChange={checked => onChange({ isPublic: checked })}
						label={
							<MyDescription text="Make this exam public, allowing anyone to access it" />
						}
					/>
				</div>
			</div>
		</div>
	);
}
