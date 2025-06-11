"use client";
import React, { useState } from "react";
import Link from "@/primitives/link";
import Logo from "@/sanity/src/theme/components/logo";
import down from "@/assets/images/chevron-down.svg";
import Image from "next/image";
const Footer = () => {
  const [isActive, setActive] = useState(null);
  return (
    <footer className="h-screen bg-primary md:pt-7 pt-8 md:pb-5 pb-4">
      <div className="inner flex flex-col md:justify-between gap-8 h-full">
        <div className="grid md:grid-cols-[1.7fr_1fr_1.2fr_1.5fr] grid-cols-1 md:gap-6 gap-0">
          {footerMenu.map((m, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className="md:border-l border-neutrals60 md:pl-3 flex flex-col md:gap-10 h-fit"
            >
              <div className="flex justify-between items-end md:pb-0 pb-[10px] md:border-l-0 border-l md:pl-0 pl-3">
                {m.title && (
                  <h2 className="text-paragraph-p1 text-secondary">
                    {m.title}
                  </h2>
                )}
                <Image
                  src={down}
                  width={16}
                  height={16}
                  alt=""
                  className="md:hidden flex"
                />
              </div>
              {m.menu && (
                <div
                  key={i}
                  className={`md:flex flex-col md:pl-0 pl-10 ${isActive === i ? "flex" : "hidden"} ${m.menu?.length === i ? "md:gap-[22px]" : "gap-0"}`}
                >
                  {m.menu.map((item, i) => (
                    <div key={i}>
                      {item.line2 ? (
                        <div key={i} to={"/"} className="">
                          <p className="text-secondary">{item.line1}</p>
                          <p className="text-secondary">{item.line2}</p>
                        </div>
                      ) : (
                        <Link to={"/"} className="text-secondary">
                          {item.line1}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-9">
          <div className="md:grid md:grid-cols-2 flex flex-col-reverse md:gap-0 gap-10">
            <Logo />
            <div className="flex flex-col gap-5">
              <h2 className="md:text-heading-h2 text-subheading-s1 font-[700] text-secondary">
                The home of performing arts for young Australians
              </h2>
              <p className="text-secondary text-paragraph-p2">
                Stage School Australia acknowledges the Traditional Custodians
                of the lands on which we work and create. We pay our respects to
                the Boon Wurrung and Wurundjeri peoples of the Kulin Nation, and
                the Jagera and Turrbal peoples of Meanjin whose lands were never
                ceded. We acknowledge their continual connection to land, sea
                and culture, and pay our respects to Elders, past and present.
                We extend this respect to all First Nations people around the
                country.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 items-end">
            <div className="flex md:gap-[42px] md:flex-row flex-col">
              <p className="text-caption-c2 text-neutrals30">Privacy Policy</p>
              <p className="text-caption-c2 text-neutrals30">
                Terms & Conditions
              </p>
              <p className="text-caption-c2 text-neutrals30">
                Surrounding Locations
              </p>
            </div>
            <div className="flex md:justify-between md:flex-row flex-col">
              <p className="text-caption-c2 text-neutrals30">
                © 2025 Stage School Australia
              </p>
              <p className="text-caption-c2 text-neutrals30">
                Website by Atollon
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const footerMenu = [
  {
    title: "Courses",
    menu: [
      { line1: "Beginners on Stage" },
      { line1: "Australian Youth Theatre" },
      { line1: "Young Australian Broadway Chorus" },
      { line1: "Australian Boys Dance Academy" },
    ],
  },
  {
    title: "Navigate",
    menu: [
      { line1: "What’s On" },
      { line1: "Who we are" },
      { line1: "Careers" },
      { line1: "Talenty" },
      { line1: "Costume Dept" },
      { line1: "Our Locations" },
      { line1: "Contact" },
      { line1: "Policies & Statements" },
    ],
  },
  {
    title: "Connect",
    menu: [
      { line1: "Instagram" },
      { line1: "YouTube" },
      { line1: "Careers" },
      { line1: "Tiktok" },
      { line1: "Facebook" },
    ],
  },
  {
    title: "Head Office",
    menu: [
      { line1: "23 Allen Street", line2: "Moreland VIC 3058" },
      { line1: "Melbourne", line2: "03 8199 8344" },
      { line1: "Brisbane", line2: "07 3180 4525" },
    ],
  },
];
export default Footer;