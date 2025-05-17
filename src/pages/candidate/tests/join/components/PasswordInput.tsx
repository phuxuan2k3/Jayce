import { Eye, EyeOff, LockIcon } from 'lucide-react';
import React, { useState } from 'react'

export default function PasswordInput({
	password,
	onPasswordChange,
	passwordError,
	onPasswordErrorChange,
}: {
	password: string;
	onPasswordChange: (password: string) => void;
	passwordError: string | null;
	onPasswordErrorChange: (error: string | null) => void;
}) {
	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onPasswordChange(e.target.value);
		onPasswordErrorChange(null);
	};

	return (<>
		<div className="mt-4">
			<label className="block text-sm font-medium text-gray-700 mb-1">
				This test is password protected
			</label>
			<div className="relative">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<LockIcon size={16} className="text-gray-400" />
				</div>
				<input
					type={showPassword ? "text" : "password"}
					value={password}
					onChange={handlePasswordChange}
					className={`pl-10 pr-10 py-2 w-full border ${passwordError ? 'border-red-500' : 'border-gray-300'
						} rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
					placeholder="Enter password to join"
				/>
				<button
					type="button"
					className="absolute inset-y-0 right-0 pr-3 flex items-center"
					onClick={() => setShowPassword(!showPassword)}
				>
					{showPassword ? (
						<EyeOff size={16} className="text-gray-400" />
					) : (
						<Eye size={16} className="text-gray-400" />
					)}
				</button>
			</div>
			{passwordError && (
				<p className="mt-1 text-sm text-red-600">{passwordError}</p>
			)}
		</div>
	</>)
}
