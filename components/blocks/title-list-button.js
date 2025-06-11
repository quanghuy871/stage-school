import React from "react";
import Link from "@/primitives/link";
import parse from "html-react-parser";

const TitleListButton = ({ title, list, button }) => {
  return (
    <section className="title-list-button bg-orange md:h-[705px] mb:h-[623px] p-4 md:p-7 ">
      <div className="inner md:h-full mb:h-full lp-7 flex flex-col justify-between ">
        <div className="md:max-w-[1035px] mb-4">
          {title && (
            <h2 className=" font-bold text-heading-h3 leading-[44px]  mb:tracking-[-0.5px] tracking-[-0.3px] text-[20px] md:text-[44px] align-bottom">
              {parse(title)}
            </h2>
          )}
        </div>

        <div className="flex  flex-col-reverse flex-direction md:flex-row justify-between p-7 md:items-end gap-4 mt-auto pl-1">
          <div className=" flex-wrap gap-2 w-full md:w-[1035px]">
            {list.map((item, index) => (
              <p
                className="flex items-center w-fit h-fit px-3 py-2 gap-[10px] border border-[#DB6600] rounded-full text-sm mb:seft-end "
                key={index}
              >
                {parse(item)}
              </p>
            ))}
          </div>

          <div className="flex items-center max-w-[100px] h-[36px] px-3 py-[7px] rounded-full bg-primary md:self-end self-start">
            {button && (
              <Link
                to={button}
                className="text-paragraph-p1 leading-[22px] text-[#FF970F] text-sm whitespace-nowrap"
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
