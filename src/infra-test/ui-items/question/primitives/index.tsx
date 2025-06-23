import Header from './Header';
import Text from './Text';
import Images from './Images';
import ExtraText from './ExtraText';
import Options from './Options';
import LongAnswerInput from './LongAnswerInput';
import LongAnswerDisplay from './LongAnswerDisplay';
import Status from './Status';
import Stats from './Stats';
import Navigation from './Navigation';
import Compact from './Compact';
import { QuestionProps } from './types';
import { QuestionContext } from './context';

interface QuestionComponent extends React.FC<QuestionProps> {
	Header: React.FC;
	Text: React.FC;
	Images: React.FC;
	ExtraText: React.FC;
	Options: React.FC;
	LongAnswerInput: React.FC;
	LongAnswerDisplay: React.FC;
	Status: React.FC;
	Stats: React.FC;
	Navigation: React.FC<{ onPrevious?: () => void; onNext?: () => void; }>;
	Compact: React.FC;
}

const Question = (({
	question,
	answer,
	mode,
	showCorrectAnswer = false,
	onAnswerChange,
	onToggleFlag,
	isFlagged = false,
	questionIndex,
	totalQuestions,
	children
}) => {
	const contextValue = {
		question,
		answer,
		mode,
		showCorrectAnswer,
		onAnswerChange,
		onToggleFlag,
		isFlagged,
		questionIndex,
		totalQuestions
	};
	return (
		<QuestionContext.Provider value={contextValue}>
			<div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
				{children}
			</div>
		</QuestionContext.Provider>
	);
}) as QuestionComponent;


Question.Header = Header;
Question.Text = Text;
Question.Images = Images;
Question.ExtraText = ExtraText;
Question.Options = Options;
Question.LongAnswerInput = LongAnswerInput;
Question.LongAnswerDisplay = LongAnswerDisplay;
Question.Status = Status;
Question.Stats = Stats;
Question.Navigation = Navigation;
Question.Compact = Compact;

export default Question;
