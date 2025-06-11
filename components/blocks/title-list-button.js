import React from "react";
import Link from "@/primitives/link";
import parse from "html-react-parser";

const TitleListButton = ({ title, list, button }) => {
  return (
    <section className="title-list-button">
      <div className="inner bg-orange w-[1600px] h-[705px] p-7 flex flex-col justify-between ">
        <div className="w-[1035px] h-[220px] ">
          {title && (
            <h2 className="font-dm-sans font-bold text-heading-h3  leading-[44px] tracking[-0,3px]  align-bottom">
              {parse(title)}
            </h2>
          )}
        </div>

        <div className="flex flex-row justify-between w-[1440px] h-[705px] p-7 items-end mt-auto pl-1  ">
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
          <div className="flex items-center w-[100px] h-[36px] px-3 py-[7px] gap-[10px] rounded-full bg-primary text-white self-end">
            {button && (
              <Link
                to={button}
                className=" w-[76px ] h-[22px] text-paragraph-p1 font-elza-text w-[400] leading-[22px] text-[#FF970F] "
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
