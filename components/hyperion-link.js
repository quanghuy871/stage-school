"use client"

import React, { useRef } from "react";
import { Link } from "@/primitives";
import { gsap } from "gsap";

const HyperionLink = ({ children, to, className, tag, ...props }) => {
  const bgButtonRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(bgButtonRef.current, {
      x: "0%",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(bgButtonRef.current, {
      x: "-100%",
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(bgButtonRef.current, { x: "100%" });
      },
    });
  };

  if (tag === "button") {
    return (
      <button
        {...props}
        className={className}
        to={to}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        <div
          ref={bgButtonRef}
          className="bg-button bg-charcoal absolute top-0 right-0 left-0 bottom-0 w-full h-full"
          style={{
            transform:
              "translate3d(100%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
          }}
        ></div>
      </button>
    );
  }

  return (
    <Link
      {...props}
      className={className}
      to={to}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        ref={bgButtonRef}
        className="bg-button bg-charcoal absolute top-0 right-0 left-0 bottom-0 w-full h-full"
        style={{
          transform:
            "translate3d(100%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
        }}
      ></div>
    </Link>
  );
};

export default HyperionLink;
