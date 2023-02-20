import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react"
import DisplayQuestion from "../components/DisplayQuestion";
import { ProfileIcon } from "../components/header";
import { Option } from "./create-questions";

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
                    <Link href="signin" role="button" className="px-8 py-2 rounded-full text-white font-bold bg-gradient-to-r from-amber-400 to-pink-600">Sign in</Link>
                </nav>

            </header>
            <main className="flex flex-col items-center w-full pb-[200px]">
                <section className="relative pt-40 mx-auto w-full px-4 sm:px-6 lg:px-8 min-h-screen overflow-hidden">
                    <div className="absolute top-0 z-[-1] left-[50%] w-[300px] translate-x-[-50%] h-[300px]  bg-no-repeat bg-[url('/stripes.png')]">
                    </div>
                    <div className="absolute top-[-300px] z-[-1] left-[50%] w-[300px] translate-x-[-50%] h-[300px] bg-gradient-to-b from-white to-pink-500 stripe-mask drop-down ">
                    </div>

                    <div className="absolute right-0  rotate-[270deg] z-[-1] top-[50%] w-[200px] translate-y-[-50%] h-[400px] bg-no-repeat bg-[url('/stripes.png')]">
                    </div>
                    <div className="absolute right-0  rotate-[270deg] z-[-1] top-[50%] w-[200px] translate-y-[-50%] h-[400px] bg-gradient-to-t from-white to-pink-500 stripe-mask move-left">
                    </div>

                    <div className="absolute bottom-0 z-[-1] left-[50%] w-[300px] translate-x-[-50%] h-[300px]  bg-no-repeat bg-[url('/stripes.png')]">
                    </div>
                    <div className="absolute bottom-[-300px] z-[-1] left-[50%] w-[300px] translate-x-[-50%] h-[300px] bg-gradient-to-t from-white to-pink-500 stripe-mask move-up">
                    </div>


                    <div className="absolute left-0  rotate-90 z-[-1] top-[50%] w-[200px] translate-y-[-50%] h-[400px]  bg-no-repeat bg-[url('/stripes.png')]">
                    </div>
                    <div className="absolute left-0  rotate-90 z-[-1] top-[50%] w-[200px] translate-y-[-50%] h-[400px]  bg-gradient-to-t from-white to-pink-500 stripe-mask move-right">
                    </div>

                    <div className="m-auto bg-white py-16 rounded lg: max-w-5xl hero-container">
                        <div className="w-full mx-auto max-w-xl text-center lg:max-w-4xl">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl xl:text-7xl">Learn Five New Things About Your Partner Daily</h1>
                            <h2 className="mt-4 text-lg font-normal leading-7 text-gray-700 sm:text-xl lg:mx-auto lg:max-w-3xl xl:text-2xl xl:leading-9">
                                Answer five questions daily with your partner  every day to help you know each other better.
                            </h2>
                        </div>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:mt-10">
                            <Link href="/#showcase"
                                className="inline-flex rounded-full h-12 items-center justify-center border border-gray-300 px-6 py-2.5 text-base text-gray-700 transition-all duration-200 hover:border-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                                role="button">Get started</Link>
                        </div>
                    </div>
                </section>

                <section className="max-w-8xl bg-white  mt-32 mb-8 px-4">
                    <h3 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl xl:text-4xl">
                        Answer daily questions with your partner.
                    </h3>
                </section>
                <div className="w-full flex flex-col gap-8">
                    <QuestionsDemo />
                    <Answers />
                    <CustomDemo />
                    <ResponseDemo />
                </div>

            </main>
        </div>
    )
}

function Answers() {
    return (
        <section className="my-8 md:my-24 w-full flex flex-col items-center">
            <div className="container relative  w-full">
                <div className="w-full grid gap-x-16 gap-y-8 lg:grid-cols-2">
                    <div className="order-last lg:order-first w-full">
                        <div className="relative h-[500px] overflow-hidden w-full rounded-2xl bg-purple-500 sm:mt-6 lg:mt-0">
                            <div className="absolute top-16 left-[50%] translate-x-[-50%] bg-white w-[90%] sm:w-[70%] lg:w-[80%] h-[500px] p-4 rounded-2xl">
                                <div className="text-left mb-6 mt-4">
                                    <h3 className="text-gray-800 font-bold mb-2">What is the most spontanious thing you've ever done?</h3>
                                    <div className="border-l rounded border-l-4 p-0 pl-2 border-purple-500 mb-4">
                                        <span className="text-sm text-purple-500 font-bold">You</span>
                                        <p className="text-gray-600">Learned spanish for no reason at all</p>
                                    </div>

                                    <div className="border-l rounded border-l-4 p-0 pl-2 border-green-500 mb-2">
                                        <span className="text-sm text-green-500 font-bold">Partner's name</span>
                                        <p className="text-gray-600">Took a trip to paris!</p>
                                    </div>

                                </div>
                                <div className="text-left mb-6 mt-4">
                                    <h3 className="text-gray-800 font-bold mb-2">What is the most spontanious thing you've ever done?</h3>
                                    <div className="border-l rounded border-l-4 p-0 pl-2 border-purple-500 mb-4">
                                        <span className="text-sm text-purple-500 font-bold">You</span>
                                        <p className="text-gray-600">Learned spanish for no reason at all</p>
                                    </div>

                                    <div className="border-l rounded border-l-4 p-0 pl-2 border-green-500 mb-2">
                                        <span className="text-sm text-green-500 font-bold">Partner's name</span>
                                        <p className="text-gray-600">Took a trip to paris!</p>
                                    </div>

                                </div>
                                <div className="text-left mb-6 mt-4">
                                    <h3 className="text-gray-800 font-bold mb-2">What is the most spontanious thing you've ever done?</h3>
                                    <div className="border-l rounded border-l-4 p-0 pl-2 border-purple-500 mb-4">
                                        <span className="text-sm text-purple-500 font-bold">You</span>
                                        <p className="text-gray-600">Learned spanish for no reason at all</p>
                                    </div>

                                    <div className="border-l rounded border-l-4 p-0 pl-2 border-green-500 mb-2">
                                        <span className="text-sm text-green-500 font-bold">Partner's name</span>
                                        <p className="text-gray-600">Took a trip to paris!</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-2xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                        <div>
                            <h4 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl xl:text-4xl">View your partner's answers</h4>
                            <div className="mt-4 text-gray-700 text-lg ">
                                <p>
                                    See answers provided by you and your partner's to help you learn more about them, for questions your partner doesn't answer they won't also see your answer.
                                </p>
                                <ul className="mt-4">
                                    <li><p>Receive responses</p></li>
                                    <li><p>Grouped by label</p></li>
                                    <li><p>View responses anytime</p></li>

                                </ul>
                            </div>
                            <div className="mt-10 flex gap-2">
                                <Link
                                    className="px-8 py-2 rounded-full text-white font-bold bg-gradient-to-r from-amber-400 to-pink-600 shadow-lg"
                                    href="/signup">Get started</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ResponseDemo() {
    return (
        <section className="my-8 md:my-24 w-full flex flex-col items-center">
            <div className="container relative  w-full">
                <div className="w-full grid gap-x-16 gap-y-8 lg:grid-cols-2">
                    <div className="order-last lg:order-first w-full">
                        <div className="relative h-[500px] overflow-hidden w-full rounded-2xl bg-purple-500 sm:mt-6 lg:mt-0">
                            <div className="absolute top-16 left-[50%] translate-x-[-50%] bg-white w-[90%] sm:w-[70%] lg:w-[80%] h-[500px] p-4 rounded-2xl">
                                <button
                                    className="pb-3 border-b border-purple-500 w-full flex  items-center justify-between"
                                >
                                    <span className="text-gray-700 font-bold self-center">Monica darling</span>
                                    <div className="flex gap-5">
                                        <span
                                            className={`bg-red-100 text-red-500 rounded-full px-3 py-1 shadow`}
                                            onClick={(e) => e.stopPropagation()}
                                        >delete</span>
                                        <span className="rounded-full px-3 py-1 shadow">close</span>
                                    </div>
                                </button>
                                <div className="mt-8 mb-4">
                                    <div className="flex gap-3 mb-3 items-start">
                                        <h3 className="text-gray-800 font-bold">Q1.</h3>
                                        <p className="text-gray-800 font-bold">Do you sleep with the lights on or off?</p>
                                    </div>
                                    <p className="border-l border-purple-500 border-l-[3px] px-2 ml-10 text-gray-500">off</p>
                                </div>
                                <div className="my-4">
                                    <div className="flex gap-3 mb-3 items-start">
                                        <h3 className="text-gray-800 font-bold">Q2.</h3>
                                        <p className="text-gray-800 font-bold">Ghanaian jollof or Nigerian jollof?</p>
                                    </div>
                                    <p className="border-l border-purple-500 border-l-[3px] px-2 ml-10 text-gray-500">Naija jollof for life!</p>
                                </div>
                                <div className="my-4">
                                    <div className="flex gap-3 mb-3 items-start">
                                        <h3 className="text-gray-800 font-bold">Q3.</h3>
                                        <p className="text-gray-800 font-bold mb-2">Do you sleep with the lights on or off?</p>
                                    </div>
                                    <p className="border-l border-purple-500 border-l-[3px] px-2 ml-10 text-gray-500">off</p>
                                </div>
                                <div className="my-4">
                                    <div className="flex gap-3 mb-3 items-start">
                                        <h3 className="text-gray-800 font-bold">Q4.</h3>
                                        <p className="text-gray-800 font-bold">Do you sleep with the lights on or off?</p>
                                    </div>
                                    <p className="border-l border-purple-500 border-l-[3px] px-2 ml-10 text-gray-500">off</p>
                                </div>
                                <div className="my-4">
                                    <div className="flex gap-3 mb-3 items-start">
                                        <h3 className="text-gray-800 font-bold">Q5.</h3>
                                        <p className="text-gray-800 font-bold">Do you sleep with the lights on or off?</p>
                                    </div>
                                    <p className="border-l border-purple-500 border-l-[3px] px-2 ml-10 text-gray-500">off</p>
                                </div>
                                <div className="my-4">
                                    <div className="flex gap-3 mb-3 items-start">
                                        <h3 className="text-gray-800 font-bold">Q6.</h3>
                                        <p className="text-gray-800 font-bold">Do you sleep with the lights on or off?</p>
                                    </div>
                                    <p className="border-l border-purple-500 border-l-[3px] px-2 ml-10 text-gray-500">off</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-2xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                        <div>
                            <h4 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl xl:text-4xl">Receive reponses</h4>
                            <div className="mt-4 text-gray-700 text-lg ">
                                <p>
                                    All responses from your custom questions in one place!
                                </p>
                                <ul className="mt-4">
                                    <li><p>Receive responses</p></li>
                                    <li><p>Grouped by label</p></li>
                                    <li><p>View responses anytime</p></li>

                                </ul>
                            </div>
                            <div className="mt-10 flex gap-2">
                                <Link
                                    className="px-8 py-2 rounded-full text-white font-bold bg-gradient-to-r from-amber-400 to-pink-600 shadow-lg"
                                    href="/signup">Get started</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function CustomDemo() {
    return (
        <section className="py-4 sm:py-8 w-full flex flex-col items-center">
            <div className="container relative  w-full sm:my-24">
                <div className="w-full grid gap-x-16 gap-y-8 lg:grid-cols-2">
                    <div className="max-w-2xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                        <div>
                            <h4 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl xl:text-4xl">Create up to 25 custom questions</h4>
                            <div className="mt-4 text-gray-700 text-lg ">
                                <p>
                                    Easily create custom questions you want to know about your partner and send them a link to receive their respons
                                </p>
                                <ul className="mt-4">
                                    <li><p>Create questions</p></li>
                                    <li><p>Generate link with label <small>eg. name of the person</small></p></li>
                                    <li><p>Receive responses</p></li>
                                </ul>
                            </div>
                            <div className="mt-10 flex gap-2">
                                <Link
                                    className="px-8 py-2 rounded-full text-white font-bold bg-gradient-to-r from-amber-400 to-pink-600 shadow-lg"
                                    href="/signup">Get started</Link>
                            </div>
                        </div>
                    </div>
                    <div className="mx-0 sm:mx-0 w-full">
                        <div className="relative h-[500px] overflow-hidden w-full rounded-2xl bg-purple-500 sm:mt-6 lg:mt-0">
                            <div className="absolute top-16 left-[50%] translate-x-[-50%] bg-white w-[90%] sm:w-[70%] lg:w-[80%] h-[500px] p-4 rounded-2xl">
                                <div className="flex flex-col gap-5 pb-8 border-b">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <label htmlFor="message" className="block mb-2 font-medium text-gray-900 dark:text-white">Q1.</label>
                                            <button
                                                className="rounded-full bg-[var(--primary-lighter)] p-1"
                                                title="remove question"
                                            >
                                                <svg height="20px" width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                                                        <path d="M16 12H8M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                                            stroke="var(--primary-dark)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        >
                                                        </path>
                                                    </g>
                                                </svg>
                                            </button>
                                        </div >
                                        <textarea
                                            id="message" rows={1}
                                            className="block p-2.5 w-full text-gray-600 border rounded-lg outline-none focus:border-[var(--primary)]"
                                            value="What is the name of the go"
                                            readOnly
                                            placeholder="Write your question here...">
                                        </textarea>
                                    </div >
                                    <div className="px-2 w-full flex flex-col gap-2">
                                        <label className="self-start text-sm text-[var(--accents-6)]" title="allow respondents to enter their own answer">
                                            <input type="checkbox" className="self-start accent-[var(--primary-darker)] mr-2 "
                                                checked
                                                readOnly
                                            />
                                            Cutom answer
                                        </label>
                                        <Option option="" remove={() => { }} onChange={(str: string) => { }} />
                                        <Option option="" remove={() => { }} onChange={(str: string) => { }} />
                                        <button
                                            className="rounded-full mt-3 bg-[var(--primary-lighter)] px-4 py-2  self-start flex items-center gap-2 shadow"
                                        >
                                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="var(--primary-darker)" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                                                    <path
                                                        fill="var(--primary-dark)"
                                                        d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z"
                                                    >
                                                    </path>
                                                </g>
                                            </svg>
                                            <span className="text-[var(--primary-dark)] text-sm">Add option</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button
                                        className="rounded-full bg-[var(--primary-darker)] px-4 py-2 shadow mb-10 self-start flex items-center gap-2"
                                    >
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="var(--primary-darker)" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                                                <path
                                                    fill="white"
                                                    d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z"
                                                >
                                                </path>
                                            </g>
                                        </svg>
                                        <span className="text-white">Add Question</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
        <section className="w-full border-b">
            <div className="w-full flex flex-col items-center ">
                <div className="w-full container grid grid-cols-2 gap-8 bg-purple-500  shadow-lg px-4 md:px-16 rounded-lg">
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
            <div className="relative mt-16">
                <div className="h-[50px] relative overflow-hidden mb-10">
                    <p id="simi" className="absolute translate-y-[-50px] left-[50%] translate-x-[-50%] w-fit text-xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-600 font-semibold">Discover your similarities</p>
                    <p id="diff" className="absolute translate-y-[-50px] left-[50%] translate-x-[-50%] w-fit  text-xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-600 font-semibold">Learn your differences</p>
                    <p id="comp" className="absolute translate-y-[-50px] left-[50%] translate-x-[-50%] w-fit text-xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-600 font-semibold">And make compromises</p>
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