import { BackgroundContextProvider } from './contexts/background-context';
import CandidateInterviewLiveMain from './CandidateInterviewLiveMain';
import { ModelContextProvider } from './contexts/model-context';
import { AudioContextProvider } from './contexts/audio.context';

export default function CandidateInterviewLivePage() {
	return (
		<BackgroundContextProvider>
			<ModelContextProvider>
				<AudioContextProvider>
					<CandidateInterviewLiveMain />
				</AudioContextProvider>
			</ModelContextProvider>
		</BackgroundContextProvider>
	);
}
