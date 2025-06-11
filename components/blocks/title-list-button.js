import React from "react";
import Link from "@/primitives/link";
import parse from "html-react-parser";

const TitleListButton = ({ title, list, button }) => {
  return (
    <section className="title-list-button bg-orange md:h-[705px] py-8 md:py-7">
      <div className="inner md:h-full mb:h-full lp-7 flex flex-col justify-between ">
        <div className="md:max-w-[1035px] mb-4">
          {title && (
            <h2 className="font-bold text-subheading-s2 md:text-heading-h3 tracking-[-0.5px] md:tracking-[-0.3px] align-bottom">
              {parse(title)}
            </h2>
          )}
        </div>

        <div className="flex flex-col-reverse flex-direction md:flex-row justify-between md:items-end gap-[80px] md:gap-4">
          <div className=" flex-wrap gap-2 w-full md:w-[1035px]">
            {list.map((item, index) => (
              <p
                className="flex items-center w-fit h-fit px-3 py-2 gap-[10px] border border-[#DB6600] rounded-full text-paragraph-p1 md:seft-end "
                key={index}
              >
                {parse(item)}
              </p>
            ))}
          </div>

          <div className="flex items-center max-w-[100px] h-[36px] px-3 py-[7px] rounded-full bg-primary self-start md:self-end">
            {button && (
              <Link
                to={button}
                className="text-paragraph-p1 text-[#FF970F]"
              >
                {parse(button?.text)}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TitleListButton;
