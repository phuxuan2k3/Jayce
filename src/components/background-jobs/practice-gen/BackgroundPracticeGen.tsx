import usePracticeGenPolling from './usePracticeGenPolling';
import usePracticeGenSaving from './usePracticeGenSaving';

export default function BackgroundPracticeGen() {
	usePracticeGenPolling();
	usePracticeGenSaving();
	return null;
}
