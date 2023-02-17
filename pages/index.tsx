import gsap from "gsap";
import { useEffect, useRef } from "react"
import { ProfileIcon } from "../components/header";

export default function LandingePage() {
    return (
        <div>
            <header className="fixed top-4 z-10 w-full flex items-center justify-center py-3 px-3">
                <nav className="container flex items-center justify-between">
                    <h1 className="font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-600">
                        <span className="">
                            Logo
                        </span>
                    </h1>
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

    const comRef = useRef(null)

    useEffect(() => {

        const tl = gsap.timeline({ repeat: -1 });
        tl.to(".q-1", { duration: 1, y: 0, opacity: 1 })
            .to(".q-1", { duration: 1, delay: 2, y: 0, opacity: 0 })
            .to(".q-2", { duration: 1, y: 0, opacity: 1 })
            .to(".q-2", { duration: 1, delay: 2, y: 0, opacity: 0 })
            .to(".q-3", { duration: 1, y: 0, opacity: 1 })
            .to(".q-3", { duration: 1, delay: 2, y: 0, opacity: 0 })
            .to(".q-4", { duration: 1, y: 0, opacity: 1 })
            .to(".q-4", { duration: 1, delay: 2, y: 0, opacity: 0 });

        let wid = window.getComputedStyle(comRef.current!).width
        wid = wid.substring(0, wid.length - 2)
        const mid = (parseInt(wid) / 2) - 70
        const mid2 = (parseInt(wid) / 2) - 75
        const c1 = gsap.timeline({ repeat: -1 })
        c1.to(".c1", { duration: 1, x: mid, opacity: 1 })
            .to(".c1", { duration: 1, delay: 2, x: mid, scale: 0 })
            .to(".c1", { duration: 1, delay: 7 })

        const c2 = gsap.timeline({ repeat: -1 })
        c2.to(".c2", { duration: 1, x: 0 - mid, opacity: 1 })
            .to(".c2", { duration: 1, delay: 2, x: 0 - mid, scale: 0 })
            .to(".c2", { duration: 1, delay: 7 })

        const i1 = gsap.timeline({ repeat: -1, })
        i1.to(".i1", { duration: 1, x: mid2, delay: 4, opacity: 1 })
            .to(".i1", { duration: 1, delay: 3 })
            .to(".i1", { duration: 1, delay: 2, scale: 0 })


        const i2 = gsap.timeline({ repeat: -1 })
        i2.to(".i2", { duration: 1, x: 0 - mid2, delay: 4, opacity: 1 })
            .to(".i2", { duration: 1, delay: 3, rotateX: 180 })
            .to(".i2", { duration: 1, delay: 2, scale: 0 })



        const tlHeader = gsap.timeline({ repeat: -1 })
        tlHeader.to("#simi", { duration: 1, y: 0 })
            .to("#simi", { duration: 1, delay: 2, y: -50 })
            .to("#diff", { duration: 1, y: 0 })
            .to("#diff", { duration: 1, delay: 2, y: -50 })
            .to("#comp", { duration: 1, y: 0 })
            .to("#comp", { duration: 1, delay: 2, y: -50 })

        return () => {
            tl.kill()
            c1.kill()
            c2.kill()
            i1.kill()
            i2.kill()
        }
    }, [])

    return (
        <section className="w-full">
            <div className="w-full flex flex-col items-center ">
                <div className="w-full container grid grid-cols-2 gap-8 bg-purple-500  shadow-lg px-16 rounded-lg">
                    <div className="py-16 flex flex-col">
                        <div className="self-start w-fit gap-1 flex flex-col items-center">
                            <div className="h-8 w-8 text-purple-300">
                                {ProfileIcon()}
                            </div>
                            <h4 className="text-white font-bold">You</h4>
                        </div>
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
                    <div className="py-16 text-right flex flex-col">
                        <div className="self-end w-fit flex flex-col gap-1 items-center">
                            <div className="h-8 w-8 text-purple-300">
                                {ProfileIcon()}
                            </div>
                            <h4 className="text-white font-bold">Partner</h4>
                        </div>
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
            </div>
            <div className="relative mt-16 shadow-lg">
                <div className="h-[50px] relative overflow-hidden mb-10">
                    <p id="simi" className="absolute translate-y-[-50px] left-[50%] translate-x-[-50%] text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-600 font-semibold">Discover your similarities</p>
                    <p id="diff" className="absolute translate-y-[-50px] left-[50%] translate-x-[-50%] text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-600 font-semibold">Learn your differences</p>
                    <p id="comp" className="absolute translate-y-[-50px] left-[50%] translate-x-[-50%] text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-600 font-semibold">And make compromises</p>
                </div>
                <div ref={comRef} className="mx-auto relative h-[250px] max-w-3xl">
                    <img src="/c1.svg" alt="" className="c1 absolute left-0 opacity-0" />
                    <img src="/c2.svg" alt="" className="c2 absolute right-0 opacity-0" />
                    <img src="/i2.svg" alt="" className="i1 absolute opacity-0" />
                    <img src="/i1.svg" alt="" className="i2 absolute right-0 opacity-0" />
                </div>
            </div>

        </section >
    )
}


function Q({ title, id }: { title: string, id: string }) {
    return (
        <h3 id={id} className={`${id} absolute top-0 text-2xl font-bold text-white translate-y-[200px] opacity-0`}>
            {title}
        </h3>
    )
}