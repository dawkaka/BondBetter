import { useEffect, useRef } from "react";
import { Loading } from "./loading";

export const Loader: React.FC<{ loadMore: () => void, hasNext: boolean, isFetching: boolean }> = ({ loadMore, hasNext, isFetching }) => {
    const loaderRef = useRef(null)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMore()
                }
            },
            { threshold: 0.5 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={loaderRef}>
            {hasNext && (
                <div style={{ width: "100%", textAlign: "center", paddingBlock: "var(--gap-quarter)", display: "flex", justifyContent: "center" }}>
                    {!isFetching ?
                        <button onClick={() => loadMore()}>Load more</button>
                        :
                        <Loading />
                    }

                </div>
            )
            }
        </div>
    )
}
