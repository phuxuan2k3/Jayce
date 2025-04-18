import { useState } from 'react';
import { FaRegFileAlt, FaLink, FaFilePdf } from 'react-icons/fa';
import TextContextTab from './ContextOfTestTabs/TextContextTab';
import LinksContextTab from './ContextOfTestTabs/LinksContextTab';
import DocumentsContextTab from './ContextOfTestTabs/DocumentsContextTab';

type ContextType = "text" | "link" | "document";

const tabContexts: { contextType: ContextType; label: string; icon: JSX.Element; }[] = [
	{
		contextType: "text",
		label: "Text",
		icon: <FaRegFileAlt />,
	},
	{
		contextType: "link",
		label: "Links",
		icon: <FaLink />,
	},
	{
		contextType: "document",
		label: "Documents",
		icon: <FaFilePdf />,
	}
];

export default function ContextOfTest({
	text,
	links,
	documents,
	onTextChange,
	onLinksChange,
	onDocumentsChange,
}: {
	text: string;
	links: string[];
	documents: File[];
	onTextChange: (text: string) => void;
	onLinksChange: (links: string[]) => void;
	onDocumentsChange: (documents: File[]) => void;
}) {
	const [currentContext, setCurrentContext] = useState<ContextType>("text");

	return (
		<div className="flex justify-center">
			<div className="font-arya mt-10 mb-20 min-h-fit min-w-[640px] border border-primary-toned-300 rounded-lg bg-white shadow-md p-4">
				<div className="w-full">
					<div className=" h-[50px] mt-2 flex justify-center items-center">
						<div className="flex items-center border border-gray-300 rounded-md h-[40px] ">
							{tabContexts.map((tabContext) => (
								<button
									key={tabContext.contextType}
									className={`flex items-center mx-2 px-3 py-1 rounded-md transition ${currentContext === tabContext.contextType
										? "bg-primary-toned-600 text-white"
										: "text-gray-500 hover:bg-gray-100"
										}`}
									onClick={() => setCurrentContext(tabContext.contextType)}
								>
									{tabContext.icon}
									<span>{tabContext.label}</span>
								</button>
							))}
						</div>
					</div>

					{/* Context tabs */}
					{currentContext === "text" && (
						<TextContextTab
							text={text}
							onTextChange={onTextChange}
						/>
					)}
					{currentContext === "link" && (
						<LinksContextTab
							links={links}
							onLinksChange={onLinksChange}
						/>
					)}
					{currentContext === "document" && (
						<DocumentsContextTab
							documents={documents}
							onDocumentsChange={onDocumentsChange}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
