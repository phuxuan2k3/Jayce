import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const Forbidden: React.FC = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate('/');
	};

	return (
		<Container style={{ textAlign: 'center', marginTop: '50px' }}>
			<Typography variant="h1" component="h2" gutterBottom>
				403
			</Typography>
			<Typography variant="h5" component="h3" gutterBottom>
				Forbidden
			</Typography>
			<Typography variant="body1" gutterBottom>
				You do not have permission to access this page.
			</Typography>
			<Button variant="contained" color="primary" onClick={handleGoBack}>
				Go to Home
			</Button>
		</Container>
	);
};

export default Forbidden;