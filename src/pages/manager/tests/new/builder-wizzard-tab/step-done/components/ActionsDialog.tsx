import { useState } from 'react';
import MyButton from '../../../../../../../features/tests/ui/buttons/MyButton';
import MyDialog from '../../../../../../../features/tests/ui/MyDialog';
import { useLanguage } from '../../../../../../../LanguageProvider';

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
	const { t } = useLanguage();

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
					<h2 className="text-xl font-bold text-primary-toned-800 mb-2">{t("actions_dialog_title")}</h2>
					<p className="text-gray-600 text-sm">
						{t("actions_dialog_description")}
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
								<h3 className="font-semibold text-gray-900 mb-1">{t("actions_dialog_replace_title")}</h3>
								<p className="text-xs text-gray-500">
									{t("actions_dialog_replace_description")}
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
								<h3 className="font-semibold text-gray-900 mb-1">{t("actions_dialog_append_title")}</h3>
								<p className="text-xs text-gray-500">
									{t("actions_dialog_append_description")}
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
						{t("actions_dialog_cancel")}
					</MyButton>
					<MyButton
						onClick={handleConfirm}
						disabled={!selectedAction}
					>
						{t("actions_dialog_confirm")}
					</MyButton>
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}
