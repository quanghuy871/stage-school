import React, { useRef } from "react";
import { Asset } from "@/primitives";
import Link from "@/primitives/link";
import StructuredText from "@/primitives/structured-text";
import parse from "html-react-parser";
import gsap from "gsap";
import { cn } from "@/utils/cn";

// const colorMap = {
//     orange: "#FF8000",
//     cyan: "#32B9F5",
//     vermillion: "#FF3F2B",
//     lime: "#A0D828",
// };

const TitleAnimation = ({ title, items, richContent, link }) => {
  // const itemRefs = useRef([]);
  // const imageRefs = useRef([]);

  // const handleMouseEnter = (index, colorKey) => {
  //     const el = itemRefs.current[index];
  //     const img = imageRefs.current[index];
  //     const bgColor = colorMap[colorKey] || "transparent";

  //     if (el) {
  //         gsap.to(el, {
  //             backgroundColor: bgColor,
  //             duration: 0.2,
  //             ease: "power1.inOut",
  //         });
  //     }

  //     if (img) {
  //         gsap.killTweensOf(img);
  //         gsap.set(img, { display: "block" });

  //         gsap.fromTo(
  //             img,
  //             {
  //                 opacity: 0,
  //                 //   x: 20,
  //                 //   scale: 0.95,
  //                 filter: "blur(6px)",
  //                 pointerEvents: "none",
  //             },
  //             {
  //                 opacity: 1,
  //                 //   x: 0,
  //                 //   scale: 1,
  //                 filter: "blur(0px)",
  //                 duration: 0.5,
  //                 ease: "power2.out",
  //                 pointerEvents: "auto",
  //             }
  //         );
  //     }
  // };

  // const handleMouseLeave = (index) => {
  //     const el = itemRefs.current[index];
  //     const img = imageRefs.current[index];

  //     if (el) {
  //         gsap.to(el, {
  //             backgroundColor: "transparent",
  //             duration: 0.2,
  //             ease: "power1.inOut",
  //         });
  //     }

  //     if (img) {
  //         gsap.killTweensOf(img);
  //         gsap.to(img, {
  //             opacity: 0,
  //             y: 20,
  //             scale: 0.95,
  //             filter: "blur(6px)",
  //             duration: 0.4,
  //             ease: "power2.out",
  //             pointerEvents: "none",
  //             onComplete: () => {
  //                 gsap.set(img, { display: "none" });
  //             },
  //         });
  //     }
  // };

  return (
    <section className="title-animation bg-neutrals-5 pt-5 relative">
      <div>
        <div className="inner flex md:flex-row flex-col items-start md:pb-[50px] pb-11 md:gap-0 gap-8">
          {title && (
            <h2 className="text-paragraph-p1 tracking-[-0.2px] font-[500] relative pl-[22px] md:w-[50%] pr-[50px]">
              <span className="bg-primary rounded-full w-[10px] h-[10px] absolute left-0 top-[50%] translate-y-[-50%]"></span>
              {parse(title)}
            </h2>
          )}
          <div className="md:w-[50%]">
            {richContent && (
              <StructuredText
                data={richContent}
                className="text-primary tracking-[-0.2px] md:max-w-[458px]"
              />
            )}
          </div>
        </div>

        <div className="relative">
          {items?.map((item, index) => {
            const isTop = index < Math.floor(items.length / 2);

            return (
              <div
                key={index}
                className="inner w-full group flex items-center justify-center md:py-[18px] py-[10px] cursor-pointer relative"
              >
                <div
                  className={cn(
                    `md:block hidden absolute top-0 w-0 h-full bg-${item.color} group-hover:w-full st-transition`,
                    {
                      "left-0": index % 2 === 0,
                      "right-0": index % 2 === 1,
                    }
                  )}
                >
                  {item.subtitle && (
                    <>
                      <div className="overflow-hidden w-[120px] h-full absolute z-[2] right-0 flex items-center justify-center group-hover:opacity-100 opacity-0 st-transition -rotate-90">
                        <p className="text-caption-c1">{item.subtitle}</p>
                      </div>
                      <div className="overflow-hidden w-[120px] h-full absolute z-[2] left-0 flex items-center justify-center group-hover:opacity-100 opacity-0 st-transition -rotate-90">
                        <p className="text-caption-c1">{item.subtitle}</p>
                      </div>
                    </>
                  )}
                </div>

                <h2 className="text-center md:text-display-d1 heading-h2 font-[700] md:tracking-[-5px] tracking-[-0.2px] z-[1]">
                  {item.title}
                </h2>

                {item.image && (
                  <div
                    className={cn(
                      "absolute z-[2] pointer-events-none opacity-0 group-hover:opacity-100 st-transition md:block hidden",
                      {
                        "left-[100px]": index % 2 === 0,
                        "right-[100px]": index % 2 === 1,
                        "top-[20px]": isTop,
                        "bottom-[20px]": !isTop,
                      }
                    )}
                  >
                    <Asset
                      asset={item.image.asset}
                      className="h-full w-full !aspect-[336/264] md:max-w-[336px] max-w-[246px]"
                    />

                    <span className="bg-primary text-secondary px-3 py-[7px] rounded-full absolute bottom-10 right-[-20px]">
                      {item.tag}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center px-7 pt-10 pb-14">
          {link && (
            <Link
              to={link}
              className="bg-primary text-secondary px-3 py-[7px] rounded-full md:w-[218px] w-full flex items-center justify-center"
            >
              <span className="st-transition md:hover:-translate-x-0 hover:-translate-x-[15px] ">
                {parse(link?.text)}
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default TitleAnimation;
