import { useMemo, useRef, useState } from "react";

export const useHorizontalScroll = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [scroll, setScroll] = useState(0);

    const scrollTo = useMemo(() => (left: number) => {
        ref.current?.scrollTo({
            left,
            behavior: "smooth"
    })
    setScroll(left)
    }
    , [ref.current])
    
    return {
        ref,
        scroll,
        scrollTo
    }
    
    
}