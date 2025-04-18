
export default function DocumentsContextTab({
	documents,
	onDocumentsChange,
}: {
	documents: File[];
	onDocumentsChange: (documents: File[]) => void;
}) {
	return (
		<div className="p-4">
			<div className="mb-4">
				<h3 className="text-lg font-medium">Upload Documents</h3>
				<p className="text-sm text-gray-500">Upload PDF or Word documents for context</p>
			</div>

			<div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
				<input
					type="file"
					id="file-upload"
					className="hidden"
					multiple
					accept=".pdf,.doc,.docx"
					onChange={(e) => {
						if (e.target.files) {
							const newFiles = Array.from(e.target.files);
							onDocumentsChange([...documents, ...newFiles]);
						}
					}}
				/>
				<label htmlFor="file-upload" className="cursor-pointer">
					<div className="flex flex-col items-center justify-center">
						<svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
						</svg>
						<p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
						<p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 10MB)</p>
					</div>
				</label>
			</div>

			{documents.length > 0 && (
				<div className="mt-4">
					<h4 className="font-medium mb-2">Uploaded Documents ({documents.length})</h4>
					<ul className="space-y-2">
						{documents.map((file, index) => (
							<li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
								<div className="flex items-center">
									<svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
									<span className="text-sm truncate max-w-xs">{file.name}</span>
									<span className="text-xs text-gray-500 ml-2">({(file.size / 1024).toFixed(1)} KB)</span>
								</div>
								<button
									onClick={() => {
										const newDocuments = documents.filter((_, i) => i !== index);
										onDocumentsChange(newDocuments);
									}}
									className="text-red-500 hover:text-red-700"
								>
									<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}
