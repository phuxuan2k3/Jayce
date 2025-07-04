import React from 'react';
import MyButton from './MyButton';

interface WithLoadingProps {
	loading?: boolean;
	loadingNode?: React.ReactNode;
}

const withLoading = <P extends { disabled?: boolean; children?: React.ReactNode }>(
	WrappedButton: React.ComponentType<P>
) => {
	return function ButtonWithLoading({ loading, loadingNode, disabled, children, ...rest }: WithLoadingProps & P) {
		return (
			<WrappedButton
				disabled={loading || disabled}
				{...(rest as P)}
			>
				{loading ? (
					loadingNode ?? (
						<div className="w-5 h-5 border-4 border-white-toned-600 border-t-transparent rounded-full animate-spin"></div>
					)
				) : (
					children
				)}
			</WrappedButton>
		);
	};
};

type MyButtonWithLoadingProps = React.ComponentProps<typeof MyButton> & WithLoadingProps;

const MyButtonWithLoading: React.FC<MyButtonWithLoadingProps> = withLoading(MyButton);

export default MyButtonWithLoading;
