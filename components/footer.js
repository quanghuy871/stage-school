"use client";

import React from "react";
import Link from "@/primitives/link";
import Logo from "@/sanity/src/theme/components/logo";

const Footer = () => {
  return (
    <footer className="h-screen bg-primary pt-7 pb-5">
      <div className="inner flex flex-col justify-between h-full">
        <div className="grid md:grid-cols-[1.7fr_1fr_1.2fr_1.5fr] grid-cols-1 md:gap-6 gap-[14px]">
          {footerMenu.map((m, i) => (
            <div
              key={i}
              className="border-l border-neutrals60 pl-3 flex flex-col md:gap-10 h-fit"
            >
              {m.title && (
                <h2 className="text-paragraph-p1 text-secondary">{m.title}</h2>
              )}
              <div key={i} className="flex flex-col">
                {m.menu &&
                  m.menu.map((item, i) => (
                    <Link key={i} to={"/"} className="text-secondary">
                      {item}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
          <div className="border-l border-neutrals60 pl-3 flex flex-col gap-10 h-fit">
            <h2 className="text-paragraph-p1 text-secondary">Head Office</h2>
            <div className="flex flex-col gap-[22px]">
              <p className="text-secondary">
                23 Allen Street <br />
                Moreland VIC 3058
              </p>
              <p className=" text-secondary">
                Melbourne <br />
                03 8199 8344
              </p>
              <p className=" text-secondary">
                Brisbane
                <br />
                07 3180 4525
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-9">
          <div className="grid grid-cols-2">
            <Logo />
            <div className="flex flex-col gap-5">
              <h2 className="text-heading-h2 font-[700] text-secondary">
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
          <div className="grid grid-cols-2">
            <div className="flex gap-[42px]">
              <p className="text-caption-c2 text-neutrals30">Privacy Policy</p>
              <p className="text-caption-c2 text-neutrals30">
                Terms & Conditions
              </p>
              <p className="text-caption-c2 text-neutrals30">
                Surrounding Locations
              </p>
            </div>
            <div className="flex justify-between">
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
      "Beginners on Stage",
      "Australian Youth Theatre",
      "Young Australian Broadway Chorus",
      "Australian Boys Dance Academy",
    ],
  },
  {
    title: "Navigate",
    menu: [
      "What’s On",
      "Who we are",
      "Careers",
      "Talenty",
      "Costume Dept",
      "Our Locations",
      "Contact",
      "Policies & Statements",
    ],
  },
  {
    title: "Connect",
    menu: ["Instagram", "YouTube", "Careers", "Tiktok", "Facebook"],
  },
];
export default Footer;
