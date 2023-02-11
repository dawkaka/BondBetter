export function InvalidLink() {
    return (
        <div className="w-full self-center flex flex-col items-center mt-12">
            <p className="px-3 font-bold text-lg text-gray-600 text-center max-w-[300px] text-center">This link has already been used or does not exist</p>
            <p className="text-gray-400 text-center max-w-[400px]">You can reach out the person that send you the link for a new one</p>
        </div>
    )
}