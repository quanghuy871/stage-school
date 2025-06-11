import React from "react";
import { Link, Asset } from "@/primitives";
import StructuredText from "@/primitives/structured-text";
import parse from "html-react-parser";

const Cta = ({ title, richContent, backgroundImage, link }) => {
  console.log(backgroundImage);
  return (
    <section className="cta relative md:h-[468px] h-[595px] overflow-hidden  md:bg-none bg-cyan">
      <div className="inner h-full">
        <div className="absolute w-full h-full left-0 right-0 ">
          {backgroundImage && 
          
          <Asset
            asset={backgroundImage?.asset}
            className="w-full md:h-[468px] h-[377px] bject-top"
          />
          }
        </div>
        <div className="absolute md:left-[-418px] left-[-311px] md:bottom-[-136px] bottom-[34.25px] md:w-[1089px] w-[996px] md:h-[703px] h-[337px] rounded-[1089px] bg-cyan mix-blend-lighten blur-[50px]"></div>

        <div className="relative flex flex-col md:justify-center justify-end md:pb-0 pb-20 gap-5 max-w-[540px] h-full">
          {title && (
            <h2 className="md:text-heading-h1 text-heading-h4 text-primary font-[700] tracking-[-2px]">
              {parse(title)}
            </h2>
          )}
          {richContent && (
            <StructuredText
              data={richContent}
              className="text-primary tracking-[-0.2px]"
            />
          )}
          <Link
            to={link}
            className="px-3 py-[7px] bg-primary rounded-full w-fit text-cyan"
          >
            {parse(link?.text)}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;
