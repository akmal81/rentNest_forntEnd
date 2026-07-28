import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10 bg-background text-foreground">
            <div className="w-full max-w-md text-center space-y-6">

                {/* Animated Visual / Icon Badge */}
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted/60 border border-border shadow-sm">
                    <SearchX className="h-10 w-10 text-muted-foreground animate-pulse" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive/60 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-destructive"></span>
                    </span>
                </div>

                {/* Big 404 Text & Description */}
                <div className="space-y-2">
                    <h1 className="text-7xl font-extrabold tracking-tight text-primary/80">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Page Not Found
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Sorry, the page you are looking for doesn&apos;t exist, has been removed, or is temporarily unavailable.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
                    <Button size="lg" className="w-full sm:w-auto gap-2">
                        <Link href="/">
                            {/* <Home className="h-4 w-4" /> */}
                            Back to Home
                        </Link>
                    </Button>
                </div>

            </div>
        </div>
    );
}