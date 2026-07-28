'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function Error({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string }
    unstable_retry: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10 bg-background text-foreground">
            <div className="w-full max-w-md text-center space-y-6">
                
                {/* Animated Warning Icon Badge */}
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 border border-destructive/20 shadow-sm">
                    <AlertTriangle className="h-10 w-10 text-destructive animate-pulse" />
                </div>

                {/* Heading & Description */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                        Something went wrong!
                    </h1>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        An unexpected error occurred while processing your request. Please try again or return to the home page.
                    </p>
                    
                    {/* Optional: Show Error Digest if available */}
                    {error.digest && (
                        <p className="pt-2 text-xs font-mono text-muted-foreground/80">
                            Error ID: <code className="bg-muted px-1.5 py-0.5 rounded border border-border">{error.digest}</code>
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
                    <button
                        onClick={() => unstable_retry()}
                        className={buttonVariants({ size: "lg", className: "w-full sm:w-auto gap-2 cursor-pointer" })}
                    >
                        <RefreshCw className="h-4 w-4" />
                        Try again
                    </button>

                    <Link 
                        href="/" 
                        className={buttonVariants({ variant: "outline", size: "lg", className: "w-full sm:w-auto gap-2" })}
                    >
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Link>
                </div>

            </div>
        </div>
    )
}