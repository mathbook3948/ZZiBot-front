'use client'

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-primary">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        </div>
    )
}
