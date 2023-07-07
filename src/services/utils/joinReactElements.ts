export const joinReactElement = (elements: JSX.Element[], separator: JSX.Element) => {
    return elements.reduce((acc, el) => {
        return acc.length === 0 ? [el] : [...acc, separator, el];
    }, [] as JSX.Element[]);
}