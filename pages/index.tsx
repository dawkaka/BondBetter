import gsap from "gsap";
import { useEffect } from "react"

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
            <main className="flex flex-col items-center w-full pb-[200px]">
                <section className="relative pt-40 mx-auto w-full px-4 sm:px-6 lg:px-8 min-h-screen overflow-hidden">
                    <div className="absolute top-0 z-[-1] left-[50%] w-[300px] translate-x-[-50%] h-[300px]  bg-no-repeat bg-[url('/stripes.png')]">
                    </div>

                    <div className="absolute top-[-300px] z-[-1] left-[50%] w-[300px] translate-x-[-50%] h-[300px] bg-gradient-to-b from-white to-pink-500 stripe-mask drop-down ">
                    </div>

                    <div className="absolute bottom-0 z-[-1] left-[50%] w-[300px] translate-x-[-50%] h-[300px]  bg-no-repeat bg-[url('/stripes.png')]">
                    </div>

                    <div className="absolute right-0  rotate-[270deg] z-[-1] top-[50%] w-[200px] translate-y-[-50%] h-[400px] bg-no-repeat bg-[url('/stripes.png')]">
                    </div>

                    <div className="absolute bottom-0 z-[-1] left-[50%] w-[300px] translate-x-[-50%] h-[300px]  bg-no-repeat bg-[url('/stripes.png')]">
                    </div>
                    <div className="absolute bottom-[-300px] z-[-1] left-[50%] w-[300px] translate-x-[-50%] h-[300px] bg-gradient-to-t from-white to-pink-500 stripe-mask move-up">
                    </div>


                    <div className="absolute left-0  rotate-90 z-[-1] top-[50%] w-[200px] translate-y-[-50%] h-[400px]  bg-no-repeat bg-[url('/stripes.png')]">
                    </div>

                    <div className="m-auto bg-white py-16 rounded lg: max-w-5xl hero-container">
                        <div className="mx-auto max-w-xl text-center lg:max-w-4xl">
                            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl xl:text-6xl">Learn Five New Things About Your Partner Every Day</h1>
                            <h2 className="mt-4 text-lg font-normal leading-7 text-gray-700 sm:text-xl lg:mx-auto lg:max-w-3xl xl:text-2xl xl:leading-9">
                                Answer five questions daily with your partner  every day to help you know each other better.
                            </h2>
                        </div>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:mt-10">
                            <a href="/#showcase" className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-300 px-6 py-2.5 text-base text-gray-700 transition-all duration-200 hover:border-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2" role="button">Get started</a>
                        </div>
                    </div>
                </section>

                <section className="max-w-8xl bg-white py-32 px-4">
                    <h3 className="text-4xl text-gray-700 max-w-3xl text-center">
                        Answer daily questions with your partner, and also create custom questions and receive responses to them.
                    </h3>
                </section>

                <QuestionsDemo />

            </main >
        </div >
    )
}

function QuestionsDemo() {
    useEffect(() => {
        var tl = gsap.timeline({ repeat: -1 });
        //sequenced one-after-the-other
        tl.to(".q-1", { duration: 1, y: 0, opacity: 1 })
            .to(".q-1", { duration: 1, delay: 2, y: -20, opacity: 0 })
            .to(".q-2", { duration: 1, y: 0, opacity: 1 })
            .to(".q-2", { duration: 1, delay: 2, y: -20, opacity: 0 })
            .to(".q-3", { duration: 1, y: 0, opacity: 1 })
            .to(".q-3", { duration: 1, delay: 2, y: -20, opacity: 0 })
            .to(".q-4", { duration: 1, y: 0, opacity: 1 })
            .to(".q-4", { duration: 1, delay: 2, y: -20, opacity: 0 });
        return () => {
            tl.kill()
        }
    }, [])

    return (
        <section className="w-full flex flex-col items-center bg-purple-500">
            <div className="w-full container grid grid-cols-2">
                <div className="p-16">
                    <h4 className="text-left text-white text-2xl font-bold">You</h4>
                    <div className="w-full h-[200px] relative mt-16 overflow-y-hidden rounded my-auto flex flex-col justify-end items-center gap-10">
                        <Q title="What is one thing you've always wanted to try but haven't tried yet?" id="q-1" />
                        <Q title="What is one thing you've always wanted to try but haven't tried yet?" id="q-2" />
                        <Q title="What is one thing you've always wanted to try but haven't tried yet?" id="q-3" />
                        <Q title="What is one thing you've always wanted to try but haven't tried yet?" id="q-4" />
                        <textarea
                            placeholder="Type answer"
                            rows={1}
                            className="w-[80%] self-start bg-transparent border-b px-3 py-1 focus:outline-none text-white text-lg"
                        >
                        </textarea>
                    </div>
                </div>
                <div className="p-16 text-right">
                    <h4 className="text-right text-white text-2xl font-bold">Your Partner</h4>
                    <div className="w-full h-[200px] relative mt-16 overflow-y-hidden rounded my-auto flex flex-col justify-end items-center gap-10">
                        <Q title="What is one thing you've always wanted to try but haven't tried yet?" id="q-1" />
                        <Q title="What is one thing you've always wanted to try but haven't tried yet?" id="q-2" />
                        <Q title="What is one thing you've always wanted to try but haven't tried yet?" id="q-3" />
                        <Q title="What is one thing you've always wanted to try but haven't tried yet?" id="q-4" />

                        <textarea
                            placeholder="Type answer"
                            rows={1}
                            className="w-[80%] bg-transparent border-b px-3 py-1 self-end focus:outline-none text-white text-lg"
                        >
                        </textarea>
                    </div>
                </div>
            </div >
        </section>
    )
}


function Q({ title, id }: { title: string, id: string }) {
    return (
        <h3 id={id} className={`${id} absolute top-0 text-2xl text-white translate-y-[200px] opacity-0`}>
            {title}
        </h3>
    )
}