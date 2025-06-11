import React from 'react';
interface SanityLinkProps {
    onClick?:(event: React.MouseEvent<HTMLAnchorElement>) => void,
    lang?: string,
    goToRootIfNoMatch?: boolean
    children?: string | React.ReactNode | React.ReactNode[]
    className?: string
    style?: React.CSSProperties
    to?: string | object
}
declare const Link: ({ onClick, lang, goToRootIfNoMatch, children, className, style, to }: SanityLinkProps) => JSX.Element;
export default Link;
