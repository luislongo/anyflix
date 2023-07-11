import { ReactNode } from "react";

export const joinReactNodes = (
    nodes: ReactNode[] | ReactNode,
    separator: ReactNode
): ReactNode[] => {
    if (!Array.isArray(nodes)) {
        return [nodes];
    }
    
    const result: ReactNode[] = [];
    nodes.forEach((node, index) => {
        result.push(node);
        if (index < nodes.length - 1) {
            result.push(separator);
        }
    });
    return result;
}