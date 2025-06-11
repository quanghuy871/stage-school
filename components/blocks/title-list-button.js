import React from "react";
import Link from "@/primitives/link";
import parse from "html-react-parser";

const TitleListButton = ({ title, list, button }) => {
  return (
    <section className="title-list-button bg-orange md:h-[705px]">
      <div className="inner md:h-full p-7 flex flex-col justify-between">
        <div className="md:max-w-[1035px]">
          {title && (
            <h2 className="font-bold text-heading-h3 leading-[44px] tracking-[-0.3px] align-bottom">
              {parse(title)}
            </h2>
          )}
        </div>

        <div className="flex flex-row justify-between p-7 items-end mt-auto pl-1">
          <div className="">
            {list.map((item, index) => (
              <p
                className="flex items-center w-fit h-fit px-3 py-2 gap-[10px] border border-[#DB6600] rounded-full"
                key={index}
              >
                {parse(item)}
              </p>
            ))}
          </div>
          <div className="flex items-center max-w-[100px] h-[36px] px-3 py-[7px] gap-[10px] rounded-full bg-primary text-white self-end">
            {button && (
              <Link
                to={button}
                className="text-paragraph-p1 w-[400] leading-[22px] text-[#FF970F]"
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
