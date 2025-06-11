"use client";
import React, { useState } from "react";
import { default as NextLink } from "next/link";
import { Link as SanityLink } from "sanity-plugin-link-field/component";
import useQueryInternalLink from "./use-query-data";

const getLink = (props) => {
  if (props && typeof props === "string") {
    return {
      link: props,
      children: "",
      type: "external",
    };
  }

  if (props && props?.type === "internal") {
    return {
      link: props,
      children: props?.text || "",
      type: props?.type || "",
    };
  }

  if ((props && props?.type === "email") || props?.type === "phone") {
    const email = props?.email;
    const phone = props?.phone;
    return {
      link: email || phone,
      children: props?.text || "",
      type: props?.type || "",
    };
  }

  return {
    link: "",
    children: "Invalid Link",
    type: "Invalid Type",
  };
};

const Link = ({
  onClick,
  lang,
  goToRootIfNoMatch,
  children,
  className,
  style,
  to,
  ...props
}) => {
  const { link: trueTo, children: altChildren, type: trueType } = getLink(to);
  const data = useQueryInternalLink(to, trueTo);

  const linkIsExternal = to?.type === "external" || trueType === "external";
  const linkRef = React.useRef(null);


  if (linkIsExternal) {
    return (
      <a
        ref={linkRef}
        href={to?.url || trueTo}
        target={to?.blank ? "_blank" : null}
        className={className}
        {...props}
      >
        {children || altChildren}
      </a>
    );
  }

  if (trueType === "email" || trueType === "phone") {
    const type = {
      email: "mailto:",
      phone: "tel:",
    };
    return (
      <a
        ref={linkRef}
        href={`${type[trueType]}${trueTo}`}
        rel="nofollow noreferrer noopener"
        className={className}
        {...props}
      >
        {children || altChildren}
      </a>
    );
  }

  return (
    <SanityLink
      target="_self"
      as={NextLink}
      link={to?.internalLink?._ref ? data : trueTo}
      className={className}
      {...props}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {children || altChildren}
    </SanityLink>
  );
};

export default Link;
