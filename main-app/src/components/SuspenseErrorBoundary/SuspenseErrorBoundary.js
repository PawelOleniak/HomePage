import React from 'react'
import { LoadingIndicator, Button } from 'components';
import { useQueryClient } from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'


function ErrorFallback({ resetErrorBoundary }) {
    return (
        <div role="alert">
            <div>
                Something went wrong.
                <Button onClick={resetErrorBoundary}>My Try Again!</Button>
            </div>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

export default function SuspenseErrorBoundary({...props }) {
    const queryClient = useQueryClient()

    async function Reset() {

        await queryClient.refetchQueries()

    }
    return (
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={Reset}
            >
                <React.Suspense fallback={<LoadingIndicator />}>

                    {props.children}
                </React.Suspense>
            </ErrorBoundary>
    )
}