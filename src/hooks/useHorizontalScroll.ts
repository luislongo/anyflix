import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";

export const useHorizontalScroll = () => {
    const ref = useRef<HTMLUListElement>(null);
    const [scroll, setScroll] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        if(ref.current === null) return;

        ref.current && ref.current.addEventListener("wheel", (e) => {
            if(ref.current === null) return;
            e.preventDefault();

            if (e.deltaY > 0) {
                ref.current.scrollLeft += 30;
                setScroll(ref.current.scrollLeft);
            } else {
                ref.current.scrollLeft -= 30;
                setScroll(ref.current.scrollLeft);
            }
        });
    }, [ref])

    const scrollTo = (scroll: number) => {
        if(ref.current === null) return;
        ref.current.scrollLeft = scroll;
        setScroll(scroll);
    }

    useLayoutEffect(() => {
        const rect = ref.current?.scrollWidth
        if(rect === undefined) return;

        setWidth(rect || 0);
    })

    return {
        ref,
        scroll,
        scrollTo,
        width
    }
}