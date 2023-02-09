export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex flex-col items-center pt-[60px] h-full">
            {children}
        </div>
    )
}