import { cn } from "../../../../app/cn";
import { BaseComponentProps, TypeMap } from "./types";
import { QuestionContext } from "./contexts";

const { useQuestion } = QuestionContext;

function Index({
	className = "",
}: BaseComponentProps) {
	const { index } = useQuestion();
	return (
		<span className={cn("text-gray-500 font-arya", className)}>
			{index != null ? `Question ${index + 1}.` : "Question"}
		</span>
	);
}

function Text({
	className = "",
}: BaseComponentProps) {
	const { question: { text } } = useQuestion();
	return <div className={cn("font-asap", className)}>
		<Type className="mx-2 py-0.5 font-semibold" />
		<span>{text}</span>
	</div>;
}

function Points({
	className = "",
}: BaseComponentProps) {
	const { question: { points } } = useQuestion();
	return (
		<span className={cn("px-3 h-fit w-fit bg-primary-toned-200 text-primary-toned-700 text-xs font-semibold rounded-full", className)}>
			{points ? `${points} point${points > 1 ? "s" : ""}` : ""}
		</span>
	);
}

function Type({
	className = "",
}: BaseComponentProps) {
	const { question: { type } } = useQuestion();
	return (
		<span className={cn("py-0 text-xs px-4 rounded-full", TypeMap[type].color, className)}>
			{TypeMap[type].label || "Unknown"}
		</span>
	);
}

function Layout({
	className = "",
	children,
}: BaseComponentProps & {
	children?: React.ReactNode;
}) {
	return (
		<div className={cn("flex items-center gap-4", className)}>
			{children}
		</div>
	);
}

function Header({
	className = "",
}: BaseComponentProps) {
	return (
		<Layout className={cn("flex items-start gap-4 border-b border-primary-toned-200 pb-2", className)}>
			<div className="flex flex-col items-stretch gap-1 flex-shrink-0">
				<Index />
				<Points className="w-full text-center" />
			</div>
			<Text className="flex-1" />
			<Type className="py-0 text-xs px-4 rounded-full" />
		</Layout>
	);
}

Header.displayName = "QuestionHeader";
Header.Index = Index;
Header.Text = Text;
Header.Points = Points;
Header.Type = Type;
Header.Layout = Layout;

export { Header as QuestionPrimitivesHeader };
