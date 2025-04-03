import React from "react";
import ModalBase from "./Modal.base";

interface Props {
	parrentIsOpened: boolean;
	children: React.ReactNode;
	onCancel?: () => void;
	onAccept?: () => void;
	acceptText?: string;
	cancelText?: string;
}

export default function AcceptModal({
	parrentIsOpened,
	children,
	onCancel,
	onAccept,
	acceptText = "Yes",
	cancelText = "No",
}: Props) {
	const [isOpened, setIsOpened] = React.useState(parrentIsOpened);

	const handleAccept = () => {
		onAccept?.();
		setIsOpened(false);
	}

	const handleCancel = () => {
		onCancel?.();
		setIsOpened(false);
	}

	return (
		<ModalBase isOpen={isOpened} onClose={handleCancel}>
			{children}
			<div className="mt-4 flex justify-end">
				<button
					className="px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer"
					onClick={handleAccept}
				>
					{acceptText}
				</button>
				<button
					className="ml-2 px-3 font-semibold rounded-lg py-2 text-white bg-[#FF5C5C] cursor-pointer"
					onClick={handleCancel}
				>
					{cancelText}
				</button>
			</div>
		</ModalBase>
	);
}

