export default function ConfirmDangerAction({ heading, message, action, close }: { heading: string, message: string, action: () => void, close: () => void }) {
    return (
        <div
            className="fixed top-0 left-0 right-0 flex flex-col items-center justify-center z-50 bg-[rgba(0,0,0,0.1)] h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full"
        >
            <div className="flex px-4 py-8 sm:px-8 w-[min(80%,500px)] flex-col gap-4 items-center bg-white rounded-lg shadow">
                <div className="flex flex-col items-center sm:flex-row">
                    <div className="rounded-full border border-gray-300 p-3 flex items-center justify-center w-16 h-16 flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                                <path d="M12 9V14" stroke="red" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M12.0001 21.41H5.94005C2.47005 21.41 1.02005 18.93 2.70005 15.9L5.82006 10.28L8.76006 5.00003C10.5401 1.79003 13.4601 1.79003 15.2401 5.00003L18.1801 10.29L21.3001 15.91C22.9801 18.94 21.5201 21.42 18.0601 21.42H12.0001V21.41Z"
                                    stroke="red" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M11.9945 17H12.0035" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                        <p className="font-bold">{heading}</p>
                        <p className="text-sm text-gray-700 mt-1">{message}
                        </p>
                    </div>
                </div>
                <div className="w-full sm:px-10 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={close}
                        className="w-full px-4 border py-2 rounded-full">
                        Cancel
                    </button>
                    <button
                        onClick={action}
                        className="w-full rounded-full px-4 py-2 rounded-full bg-red-500 text-white">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )

}