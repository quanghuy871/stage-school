import React from "react";
import { Link, Asset } from "@/primitives";
import StructuredText from "@/primitives/structured-text";
import parse from "html-react-parser";

const TitleContentButtonImage = ({ title, image, richContent, buttons }) => {
  return (
    <section className="title-content-button-image bg-primaryOrange md:h-screen h-[752px] flex items-end">
      <div className="inner">
        <div className="flex flex-col md:gap-7 gap-3 md:pt-7 md:pb-7 pb-4 pt-11">
          {title && (
            <h2 className="md:text-heading-h1 text-subheading-s1 max-w-[400px] font-[700] tracking-[-2px]">
              {parse(title)}
            </h2>
                  )}
                  <div className="md:hidden flex border border-primary border-b-0 w-100 h-3">
                      
                  </div>
          <div className="grid md:grid-cols-2 md:gap-0 gap-8">
            <div className="max-w-[400px] flex flex-col md:gap-5 gap-8 justify-end">
              {richContent && (
                <StructuredText
                  data={richContent}
                  className="text-primary tracking-[-0.2px]"
                />
              )}
              <div className="flex">
                {buttons.map((button, index) => (
                  <Link
                    key={index}
                    to={button}
                    className={`${index == 0 ? "bg-primary text-primaryOrange" : "border border-primary "} px-3 py-[7px] rounded-full`}
                  >
                    {parse(button?.text)}
                  </Link>
                ))}
              </div>
            </div>
            <div className="">
              <Asset asset={image} className="h-full md:!aspect-[686/400]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TitleContentButtonImage;
