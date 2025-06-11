import React from "react";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/sanity/lib/client";
import Image from "next/image";

const classNames = (...classes) =>
  classes
    .filter((x) => !!x)
    .map((x) => x.trim())
    .join(" ");

const SanityAsset = ({
  alt,
  asset,
  style,
  className,
  objectFit = "cover",
  objectPosition: overrideObjPosition,
  muted,
  ...props
}) => {
  const objectPosition = overrideObjPosition || asset?.objectPosition;
  
  const defaultStyles = {
    objectFit,
    objectPosition,
    "--object-fit": objectFit,
    "--object-position": objectPosition,
    pointerEvents: muted ? "none" : "all",
    aspectRatio:
      asset?.width && asset?.height && !asset.isImage
        ? asset.width / asset.height
        : "unset",
    ...(style || {}),
  };

  if (!asset) {
    return (
      <div
        className={classNames("atl-asset", className)}
        style={defaultStyles}
      />
    );
  }

  if (asset && asset?._type === "image") {
    const generatedAltData =
      asset?.smartTags && asset.smartTags.length > 0
        ? `Image of ${asset.smartTags[0]}`
        : "";
    if (asset.format === "svg") {
      return (
        <img
          alt={alt || asset.alt || generatedAltData}
          src={asset.url || undefined}
          className={classNames("atl-asset", className)}
          style={defaultStyles}
        />
      );
    }

    if (asset?._type === "image" && asset.asset?._ref) {
      const builder = imageUrlBuilder(client);
      const imageUrl = builder.image(asset).url();

      return (
        <div
          key={props.key}
          style={{
            objectFit: "cover",
            pointerEvents: "all",
            aspectRatio: "unset",
            position: "relative",
            overflow: "hidden"
          }}

          className={classNames("sanity-image-wrapper atl-asset", className)}
        >
            <div style={{
              maxWidth: "1600px",
              display: "block",
            }}>
              <img 
                alt="" 
                role="presentation" 
                aria-hidden="true" 
                src="data:image/svg+xml;charset=utf-8,%3Csvg%20height='1948.7179487179487'%20width='1600'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E" 
                style={{
                  maxWidth: "100%",
                  display: "block",
                  position: "static",
                }}
              />
            </div>
            <Image
              src={imageUrl}
              priority={true}
              alt={alt || asset.alt || generatedAltData}
              fill={true}
              quality={100}
              sizes="100%"
              style={{ objectFit: "cover", objectPosition }}
            />
        </div>
      );
    }
  }

  // Nothing exists
  return (
    <div className={classNames("atl-asset", className)} style={defaultStyles} />
  );
};

export default SanityAsset;
