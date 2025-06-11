import React from "react";
import parse from "html-react-parser";
import StructuredText from "@/primitives/structured-text";
import Link from "@/primitives/link";

const TitleContentButton = ({ title, richContent, link }) => {
  return (
    <section className="title-content-button">
      <div className="inner pt-11 pb-[72px] flex flex-col md:gap-14 gap-8">
        <div className="max-w-[918]">
          {title && (
            <h2 className="md:text-heading-h1 text-heading-h4 font-[700] tracking-[-2px]">
              {parse(title)}
            </h2>
          )}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="flex flex-col gap-8 col-start-2 md:border-l border-primary pl-[14px]">
            {richContent && <StructuredText data={richContent} />}
            {link && (
              <Link
                to={link}
                className="bg-primary text-secondary px-3 py-[7px] rounded-full w-fit"
              >
                {parse(link?.text)}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TitleContentButton;
