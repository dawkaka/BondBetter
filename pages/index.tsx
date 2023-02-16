export default function LandingePage() {
    return (
        <div>
            <header className="fixed top-4 z-10 w-full flex items-center justify-center py-3 px-3">
                <nav className="container flex items-center justify-between">
                    <h3 className="font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-600">
                        <span className="">
                            Logo
                        </span>
                    </h3>
                    <button className="px-8 py-2 rounded-full text-white font-bold bg-gradient-to-r from-amber-400 to-pink-600">Sign in</button>
                </nav>

            </header>
            <main className="">
                <div className="relative pt-40 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 min-h-screen overflow-hidden">
                    <div className="absolute top-0 z-[-1] left-[50%] w-[300px] translate-x-[-50%] h-[300px]  bg-no-repeat bg-[url('/stripes.png')]">
                    </div>

                    <div className="absolute bottom-0 z-[-1] left-[50%] w-[300px] translate-x-[-50%] h-[300px]  bg-no-repeat bg-[url('/stripes.png')]">
                    </div>
                    <div className="absolute right-0  rotate-[270deg] z-[-1] top-[50%] w-[200px] translate-y-[-50%] h-[400px] bg-no-repeat bg-[url('/stripes.png')]">
                    </div>
                    <div className="absolute bottom-0 z-[-1] left-[50%] w-[300px] translate-x-[-50%] h-[300px]  bg-no-repeat bg-[url('/stripes.png')]">
                    </div>
                    <div className="absolute left-0  rotate-90 z-[-1] top-[50%] w-[200px] translate-y-[-50%] h-[400px]  bg-no-repeat bg-[url('/stripes.png')]">
                    </div>
                    <div className="m-auto bg-white py-16 rounded shadow lg: max-w-5xl">
                        <div className="mx-auto max-w-xl text-center lg:max-w-4xl">
                            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl xl:text-6xl">Learn Five New Things About Your Partner Every Day</h1>
                            <h2 className="mt-4 text-lg font-normal leading-7 text-gray-700 sm:text-xl lg:mx-auto lg:max-w-3xl xl:text-2xl xl:leading-9">Write your content on Notion and automatically publish it to your SEO-friendly blog – No coding or design skills required.</h2>
                        </div>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:mt-10">
                            <a href="/#showcase" className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-300 px-6 py-2.5 text-base font-semibold text-gray-700 transition-all duration-200 hover:border-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2" role="button">Get started</a>
                        </div>
                    </div>

                </div>

            </main >
        </div >
    )
}