import { ReactNode } from "react"
import { toErrorMessage } from "../../../error/fetchBaseQuery.error";

type FetchStateContentProps = {
    children: ReactNode;
    isLoading: boolean;
    error?: unknown;
}

export default function FetchStateContent({ children, isLoading, error }: FetchStateContentProps) {
    if (isLoading) {
        return (
            <div>Loading...</div>
        );
    }
    if (error) {
        return (
            <div>Error: {toErrorMessage(error)}</div>
        );
    }
    return children;
}