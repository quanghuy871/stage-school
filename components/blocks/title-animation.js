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

const TitleAnimation = ({ title, items, richContent }) => {
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
                <div className="inner md:flex items-start pb-[50px]">
                    {title && (
                        <h2 className="text-paragraph-p3 tracking-[-2px] font-[500] relative md:pl-[22px] md:w-[50%] pr-[50px]">
                            <span className="bg-primary rounded-full w-[10px] h-[10px] absolute left-0 top-[50%] translate-y-[-50%]"></span>
                            {parse(title)}
                        </h2>
                    )}
                    <div className="md:w-[50%]">
                        {richContent && (
                            <StructuredText
                                data={richContent}
                                className="text-primary tracking-[-0.2px] max-w-[458px]"
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
                                className="inner w-full group flex items-center justify-center py-[18px] cursor-pointer relative"
                            >
                                <div
                                    className={cn(
                                        `absolute top-0 w-0 h-full bg-${item.color} group-hover:w-full st-transition`,
                                        {
                                            "left-0": index % 2 === 0,
                                            "right-0": index % 2 === 1,
                                        }
                                    )}
                                ></div>

                                <h2 className="text-display-d1 font-[700] tracking-[-5px] z-[1]">{item.title}</h2>

                                {item.image && (
                                    <div
                                        className={cn(
                                            "absolute z-[2] pointer-events-none opacity-0 group-hover:opacity-100 st-transition",
                                            {
                                                "left-[50px]": index % 2 === 0,
                                                "right-[50px]": index % 2 === 1,
                                                "top-[20px]": isTop,
                                                "bottom-[20px]": !isTop,
                                            }
                                        )}
                                    >
                                        <Asset
                                            asset={item.image.asset}
                                            className="h-full w-full !aspect-[336/264] max-w-[336px]"
                                        />

                                        <span
                                            className="bg-primary text-secondary px-3 py-[7px] rounded-full absolute bottom-10 right-[-20px]"
                                        >
                                            {item.tag}
                                        </span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TitleAnimation;
