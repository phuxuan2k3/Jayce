import { Alert } from '@mui/material';
import React from 'react';

const AlertSuccess: React.FC<{ successMessage: string }> = ({ successMessage }: { successMessage: string }) => {
	return (
		<Alert
			sx={{
				width: '100%',
				mt: 1,
				mb: 3,
			}} severity="success">
			{successMessage}
		</Alert>
	);
};

export default AlertSuccess;