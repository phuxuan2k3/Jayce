import { useState } from 'react';
import MyButton from '../../../../../../../features/tests/ui/buttons/MyButton';
import MyDialog from '../../../../../../../features/tests/ui/MyDialog';

type ActionType = 'replace' | 'append' | null;

export default function ActionsDialog({
	onReplaceQuestions,
	onAppendQuestions,
	onCancel,
}: {
	onReplaceQuestions: () => void;
	onAppendQuestions: () => void;
	onCancel: () => void;
}) {
	const [selectedAction, setSelectedAction] = useState<ActionType>(null);

	const handleConfirm = () => {
		switch (selectedAction) {
			case 'replace':
				onReplaceQuestions();
				break;
			case 'append':
				onAppendQuestions();
				break;
		}
	};

	return (
		<MyDialog>
			<MyDialog.Content>
				<div className="mb-6">
					<h2 className="text-xl font-bold text-primary-toned-800 mb-2">Choose Your Next Action</h2>
					<p className="text-gray-600 text-sm">
						You've successfully generated new questions. Select how you'd like to proceed with your test.
					</p>
				</div>

				<div className="space-y-4 mb-6">
					<div
						className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedAction === 'replace'
							? 'border-primary-toned-500 bg-primary-toned-50'
							: 'border-gray-200 hover:border-primary-toned-300'
							}`}
						onClick={() => setSelectedAction('replace')}
					>
						<div className="flex items-start space-x-3">
							<div className="flex-shrink-0 mt-1">
								<div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAction === 'replace'
									? 'border-primary-toned-500 bg-primary-toned-500'
									: 'border-gray-300'
									}`}>
									{selectedAction === 'replace' && (
										<div className="w-2 h-2 rounded-full bg-white"></div>
									)}
								</div>
							</div>
							<div className="flex-grow">
								<h3 className="font-semibold text-gray-900 mb-1">Replace All Questions</h3>
								<p className="text-xs text-gray-500">
									This will completely replace your current test questions with the newly generated ones.
									Your previous questions will be permanently removed.
								</p>
							</div>
						</div>
					</div>

					<div
						className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedAction === 'append'
							? 'border-primary-toned-500 bg-primary-toned-50'
							: 'border-gray-200 hover:border-primary-toned-300'
							}`}
						onClick={() => setSelectedAction('append')}
					>
						<div className="flex items-start space-x-3">
							<div className="flex-shrink-0 mt-1">
								<div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAction === 'append'
									? 'border-primary-toned-500 bg-primary-toned-500'
									: 'border-gray-300'
									}`}>
									{selectedAction === 'append' && (
										<div className="w-2 h-2 rounded-full bg-white"></div>
									)}
								</div>
							</div>
							<div className="flex-grow">
								<h3 className="font-semibold text-gray-900 mb-1">Add to Existing Questions</h3>
								<p className="text-xs text-gray-500">
									This will add the new questions to your existing test, keeping all your current questions
									and expanding your question pool.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="flex space-x-3 pt-4 border-t border-gray-200 justify-between">
					<MyButton
						onClick={onCancel}
						variant={"gray"}
					>
						Cancel
					</MyButton>
					<MyButton
						onClick={handleConfirm}
						disabled={!selectedAction}
					>
						Confirm
					</MyButton>
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}
