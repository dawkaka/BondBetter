export default function RequestModal() {
    return (
        <div id="authentication-modal" aria-hidden="true" className="fixed top-0 left-0 right-0 flex flex-col items-center justify-center z-50 bg-[rgba(0,0,0,0.1)] h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full">
            <div className="relative flex flex-col items-center justify-center  w-full h-full max-w-md">
                <div className="relative bg-white m-[auto] rounded-lg shadow dark:bg-gray-700">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800" data-modal-hide="authentication-modal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add partner</h3>
                        <p className="tex-sm text-gray-600">Enter your partner's email and click send, once they accept, we'll begin sending you daily questions to help you know each other more</p>
                        <form className="space-y-6 mt-4">
                            <div>
                                <label htmlFor="p-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your partner's email</label>
                                <input type="email" id="p-email" placeholder="Enter partner's email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" required />
                            </div>
                            <button
                                className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}