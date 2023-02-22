import gsap, { SteppedEase } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react"

import { ProfileIcon } from "../components/header";
import { Option } from "./create-questions";

gsap.registerPlugin(ScrollTrigger);

function NavBar() {
    const navRef = useRef<HTMLElement>(null)
    const router = useRouter()
    function scrollfunc() {
        if (document.documentElement.scrollTop > 70) {
            navRef.current!.classList.add("navbar")
        } else {
            navRef.current!.classList.remove("navbar")
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", scrollfunc)
        return () => {
            window.removeEventListener("scroll", scrollfunc)
        }
    }, [])
    const { data, status } = useSession()
    if (status === "authenticated") {
        router.push("/home")
    }

    return (
        <nav ref={navRef} className="container flex max-w-4xl items-center justify-between rounded-full px-4 py-2">
            <h1 className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-600">
                <span className="">
                    BondBetter
                </span>
            </h1>
            <SigninButton title="Sign in" />
        </nav>
    )
}

export default function LandingePage() {
    useEffect(() => {
        gsap.fromTo("#hero-content", { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: .5 })
    }, [])
    return (
        <div className="">
            <header className="fixed top-2; z-10 w-full flex items-center justify-center py-3 px-3">
                <NavBar />
            </header>
            <main className="flex flex-col items-center w-full">
                <section className="relative pt-40 mx-auto w-full px-4 sm:px-6 lg:px-8 min-h-screen overflow-hidden bg-[#fcf5eb]">
                    <div className="absolute top-0 left-[50%] w-[300px] translate-x-[-50%] h-[300px]  bg-no-repeat bg-[url('/stripes.png')]">
                    </div>
                    <div className="absolute top-[-300px] left-[50%] w-[300px] translate-x-[-50%] h-[300px] bg-gradient-to-b from-white to-pink-500 stripe-mask drop-down ">
                    </div>

                    <div className="absolute right-0  rotate-[270deg] top-[50%] w-[200px] translate-y-[-50%] h-[400px] bg-no-repeat bg-[url('/stripes.png')]">
                    </div>
                    <div className="absolute right-0  rotate-[270deg] top-[50%] w-[200px] translate-y-[-50%] h-[400px] bg-gradient-to-t from-white to-pink-500 stripe-mask move-left">
                    </div>

                    <div className="absolute bottom-0 left-[50%] w-[300px] translate-x-[-50%] h-[300px]  bg-no-repeat bg-[url('/stripes.png')]">
                    </div>
                    <div className="absolute bottom-[-300px] left-[50%] w-[300px] translate-x-[-50%] h-[300px] bg-gradient-to-t from-white to-pink-500 stripe-mask move-up">
                    </div>


                    <div className="absolute left-0  rotate-90 top-[50%] w-[200px] translate-y-[-50%] h-[400px]  bg-no-repeat bg-[url('/stripes.png')]">
                    </div>
                    <div className="absolute left-0  rotate-90 top-[50%] w-[200px] translate-y-[-50%] h-[400px]  bg-gradient-to-t from-white to-pink-500 stripe-mask move-right">
                    </div>

                    <div id="hero-content" className="m-auto py-16 rounded lg: max-w-5xl z-10 hero-container">
                        <div className="w-full mx-auto max-w-xl text-center lg:max-w-4xl">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl xl:text-7xl">Learn Five New Things About Your Partner Daily</h1>
                            <h2 className="mt-4 text-lg font-normal leading-7 text-gray-700 sm:text-xl lg:mx-auto lg:max-w-3xl xl:text-2xl xl:leading-9">
                                Answer five questions daily with your partner  every day to help you know each other better.
                            </h2>
                        </div>
                    </div>
                </section>

                <section className="max-w-8xl bg-white  mt-32 mb-8 sm:mb-16 px-4">
                    <h3 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl xl:text-4xl">
                        Answer daily questions with your partner.
                    </h3>
                </section>
                <div className="w-full flex flex-col gap-8">
                    <QuestionsDemo />
                    <Answers />
                    <CustomDemo />
                    <ResponseDemo />
                    <BondBetter />

                    <section className="relative mx-auto w-full px-4 sm:px-6 lg:px-8 min-h-screen overflow-hidden bg-[#fcf5eb]">
                        <div className="absolute top-0 left-[50%] w-[300px] translate-x-[-50%] h-[300px]  bg-no-repeat bg-[url('/stripes.png')]">
                        </div>
                        <div className="absolute top-[-300px] left-[50%] w-[300px] translate-x-[-50%] h-[300px] bg-gradient-to-b from-white to-pink-500 stripe-mask drop-down ">
                        </div>

                        <div className="absolute right-0  rotate-[270deg] top-[50%] w-[200px] translate-y-[-50%] h-[400px] bg-no-repeat bg-[url('/stripes.png')]">
                        </div>
                        <div className="absolute right-0  rotate-[270deg] top-[50%] w-[200px] translate-y-[-50%] h-[400px] bg-gradient-to-t from-white to-pink-500 stripe-mask move-left">
                        </div>

                        <div className="absolute bottom-0 left-[50%] w-[300px] translate-x-[-50%] h-[300px]  bg-no-repeat bg-[url('/stripes.png')]">
                        </div>
                        <div className="absolute bottom-[-300px] left-[50%] w-[300px] translate-x-[-50%] h-[300px] bg-gradient-to-t from-white to-pink-500 stripe-mask move-up">
                        </div>


                        <div className="absolute left-0  rotate-90 top-[50%] w-[200px] translate-y-[-50%] h-[400px]  bg-no-repeat bg-[url('/stripes.png')]">
                        </div>
                        <div className="absolute left-0  rotate-90 top-[50%] w-[200px] translate-y-[-50%] h-[400px]  bg-gradient-to-t from-white to-pink-500 stripe-mask move-right">
                        </div>

                        <div className="container absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] py-16 rounded lg:max-w-5xl z-10 hero-container">
                            <div className="flex justify-center">
                                <button onClick={() => signIn("google")} role="button"
                                    className="px-8 py-2 text-3xl sm:text-5xl sm:px-32 sm:py-16 border border-2 border-black rounded-full">
                                    Get Started Now!
                                </button>
                            </div>
                        </div>
                    </section>
                </div>


            </main>
        </div>
    )
}


function BondBetter() {

    useEffect(() => {
        const h = window.innerHeight
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".bond",
                start: `+=${(h / 2) + 75}px bottom`,
                end: "+=1000px",
                scrub: true,
                pin: true
            }
        })
        tl.to(".bond", { x: 0 })
            .to(".bond", { scale: 70 })
    })
    return (
        <section className="sec bg-[#fcf5eb] py-8 md:py-32 mt-8 md:mt-24 w-full h-[1500px] flex flex-col items-center overflow-hidden">
            <div className="container w-full px-2 flex justify-center text-2xl sm:text-3xl md:text-4xl">
                <p className="max-w-4xl text-center font-bold">The goal of BondBetter is literally the name, which is to help couples...</p>
            </div>
            <h6 className="bond text-center h-[150px] flex flex-col items-center justify-center tracking-tight text-4xl sm:text-7xl md:text-9xl w-full
             font-bold translate-x-[100%]"
            >
                BOND BETTER
            </h6>
        </section>
    )
}

function SigninButton({ title }: { title: string }) {
    return (
        <button onClick={() => signIn("google")} role="button" className="px-8 py-2 rounded-full shadow text-white font-bold bg-gradient-to-r from-amber-400 to-pink-600">
            {title}
        </button>
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
                                <div className="text-left mb-4 mt-4">
                                    <h3 className="text-gray-800 font-bold mb-2">What is a book, movie, or TV show that had a significant impact on you?</h3>
                                    <div className="border-l rounded border-l-4 p-0 pl-2 border-purple-500 mb-2">
                                        <span className="text-sm text-purple-500 font-bold">You</span>
                                        <p className="text-gray-600">Harry potter</p>
                                    </div>

                                    <div className="border-l rounded border-l-4 p-0 pl-2 border-green-500 mb-2">
                                        <span className="text-sm text-green-500 font-bold">Partner's name</span>
                                        <p className="text-gray-600">F.R.I.E.N.D.S</p>
                                    </div>

                                </div>
                                <div className="text-left mb-4 mt-4">
                                    <h3 className="text-gray-800 font-bold mb-2">What is a personal accomplishment that you are most proud of?</h3>
                                    <div className="border-l rounded border-l-4 p-0 pl-2 border-purple-500 mb-2">
                                        <span className="text-sm text-purple-500 font-bold">You</span>
                                        <p className="text-gray-600">Learning another language (spanish)</p>
                                    </div>

                                    <div className="border-l rounded border-l-4 p-0 pl-2 border-green-500 mb-2">
                                        <span className="text-sm text-green-500 font-bold">Partner's name</span>
                                        <p className="text-gray-600">Graduating from college!</p>
                                    </div>

                                </div>
                                <div className="text-left mb-4 mt-4">
                                    <h3 className="text-gray-800 font-bold mb-2">What is a place you have always wanted to visit but haven't?</h3>
                                    <div className="border-l rounded border-l-4 p-0 pl-2 border-purple-500 mb-2">
                                        <span className="text-sm text-purple-500 font-bold">You</span>
                                        <p className="text-gray-600">There are a few. Milan, Lagos and Barcelona</p>
                                    </div>

                                    <div className="border-l rounded border-l-4 p-0 pl-2 border-green-500 mb-2">
                                        <span className="text-sm text-green-500 font-bold">Partner's name</span>
                                        <p className="text-gray-600">Barcelona 100%</p>
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
                                    By reviewing both your and your partner's answers, you can gain a deeper understanding of each other.
                                    Keep in mind that if your partner chooses not to answer a particular question,
                                    they won't be able to see your answer to that question either.
                                </p>
                            </div>
                            <div className="mt-10 flex gap-2">
                                <SigninButton title="Get started" />
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
                                        <p className="text-gray-800 font-bold">What's your favorite childhood memory?</p>
                                    </div>
                                    <p className="border-l border-green-500 rounded border-l-4 px-2 text-gray-700">Our first family trip to Paris</p>
                                </div>
                                <div className="my-4">
                                    <div className="flex gap-3 mb-3 items-start">
                                        <p className="text-gray-800 font-bold">What are your hobbies and interests outside of work?</p>
                                    </div>
                                    <p className="border-l border-green-500 rounded border-l-4 px-2 text-gray-700">
                                        I like to learn new things, like history, a new language etc. been reading about evolution lately
                                    </p>
                                </div>
                                <div className="my-4">
                                    <div className="flex gap-3 mb-3 items-start">
                                        <p className="text-gray-800 font-bold">What's one skill you have that many people don't know about knows about?</p>
                                    </div>
                                    <p className="border-l border-green-500 rounded border-l-4 px-2 text-gray-700">I'm good with my feet, hands and mouth!</p>
                                </div>
                                <div className="my-4">
                                    <div className="flex gap-3 mb-3 items-start">
                                        <p className="text-gray-800 font-bold">Do you prefer books or movies?</p>
                                    </div>
                                    <p className="border-l border-green-500 rounded border-l-4 px-2 text-gray-700">I prefer movies, they seem faster.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-2xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                        <div>
                            <h4 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl xl:text-4xl">Receive reponses</h4>
                            <div className="mt-4 text-gray-700 text-lg ">
                                <p>
                                    You can conveniently access all the responses to your personalized questions in a single location,
                                    making it easy to review and analyze the reponses you have received.
                                </p>
                            </div>
                            <div className="mt-10 flex gap-2">
                                <SigninButton title="Get started" />
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
        <section className="py-8 md:py-32 w-full bg-[#fcf5eb] flex flex-col items-center">
            <div className="container relative  w-full sm:my-24">
                <div className="w-full grid gap-x-16 gap-y-8 lg:grid-cols-2">
                    <div className="max-w-2xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                        <div>
                            <h4 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl xl:text-4xl">Create up to 25 custom questions</h4>
                            <div className="mt-4 text-gray-700 text-lg ">
                                <p>
                                    You can effortlessly generate customized questions that you're curious to know about
                                    your partner or someone you just started talking wtih and share a link with them to gather their responses.
                                </p>
                            </div>
                            <div className="mt-10 flex gap-2">
                                <SigninButton title="Get started" />

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
            .to(".q-2", { duration: 1, delay: 6, y: 0, opacity: 0 })

        let wid = window.getComputedStyle(comRef.current!).width
        wid = wid.substring(0, wid.length - 2)
        const mid = (parseInt(wid) / 2) - 70
        const mid2 = (parseInt(wid) / 2) - 75
        const c1 = gsap.timeline({ repeat: -1 })
        c1.to(".c1", { duration: 1, x: mid, opacity: 1 })
            .to(".c1", { duration: 0, color: "green" })
            .to(".c1", { duration: 1, delay: 2, scale: 0 })
            .to(".c1", { duration: 1, delay: 7 })

        const c2 = gsap.timeline({ repeat: -1 })
        c2.to(".c2", { duration: 1, x: 0 - mid, opacity: 1 })
            .to(".c2", { duration: 0, color: "green" })
            .to(".c2", { duration: 1, delay: 2, x: 0 - mid, scale: 0 })
            .to(".c2", { duration: 1, delay: 7 })

        const i1 = gsap.timeline({ repeat: -1, })
        i1.to(".i1", { duration: 1, x: mid2 - 22, delay: 4, opacity: 1 })
            .to(".i1", { duration: 0, color: "red" })
            .to(".i1", { duration: 0.7, delay: 3 })
            .to(".i1", { duration: 0.3, delay: 1, x: mid2 })
            .to(".i1", { duration: 0, color: "green" })
            .to(".i1", { duration: 1, delay: 1, scale: 0 })


        const i2 = gsap.timeline({ repeat: -1 })
        i2.to(".i2", { duration: 1, x: 0 - mid2 + 22, delay: 4, opacity: 1 })
            .to(".i2", { duration: 0, color: "red" })
            .to(".i2", { duration: 0.7, delay: 3, rotateX: 180 })
            .to(".i2", { duration: 0.3, delay: 1, x: 0 - mid2 })
            .to(".i2", { duration: 0, color: "green" })
            .to(".i2", { duration: 1, delay: 1, scale: 0 })

        const tlHeader = gsap.timeline({ repeat: -1 })
        tlHeader.to("#simi", { duration: 1, y: 0 })
            .to("#simi", { duration: 1, delay: 2, y: -50 })
            .to("#diff", { duration: 1, y: 0 })
            .to("#diff", { duration: 1, delay: 2, y: -50 })
            .to("#comp", { duration: 1, y: 0 })
            .to("#comp", { duration: 1, delay: 2, y: -50 })


        const type = gsap.timeline({ repeat: -1 })
        type.fromTo(".a1", { delay: 1, width: 0, opacity: 1, duration: 2 }, { duration: 2, width: "100%", ease: SteppedEase.config(37) })
            .to(".a1", { opacity: 0, delay: 1, duration: 1 })
            .fromTo(".a2", { delay: 10, width: 0, opacity: 1, duration: 2 }, { duration: 2, width: "100%", ease: SteppedEase.config(37) })
            .to(".a2", { delay: 0, duration: 1, width: 0 })
            .fromTo(".a3", { delay: 5, width: 0, opacity: 1, duration: 2 }, { duration: 2, width: "100%", ease: SteppedEase.config(37) })
            .to(".a3", { opacity: 0, delay: 2, duration: 1 })




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
                <div className="w-[min(100vw,900px)] grid grid-cols-2 gap-8 bg-purple-500 px-4 md:px-16 md:rounded-lg">
                    <div className="py-16 flex flex-col">
                        <div className="self-start w-fit gap-1 flex flex-col items-center">
                            <div className="h-8 w-8 text-purple-300">
                                {ProfileIcon()}
                            </div>
                            <h4 className="text-white font-bold">You</h4>
                        </div>
                        <div className="w-full h-[200px] sm:h-[170px] relative mt-16 overflow-y-hidden rounded my-auto flex flex-col justify-end gap-10">
                            <Q title="Do you sleep with the lights on of off?" id="q-1" />
                            <Q title="Would rather you cook or do the dishes?" id="q-2" />
                            <div className="relative w-full sm:w-[80%] h-8 self-start  text-left bg-transparent font-bold border-b px-3 py-1 focus:outline-none text-white text-lg">
                                <p className="a1 absolute top-0  opacity-0 left-0 overflow-hidden">With the lights off</p>
                                <p className="a2 absolute top-0 opacity-0 left-0 overflow-hidden">I hate both</p>
                                <p className="a3 absolute top-0 opacity-0 left-0 overflow-hidden">I'll consider doing the dishes</p>
                            </div>
                        </div>
                    </div>
                    <div className="py-16 text-right flex flex-col">
                        <div className="self-end w-fit flex flex-col gap-1 items-center">
                            <div className="h-8 w-8 text-purple-300">
                                {ProfileIcon()}
                            </div>
                            <h4 className="text-white font-bold">Partner</h4>
                        </div>
                        <div className="w-full h-[200px] sm:h-[170px] relative mt-16 overflow-y-hidden rounded my-auto flex flex-col items-end justify-end gap-10">
                            <Q title="Do you sleep with the lights on of off?" id="q-1" />
                            <Q title="Would you cooks or do the dishes?" id="q-2" />
                            <div className="relative w-full sm:w-[80%] h-8 text-left border-b px-3 py-1 self-end text-white text-lg font-bold" >
                                <p className="a1 absolute top-0 opacity-0 left-0 overflow-hidden">I prefer the lights off!</p>
                                <p className="a2 absolute top-0 opacity-0 left-0 overflow-hidden">Neither</p>
                                <p className="a3 absolute top-0 opacity-0 left-0 overflow-hidden">I can manage cooking</p>
                            </div>
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
                    <svg className="c1 absolute left-0 opacity-0" width="102" height="197" viewBox="0 0 102 197" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M57.5936 128.463L57.5936 188.494C57.5724 190.599 56.9233 192.61 55.7858 194.098C54.6474 195.587 53.1094 196.435 51.4998 196.463H6.97473C5.35859 196.463 3.80858 195.623 2.6658 194.129C1.52302 192.634 0.880981 190.607 0.880981 188.494L0.880981 128.463C0.880981 126.349 1.52302 124.322 2.6658 122.828C3.80858 121.333 5.35859 120.494 6.97473 120.494L51.4998 120.494C53.1094 120.521 54.6474 121.37 55.7858 122.858C56.9233 124.347 57.5724 126.358 57.5936 128.463ZM45.4061 180.525L45.4061 136.431H12.906L12.906 180.525H45.4061Z" fill="currentColor" />
                        <path d="M57.5937 68.5375L57.5937 128.463C57.5937 130.576 56.9519 132.603 55.8087 134.097C54.6663 135.592 53.1161 136.431 51.5 136.431H6.97499C6.17167 136.446 5.37436 136.249 4.63011 135.854C3.88586 135.458 3.2097 134.872 2.64168 134.129C2.07366 133.386 1.62516 132.502 1.32283 131.529C1.02042 130.556 0.870268 129.513 0.881237 128.463L0.881237 68.5375C0.870268 67.4867 1.02042 66.4444 1.32283 65.4712C1.62516 64.4979 2.07366 63.6139 2.64168 62.8712C3.2097 62.1285 3.88586 61.542 4.63011 61.1468C5.37436 60.7505 6.17167 60.555 6.97499 60.5688L51.5 60.5688C53.1161 60.5688 54.6663 61.4082 55.8087 62.9031C56.9519 64.397 57.5937 66.4242 57.5937 68.5375ZM45.4062 120.494L45.4062 76.5063H12.9062L12.9062 120.494H45.4062Z" fill="currentColor" />
                        <path d="M57.5937 8.5063L57.5937 68.5375C57.5726 70.6423 56.9234 72.6537 55.7859 74.1422C54.6476 75.6308 53.1096 76.4787 51.5 76.5063L6.97491 76.5063C5.35877 76.5063 3.80876 75.6669 2.66598 74.172C1.5232 72.6781 0.881165 70.6508 0.881165 68.5375L0.881165 8.5063C0.881165 6.39298 1.5232 4.36573 2.66598 2.87186C3.80876 1.37692 5.35877 0.537547 6.97491 0.537547L51.5 0.537547C53.1096 0.565172 54.6476 1.41305 55.7859 2.90161C56.9234 4.39017 57.5726 6.40148 57.5937 8.5063ZM45.4062 60.5688L45.4062 16.475L12.9062 16.475L12.9062 60.5688L45.4062 60.5688Z" fill="currentColor" />
                        <path d="M101.464 68.8736V68.8787L101.464 128.121L101.464 128.126C101.474 129.114 101.332 130.092 101.045 131.002L101.044 131.003C100.758 131.913 100.335 132.733 99.8046 133.417C99.2748 134.101 98.6513 134.631 97.9753 134.986C97.3001 135.339 96.5838 135.512 95.8663 135.499V135.499H95.8575H51.2374C49.7975 135.499 48.3813 134.762 47.3147 133.386L47.3146 133.385C46.245 132.006 45.6306 130.114 45.6306 128.121L45.6306 68.8787C45.6306 66.8865 46.245 64.9937 47.3146 63.6149L47.3148 63.6146C48.3813 62.2377 49.7975 61.5007 51.2374 61.5007L95.8575 61.5007L95.866 61.5006C96.5841 61.4884 97.3003 61.6604 97.9749 62.0147L97.9754 62.015C98.6513 62.3691 99.2748 62.8997 99.8047 63.5832C100.335 64.2668 100.758 65.0869 101.044 65.9974L101.045 65.9977C101.332 66.9077 101.474 67.8855 101.464 68.8736ZM89.7508 120.743H90.2508V120.243V76.7567V76.2567H89.7508H57.1813H56.6813V76.7567L56.6813 120.243V120.743H57.1813H89.7508Z" fill="currentColor" stroke="currentColor" />
                    </svg>
                    <svg className="c2 absolute right-0 opacity-0" width="96" height="195" viewBox="0 0 96 195" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M43.3493 67.679L43.3493 7.93113C43.3688 5.83615 43.9687 3.83475 45.0198 2.35322C46.0716 0.871791 47.4928 0.0273888 48.98 0L90.1218 0C91.6151 0 93.0473 0.835624 94.1033 2.32298C95.1592 3.81033 95.7525 5.82769 95.7525 7.93113V67.679C95.7525 69.7824 95.1592 71.7998 94.1033 73.2871C93.0473 74.7745 91.6151 75.6101 90.1218 75.6101H48.98C47.4928 75.5827 46.0716 74.7383 45.0198 73.2569C43.9687 71.7753 43.3688 69.7739 43.3493 67.679ZM54.6107 15.8623L54.6107 59.7478H84.6412V15.8623L54.6107 15.8623Z" fill="currentColor" />
                        <path d="M43.3491 127.321L43.3491 67.6789C43.3491 65.5755 43.9422 63.5581 44.9986 62.0708C46.0541 60.5834 47.4866 59.7478 48.9798 59.7478L90.1215 59.7478C90.8638 59.7335 91.6005 59.9291 92.2882 60.3225C92.9759 60.716 93.6007 61.2998 94.1256 62.039C94.6504 62.7784 95.0648 63.6584 95.3442 64.627C95.6236 65.5957 95.7624 66.6335 95.7522 67.6789V127.321C95.7624 128.367 95.6236 129.404 95.3442 130.373C95.0648 131.342 94.6504 132.221 94.1256 132.961C93.6007 133.7 92.9759 134.283 92.2882 134.677C91.6005 135.071 90.8638 135.266 90.1215 135.252H48.9798C47.4866 135.252 46.0541 134.417 44.9986 132.929C43.9422 131.442 43.3491 129.424 43.3491 127.321ZM54.6106 75.6101L54.6106 119.39H84.641V75.6101H54.6106Z" fill="currentColor" />
                        <path d="M43.3491 187.069L43.3491 127.321C43.3687 125.226 43.9685 123.224 45.0196 121.743C46.0714 120.261 47.4926 119.417 48.9799 119.39H90.1216C91.6149 119.39 93.0472 120.225 94.1031 121.713C95.1591 123.2 95.7523 125.218 95.7523 127.321V187.069C95.7523 189.172 95.1591 191.19 94.1031 192.677C93.0472 194.165 91.6149 195 90.1216 195H48.9799C47.4926 194.972 46.0714 194.129 45.0196 192.647C43.9685 191.166 43.3687 189.164 43.3491 187.069ZM54.6106 135.252L54.6106 179.138H84.641V135.252H54.6106Z" fill="currentColor" />
                        <path d="M0.500488 187.012V187.007L0.500511 127.365L0.500465 127.361C0.491138 126.362 0.623268 125.372 0.889229 124.452L0.889328 124.452C1.15474 123.531 1.54626 122.704 2.0351 122.015C2.52396 121.326 3.09663 120.795 3.71281 120.443C4.32761 120.091 4.97562 119.922 5.62158 119.934V119.934H5.63119H46.7729C48.0675 119.934 49.3612 120.658 50.3464 122.046L50.3465 122.047C51.3338 123.437 51.9036 125.349 51.9036 127.365L51.9036 187.007C51.9036 189.023 51.3338 190.936 50.3465 192.326L50.3463 192.326C49.3612 193.715 48.0675 194.438 46.7729 194.438L5.63119 194.438L5.62194 194.439C4.97535 194.451 4.32743 194.282 3.71326 193.929L3.71276 193.929C3.09662 193.577 2.52395 193.046 2.03508 192.357C1.54626 191.669 1.15475 190.841 0.889328 189.921L0.889229 189.92C0.623264 189 0.491138 188.011 0.500488 187.012ZM11.2619 134.796H10.7619V135.296L10.7619 179.076V179.576H11.2619H41.2923H41.7923V179.076V135.296V134.796H41.2923H11.2619Z" fill="currentColor" stroke="currentColor" />
                        <path d="M0.500488 67.5786V67.5739L0.500511 7.93186L0.500465 7.92719C0.491138 6.92813 0.623268 5.9388 0.889229 5.01882L0.889328 5.01848C1.15474 4.09792 1.54626 3.27016 2.0351 2.5814C2.52396 1.89273 3.09663 1.36202 3.71281 1.00945C4.32761 0.657666 4.97562 0.488217 5.62158 0.500637V0.500729H5.63119L46.7729 0.500729C48.0675 0.500729 49.3612 1.22487 50.3464 2.61308L50.3465 2.61321C51.3338 4.00346 51.9036 5.91568 51.9036 7.93186L51.9036 67.5739C51.9036 69.59 51.3338 71.5025 50.3465 72.8922L50.3463 72.8925C49.3612 74.2811 48.0675 75.0051 46.7729 75.0051L5.63119 75.005L5.62194 75.0051C4.97535 75.0171 4.32743 74.8484 3.71326 74.4961L3.71276 74.4958C3.09662 74.1433 2.52395 73.6126 2.03508 72.9241C1.54626 72.2355 1.15475 71.4079 0.889328 70.4873L0.889229 70.487C0.623264 69.567 0.491138 68.5781 0.500488 67.5786ZM11.2619 15.363H10.7619V15.863L10.7619 59.6428V60.1428H11.2619H41.2923H41.7923V59.6428V15.863V15.363H41.2923L11.2619 15.363Z" fill="currentColor" stroke="currentColor" />
                    </svg>
                    <svg className="i1 absolute opacity-0" width="102" height="197" viewBox="0 0 102 197" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M57.5936 128.463L57.5936 188.494C57.5724 190.599 56.9233 192.61 55.7858 194.098C54.6474 195.587 53.1094 196.435 51.4998 196.463H6.97473C5.35859 196.463 3.80858 195.623 2.6658 194.129C1.52302 192.634 0.880981 190.607 0.880981 188.494L0.880981 128.463C0.880981 126.349 1.52302 124.322 2.6658 122.828C3.80858 121.333 5.35859 120.494 6.97473 120.494L51.4998 120.494C53.1094 120.521 54.6474 121.37 55.7858 122.858C56.9233 124.347 57.5724 126.358 57.5936 128.463ZM45.4061 180.525L45.4061 136.431H12.906L12.906 180.525H45.4061Z" fill="currentColor" />
                        <path d="M57.5937 68.5375L57.5937 128.463C57.5937 130.576 56.9519 132.603 55.8087 134.097C54.6663 135.592 53.1161 136.431 51.5 136.431H6.97499C6.17167 136.446 5.37436 136.249 4.63011 135.854C3.88586 135.458 3.2097 134.872 2.64168 134.129C2.07366 133.386 1.62516 132.502 1.32283 131.529C1.02042 130.556 0.870268 129.513 0.881237 128.463L0.881237 68.5375C0.870268 67.4867 1.02042 66.4444 1.32283 65.4712C1.62516 64.4979 2.07366 63.6139 2.64168 62.8712C3.2097 62.1285 3.88586 61.542 4.63011 61.1468C5.37436 60.7505 6.17167 60.555 6.97499 60.5688L51.5 60.5688C53.1161 60.5688 54.6663 61.4082 55.8087 62.9031C56.9519 64.397 57.5937 66.4242 57.5937 68.5375ZM45.4062 120.494L45.4062 76.5063H12.9062L12.9062 120.494H45.4062Z" fill="currentColor" />
                        <path d="M57.5937 8.5063L57.5937 68.5375C57.5726 70.6423 56.9234 72.6537 55.7859 74.1422C54.6476 75.6308 53.1096 76.4787 51.5 76.5063L6.97491 76.5063C5.35877 76.5063 3.80876 75.6669 2.66598 74.172C1.5232 72.6781 0.881165 70.6508 0.881165 68.5375L0.881165 8.5063C0.881165 6.39298 1.5232 4.36573 2.66598 2.87186C3.80876 1.37692 5.35877 0.537547 6.97491 0.537547L51.5 0.537547C53.1096 0.565172 54.6476 1.41305 55.7859 2.90161C56.9234 4.39017 57.5726 6.40148 57.5937 8.5063ZM45.4062 60.5688L45.4062 16.475L12.9062 16.475L12.9062 60.5688L45.4062 60.5688Z" fill="currentColor" />
                        <path d="M101.464 68.8736V68.8787L101.464 128.121L101.464 128.126C101.474 129.114 101.332 130.092 101.045 131.002L101.044 131.003C100.758 131.913 100.335 132.733 99.8046 133.417C99.2748 134.101 98.6513 134.631 97.9753 134.986C97.3001 135.339 96.5838 135.512 95.8663 135.499V135.499H95.8575H51.2374C49.7975 135.499 48.3813 134.762 47.3147 133.386L47.3146 133.385C46.245 132.006 45.6306 130.114 45.6306 128.121L45.6306 68.8787C45.6306 66.8865 46.245 64.9937 47.3146 63.6149L47.3148 63.6146C48.3813 62.2377 49.7975 61.5007 51.2374 61.5007L95.8575 61.5007L95.866 61.5006C96.5841 61.4884 97.3003 61.6604 97.9749 62.0147L97.9754 62.015C98.6513 62.3691 99.2748 62.8997 99.8047 63.5832C100.335 64.2668 100.758 65.0869 101.044 65.9974L101.045 65.9977C101.332 66.9077 101.474 67.8855 101.464 68.8736ZM89.7508 120.743H90.2508V120.243V76.7567V76.2567H89.7508H57.1813H56.6813V76.7567L56.6813 120.243V120.743H57.1813H89.7508Z" fill="currentColor" stroke="currentColor" />
                        <path d="M101.334 128.874V128.879L101.334 188.121L101.334 188.126C101.344 189.114 101.201 190.092 100.914 191.002L100.914 191.003C100.627 191.913 100.204 192.733 99.674 193.417C99.1442 194.101 98.5206 194.631 97.8447 194.986C97.1695 195.339 96.4532 195.512 95.7357 195.499V195.499H95.7269H51.1068C49.6669 195.499 48.2507 194.762 47.1841 193.386L47.184 193.385C46.1144 192.006 45.5 190.114 45.5 188.121L45.5 128.879C45.5 126.887 46.1144 124.994 47.1839 123.615L47.1842 123.615C48.2507 122.238 49.6669 121.501 51.1068 121.501L95.7269 121.501L95.7354 121.501C96.4534 121.488 97.1697 121.66 97.8442 122.015L97.8447 122.015C98.5207 122.369 99.1442 122.9 99.674 123.583C100.204 124.267 100.627 125.087 100.914 125.997L100.914 125.998C101.201 126.908 101.344 127.886 101.334 128.874ZM89.6201 180.743H90.1201V180.243V136.757V136.257H89.6201H57.0507H56.5507V136.757L56.5507 180.243V180.743H57.0507H89.6201Z" fill="currentColor" stroke="currentColor" />
                    </svg>

                    <svg className="i2 absolute right-0 opacity-0" width="106" height="195" viewBox="0 0 106 195" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M47.8765 67.679L47.8765 7.93113C47.8981 5.83615 48.5606 3.83475 49.7214 2.35322C50.8831 0.871791 52.4527 0.0273888 54.0953 0L99.5337 0C101.183 0 102.765 0.835624 103.931 2.32298C105.097 3.81033 105.752 5.82769 105.752 7.93113V67.679C105.752 69.7824 105.097 71.7998 103.931 73.2871C102.765 74.7745 101.183 75.6101 99.5337 75.6101H54.0953C52.4527 75.5827 50.8831 74.7383 49.7214 73.2569C48.5606 71.7753 47.8981 69.7739 47.8765 67.679ZM60.314 15.8623L60.314 59.7478H93.4808V15.8623L60.314 15.8623Z" fill="currentColor" />
                        <path d="M47.8763 127.321L47.8763 67.679C47.8763 65.5755 48.5314 63.5582 49.698 62.0708C50.8638 60.5835 52.4459 59.7479 54.0951 59.7479L99.5334 59.7479C100.353 59.7336 101.167 59.9291 101.926 60.3226C102.686 60.7161 103.376 61.2998 103.956 62.0391C104.535 62.7785 104.993 63.6584 105.302 64.6271C105.61 65.5957 105.763 66.6336 105.752 67.679V127.321C105.763 128.367 105.61 129.404 105.302 130.373C104.993 131.342 104.535 132.221 103.956 132.961C103.376 133.7 102.686 134.284 101.926 134.677C101.167 135.071 100.353 135.266 99.5334 135.252H54.0951C52.4459 135.252 50.8638 134.417 49.698 132.929C48.5314 131.442 47.8763 129.424 47.8763 127.321ZM60.3138 75.6101L60.3138 119.39H93.4805V75.6101H60.3138Z" fill="currentColor" />
                        <path d="M47.8763 187.069L47.8763 127.321C47.8979 125.226 48.5604 123.224 49.7212 121.743C50.8829 120.261 52.4525 119.417 54.0951 119.39H99.5335C101.183 119.39 102.765 120.225 103.931 121.713C105.097 123.2 105.752 125.218 105.752 127.321V187.069C105.752 189.172 105.097 191.19 103.931 192.677C102.765 194.165 101.183 195 99.5335 195H54.0951C52.4525 194.972 50.8829 194.129 49.7212 192.647C48.5604 191.166 47.8979 189.164 47.8763 187.069ZM60.3138 135.252L60.3138 179.138H93.4806V135.252H60.3138Z" fill="currentColor" />
                        <path d="M0.500534 187.013V187.007L0.500561 127.365L0.500507 127.36C0.490257 126.366 0.635429 125.382 0.927906 124.466L0.928024 124.465C1.21986 123.549 1.65089 122.723 2.19085 122.034C2.73067 121.345 3.36642 120.81 4.0563 120.453C4.7455 120.096 5.47723 119.921 6.21058 119.934V119.934H6.21928H51.6576C53.1295 119.934 54.5745 120.679 55.6612 122.066L55.6613 122.066C56.751 123.455 57.3764 125.36 57.3764 127.365L57.3764 187.007C57.3764 189.012 56.751 190.918 55.6613 192.307L55.6611 192.307C54.5745 193.694 53.1296 194.439 51.6576 194.439L6.21928 194.438L6.2109 194.439C5.47697 194.451 4.74534 194.277 4.05674 193.92L4.05626 193.919C3.36639 193.562 2.73064 193.027 2.1908 192.338C1.65088 191.65 1.21986 190.824 0.928024 189.908L0.927906 189.907C0.635426 188.991 0.490257 188.007 0.500534 187.013ZM12.438 134.796H11.938V135.296L11.938 179.076V179.576H12.438H45.6047H46.1047V179.076V135.296V134.796H45.6047H12.438Z" fill="currentColor" stroke="currentColor" />
                    </svg>
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