"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis()
    lenis.on("scroll", (e) => {})
    lenis.on("scroll", ScrollTrigger.update)
    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, []);

  return <>{children}</>;
}
