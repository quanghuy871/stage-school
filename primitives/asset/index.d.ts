import React from 'react';
interface SanityAssetProps {
    alt?: string;
    asset?: any;
    style?: React.CSSProperties;
    className?: string;
    objectFit?: React.CSSProperties['objectFit'];
    objectPosition?: React.CSSProperties['objectPosition'];
    isStatic?: boolean;
}
declare const SanityAsset: ({ alt, asset, style, className, objectFit, objectPosition: overrideObjPosition, isStatic }: SanityAssetProps) => JSX.Element;
export default SanityAsset;
