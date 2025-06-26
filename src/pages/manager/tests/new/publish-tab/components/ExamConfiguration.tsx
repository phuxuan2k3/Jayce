import { ConfigItem } from './ConfigItem';
import { formatDateDisplay } from '../utils';

interface ExamConfigurationProps {
	config: any;
}

export const ExamConfiguration = ({ config }: ExamConfigurationProps) => {
	return (
		<div className="bg-white rounded-lg shadow-md border border-primary-toned-200 p-6">
			<h2 className="text-xl font-semibold text-primary-toned-700 mb-4">Configuration</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

				{/* Basic Settings */}
				<div className="space-y-3">
					<h3 className="text-lg font-medium text-gray-700 mb-3">Basic Settings</h3>
					<div className="space-y-2">
						<ConfigItem label="Language" value={config.language} />
						<ConfigItem label="Duration" value={`${config.minutesToAnswer} minutes`} />
						<ConfigItem
							label="Password Protected"
							value={config.password ? "Yes" : "No"}
							isStatus
							statusType={config.password ? "success" : "neutral"}
						/>
						<ConfigItem
							label="Attempts Allowed"
							value={config.numberOfAttemptsAllowed ?? "Unlimited"}
						/>
					</div>
				</div>

				{/* Access Settings */}
				<div className="space-y-3">
					<h3 className="text-lg font-medium text-gray-700 mb-3">Access Settings</h3>
					<div className="space-y-2">
						<ConfigItem
							label="Show Answers"
							value={config.isAnswerVisible ? "Yes" : "No"}
							isStatus
							statusType={config.isAnswerVisible ? "success" : "danger"}
						/>
						<ConfigItem
							label="Show Others' Results"
							value={config.isAllowedToSeeOtherResults ? "Yes" : "No"}
							isStatus
							statusType={config.isAllowedToSeeOtherResults ? "success" : "danger"}
						/>
					</div>
				</div>

				{/* Schedule */}
				<div className="md:col-span-2 space-y-3">
					<h3 className="text-lg font-medium text-gray-700 mb-3">Schedule</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-gray-50 rounded-lg p-4">
							<div className="font-medium text-gray-600 mb-1">Opens At:</div>
							<div className="text-gray-800">{formatDateDisplay(config.openDate)}</div>
						</div>
						<div className="bg-gray-50 rounded-lg p-4">
							<div className="font-medium text-gray-600 mb-1">Closes At:</div>
							<div className="text-gray-800">{formatDateDisplay(config.closeDate)}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
