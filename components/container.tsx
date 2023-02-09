export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-[min(100%,700px)] flex flex-col items-center h-full">
            {children}
        </div>
    )
}
