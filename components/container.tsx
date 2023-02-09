export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex flex-col items-center mt-[60px]">
            {children}
        </div>
    )
}