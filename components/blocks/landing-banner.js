import React from "react";
import Link from "@/primitives/link";
import parse from "html-react-parser";

const LandingBanner = ({ title, buttons }) => {

    return (
      <section className="landing-banner h-[850px] bg-primary">
        <div className="inner h-full flex items-end md:justify-end ">
          <div className="flex flex-col gap-6 md:max-w-[683px] max-w-[315px] pb-11">
            {title && (
              <h2 className="md:text-heading-h1 text-heading-h4 font-[700] text-secondary tracking-[-2px]">
                {parse(title)}
              </h2>
            )}
            <div className="flex">
              {buttons.map((button, index) => (
                <Link
                  key={index}
                  to={button}
                  className="bg-secondary px-3 py-[7px] rounded-full"
                >
                  {parse(button?.text)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
};

export default LandingBanner;
