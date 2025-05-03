import React from 'react';
import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
	const error = useRouteError();
	let errorMessage: string;
	let errorTitle: string = "Oops!";
	let statusCode: number | null = null;

	if (isRouteErrorResponse(error)) {
		// error is type `ErrorResponse`
		statusCode = error.status;
		if (error.data && error.data.message) {
			errorMessage = error.data.message;
		} else if (error.status === 404) {
			errorTitle = "Page Not Found";
			errorMessage = "The page you're looking for doesn't exist or has been moved.";
		} else if (error.status === 401) {
			errorTitle = "Unauthorized Access";
			errorMessage = "You don't have permission to access this resource.";
		} else if (error.status === 503) {
			errorTitle = "Service Unavailable";
			errorMessage = "Our service is currently down for maintenance. Please try again later.";
		} else if (error.status === 418) {
			errorTitle = "I'm a Teapot";
			errorMessage = "The server refuses to brew coffee because it is, permanently, a teapot.";
		} else {
			errorTitle = "Something Went Wrong";
			errorMessage = "An unexpected error occurred. Our team has been notified.";
		}
	} else if (error instanceof Error) {
		console.error(error);
		errorMessage = error.message;
	} else if (typeof error === 'string') {
		errorMessage = error;
	} else {
		console.error(error);
		errorMessage = 'An unknown error has occurred.';
	}

	const styles = {
		errorPage: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			minHeight: '100vh',
			backgroundColor: '#f7f9fc',
			fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
		},
		errorContainer: {
			background: 'white',
			borderRadius: '8px',
			boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
			padding: '40px',
			textAlign: 'center' as const,
			maxWidth: '500px',
			width: '90%'
		},
		errorCode: {
			fontSize: '72px',
			fontWeight: 700,
			color: '#e2e8f0',
			position: 'absolute' as const,
			top: '10px',
			right: '20px',
			opacity: 0.5
		},
		errorIcon: {
			color: '#f56565',
			marginBottom: '20px'
		},
		errorTitle: {
			fontSize: '28px',
			fontWeight: 600,
			marginBottom: '12px',
			color: '#2d3748'
		},
		errorMessage: {
			color: '#718096',
			marginBottom: '30px',
			lineHeight: 1.5
		},
		errorActions: {
			marginTop: '20px'
		},
		homeButton: {
			backgroundColor: '#4299e1',
			color: 'white',
			padding: '10px 20px',
			borderRadius: '4px',
			textDecoration: 'none',
			transition: 'background-color 0.2s',
			fontWeight: 500,
			display: 'inline-block'
		}
	};

	return (
		<div style={styles.errorPage}>
			<div style={styles.errorContainer}>
				{statusCode && (
					<div style={styles.errorCode}>{statusCode}</div>
				)}
				<div style={styles.errorIcon}>
					<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="12" y1="8" x2="12" y2="12"></line>
						<line x1="12" y1="16" x2="12.01" y2="16"></line>
					</svg>
				</div>
				<h1 style={styles.errorTitle}>{errorTitle}</h1>
				<p style={styles.errorMessage}>{errorMessage}</p>
				<div style={styles.errorActions}>
					<Link to="/" style={styles.homeButton}>Go to Home</Link>
				</div>
			</div>
		</div>
	);
}

export default ErrorPage;