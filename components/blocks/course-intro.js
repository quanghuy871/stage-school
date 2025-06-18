import { Link, Asset } from "@/primitives";
import parse from "html-react-parser";
import StructuredText from "@/primitives/structured-text";

const CourseIntro = ({ subtitle, title, richContent, link, items }) => {
  return (
    <section className="course-intro flex flex-col gap-4 ">
      <div className="inner w-full">
        <div className="flex flex-col gap-[16px]">
          {subtitle && (
            <h3 className="text-paragraph-p2 font-medium tracking-[0px] md:text-paragraph-p1">
              {parse(subtitle)}
            </h3>
          )}
          {title && (
            <h2 className="text-heading-h4 font-bold heading-h4 align-bottom md:text-heading-h1 md:w-[916px] md:h-[108px]">
              {parse(title)}
            </h2>
          )}
        </div>

        <div className="flex flex-col gap-[60px] md:flex-row gap-6">
          <div className="flex flex-col  paragraph-p2 gap-[44px] md:gap-[28px] md:border-t md:border-r md:border-black md:pr-[60px] md:mr-[60px] bg-secondary">
            {richContent && (
              <StructuredText
                className="text-paragraph-p2 tracking-[0px] md:w-[674px] md:h-[176px] md:font-normal md:text-paragraph-p1"
                data={richContent}
              />
            )}

            {link && (
              <Link
                className="paragraph-p1 w-fit h-fit bg-primary items-center px-[12px] py-[7px] gap-[10px] rounded-[50px] border border-[1px] border-black text-secondary md:text-paragraph-p1"
                to={link}
              >
                {parse(link?.text)}
              </Link>
            )}
          </div>
          <div className="flex flex-col gap-[24px] ">
            {items?.length > 0 &&
              items.map((item, index) => (
                <div className="w-[357px] gap-[22px] " key={index}>
                  {item.title && (
                    <h3 className="font-medium text-paragraph-p1 tracking-[0px]">
                      {parse(item.title)}
                    </h3>
                  )}
                  {item.firstRichContent && (
                    <StructuredText
                      className=" flex flex-row text-paragraph-p1 font-normal text-[15px] leading-[22px] tracking-[0px]"
                      data={item.firstRichContent}
                    />
                  )}
                  {item.secondRichContent && (
                    <StructuredText
                      className="text-paragraph-p1 font-normal text-[15px] leading-[22px] tracking-[0px]"
                      data={item.secondRichContent}
                    />
                  )}
                </div>
              ))}
            <Link
              className="items-center w-fit h-fit px-[12px] py-[7px] gap-[10px] rounded-[50px] border border-[1px] border border-[1px] border-black"
              to="/"
            >
              Payment Options
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseIntro;
