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
						<span className="animate-spin mr-2 inline-block align-middle">⏳</span>
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
