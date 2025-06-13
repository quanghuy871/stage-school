// import React, { useRef } from "react";
// import { Asset } from "@/primitives";
// import StructuredText from "@/primitives/structured-text";
// import parse from "html-react-parser";
// import gsap from "gsap";

// const colorMap = {
//   orange: "#FF8000",
//   cyan: "#32B9F5",
//   vermillion: "#FF3F2B",
//   lime: "#A0D828",
// };

// const TitleAnimation = ({ title, items, richContent }) => {
//   const itemRefs = useRef([]);
//   const imageRefs = useRef([]);
//   const handleMouseEnter = (index, colorKey) => {
//     const el = itemRefs.current[index];
//     const img = imageRefs.current[index];
//     const bgColor = colorMap[colorKey] || "transparent";

//     if (el) {
//       gsap.to(el, {
//         backgroundColor: bgColor,
//         duration: 0.2,
//         ease: "power1.inOut",
//       });
//     }

//     if (img) {
//       gsap.fromTo(
//         img,
//         {
//           opacity: 0,
//           x: 20,
//           scale: 0.95,
//           filter: "blur(6px)",
//           pointerEvents: "none",
//         },
//         {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           filter: "blur(0px)",
//           duration: 0.5,
//           ease: "power2.out",
//           pointerEvents: "auto",
//         }
//       );
//     }
//   };

//   const handleMouseLeave = (index) => {
//     const el = itemRefs.current[index];
//     const img = imageRefs.current[index];

//     if (el) {
//       gsap.to(el, {
//         backgroundColor: "transparent",
//         duration: 0.2,
//         ease: "power1.inOut",
//       });
//     }

//     if (img) {
//       gsap.to(img, {
//         opacity: 0,
//           y: 20,
//           scale: 0.95,
//         filter: "blur(6px)",
//         duration: 0.4,
//         ease: "power2.out",
//         pointerEvents: "none",
//       });
//     }
//   };
//   return (
//     <section className="title-animation bg-neutrals5 pt-5 relative">
//       <div>
//         <div className="inner grid md:grid-cols-2 grid-cols-1 pb-[50px]">
//           <div className="flex gap-3 items-center">
//             <div className="bg-primary rounded-full w-[10px] h-[10px]"></div>
//             {title && (
//               <h2 className="text-paragraph-p3 tracking-[-2px] font-[500]">
//                 {parse(title)}
//               </h2>
//             )}
//           </div>
//           {richContent && (
//             <StructuredText
//               data={richContent}
//               className="text-primary tracking-[-0.2px] max-w-[458px]"
//             />
//           )}
//         </div>

//         <div className="relative">
//           {items?.map((item, index) => (
//             <div
//               key={index}
//               ref={(el) => (itemRefs.current[index] = el)}
//               onMouseEnter={() => handleMouseEnter(index, item.color)}
//               onMouseLeave={() => handleMouseLeave(index)}
//               className="inner w-full flex items-center justify-center py-[18px] cursor-pointer bg-neutrals5"
//             >
//               <h2 className="text-display-d1 font-[700] tracking-[-5px]">
//                 {item.title}
//               </h2>

//               {item.image && (
//                 <div
//                   ref={(el) => (imageRefs.current[index] = el)}
//                   className="absolute z-2 top-20 left-0 transform translate-y-[20px] opacity-0 transition-none"
//                 >
//                   <Asset
//                     asset={item.image.asset}
//                     className="h-full w-full !aspect-[336/264] max-w-[336px]"
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TitleAnimation;
import React, { useRef } from "react";
import { Asset } from "@/primitives";
import Link from "@/primitives/link";
import StructuredText from "@/primitives/structured-text";
import parse from "html-react-parser";
import gsap from "gsap";

const colorMap = {
  orange: "#FF8000",
  cyan: "#32B9F5",
  vermillion: "#FF3F2B",
  lime: "#A0D828",
};

const TitleAnimation = ({ title, items, richContent }) => {
  const itemRefs = useRef([]);
  const imageRefs = useRef([]);

  const handleMouseEnter = (index, colorKey) => {
    const el = itemRefs.current[index];
    const img = imageRefs.current[index];
    const bgColor = colorMap[colorKey] || "transparent";

    if (el) {
      gsap.to(el, {
        backgroundColor: bgColor,
        duration: 0.2,
        ease: "power1.inOut",
      });
    }

    if (img) {
      gsap.killTweensOf(img);
      gsap.set(img, { display: "block" });

      gsap.fromTo(
        img,
        {
          opacity: 0,
        //   x: 20,
        //   scale: 0.95,
          filter: "blur(6px)",
          pointerEvents: "none",
        },
        {
          opacity: 1,
        //   x: 0,
        //   scale: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
          pointerEvents: "auto",
        }
      );
    }
  };

  const handleMouseLeave = (index) => {
    const el = itemRefs.current[index];
    const img = imageRefs.current[index];

    if (el) {
      gsap.to(el, {
        backgroundColor: "transparent",
        duration: 0.2,
        ease: "power1.inOut",
      });
    }

    if (img) {
      gsap.killTweensOf(img);
      gsap.to(img, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        filter: "blur(6px)",
        duration: 0.4,
        ease: "power2.out",
        pointerEvents: "none",
        onComplete: () => {
          gsap.set(img, { display: "none" });
        },
      });
    }
  };

  return (
    <section className="title-animation bg-neutrals5 pt-5 relative">
      <div>
        <div className="inner grid md:grid-cols-2 grid-cols-1 pb-[50px]">
          <div className="flex gap-3 items-center">
            <div className="bg-primary rounded-full w-[10px] h-[10px]"></div>
            {title && (
              <h2 className="text-paragraph-p3 tracking-[-2px] font-[500]">
                {parse(title)}
              </h2>
            )}
          </div>
          {richContent && (
            <StructuredText
              data={richContent}
              className="text-primary tracking-[-0.2px] max-w-[458px]"
            />
          )}
        </div>

        <div className="relative">
          {items?.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
              onMouseEnter={() => handleMouseEnter(index, item.color)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="inner w-full flex items-center justify-center py-[18px] cursor-pointer bg-neutrals5"
            >
              <p></p>
              <h2 className="text-display-d1 font-[700] tracking-[-5px]">
                {item.title}
              </h2>

              {item.image && (
                <div
                  ref={(el) => {
                    if (el) imageRefs.current[index] = el;
                  }}
                  className="absolute z-2 top-20 left-0 pointer-events-none opacity-0"
                  style={{
                    display: "none",
                    transform: "translateY(20px)",
                  }}
                >
                  <Asset
                    asset={item.image.asset}
                    className="h-full w-full !aspect-[336/264] max-w-[336px]"
                  />

                  <Link
                    to={item.link}
                    className="bg-primary text-secondary px-3 py-[7px] rounded-full absolute bottom-10 right-[-20px]"
                  >
                    {item.button}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TitleAnimation;
