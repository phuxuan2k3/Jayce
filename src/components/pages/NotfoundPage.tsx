import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
	return (
		<div className="not-found-container" style={{
			textAlign: 'center',
			marginTop: '100px',
			fontFamily: 'Arial, sans-serif',
			maxWidth: '600px',
			margin: '100px auto',
			padding: '20px'
		}}>
			<div style={{ fontSize: '72px', marginBottom: '20px' }}>404</div>
			<h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Page Not Found</h1>
			<p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
				We're sorry, the page you requested could not be found.
				It might have been removed, had its name changed, or is temporarily unavailable.
			</p>
			<Link to="/" style={{
				backgroundColor: '#4A90E2',
				color: 'white',
				padding: '10px 20px',
				borderRadius: '5px',
				textDecoration: 'none',
				fontWeight: 'bold',
				display: 'inline-block',
				transition: 'background-color 0.3s'
			}}>
				Return to Home
			</Link>
		</div>
	);
};

export default NotFoundPage;