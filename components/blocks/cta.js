import React from "react";
import { Link, Asset } from "@/primitives";
import StructuredText from "@/primitives/structured-text";
import parse from "html-react-parser";
import { cn } from "@/utils/cn";

const Cta = ({ title, richContent, backgroundImage, link }) => {
    return (
        <section
            className={cn("cta relative md:py-[136px] overflow-hidden", {
                "md:h-[31vw]": !title,
            })}
        >
            <div className="inner h-full">
                <div className="absolute w-full h-full top-0 left-0 right-0">
                    {backgroundImage && (
                        <Asset asset={backgroundImage?.asset} className="w-full h-full md:!aspect-[1440/446]" />
                    )}
                </div>
                {title && (
                    <div className="absolute md:left-[-418px] left-[-311px] md:bottom-[-136px] bottom-[34.25px] md:w-[1089px] w-[996px] md:h-[703px] h-[337px] rounded-[1089px] bg-cyan blur-[50px]"></div>
                )}

                <div className="relative flex flex-col md:justify-center justify-end md:pb-0 pb-20 gap-5 max-w-[540px] h-full">
                    {title && (
                        <h2 className="md:text-heading-h1 text-heading-h4 text-primary font-[700] tracking-[-2px]">
                            {parse(title)}
                        </h2>
                    )}
                    {richContent && <StructuredText data={richContent} className="text-primary tracking-[-0.2px]" />}
                    {link?.text && (
                        <Link to={link} className="px-3 py-[7px] bg-primary rounded-full w-fit text-cyan">
                            {parse(link?.text)}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Cta;
