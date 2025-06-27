import { Alert } from '@mui/material';
import React from 'react';

const AlertError: React.FC<{ errorMessage: string }> = ({ errorMessage }: { errorMessage: string }) => {
	return (
		<Alert
			sx={{
				width: '100%',
				mt: 1,
				mb: 3,
			}} severity="error">
			{errorMessage}
		</Alert>
	);
};

export default AlertError;