import React from "react";
import { Link, Asset } from "@/primitives";
import { useKeenSlider } from "keen-slider/react";
const TitleFourColumns = ({ title, columns }) => {
  const [sliderRef] = useKeenSlider({
    loop: false,

    breakpoints: {
      "(min-width: 900px)": {
        slides: {
          perView: 4,
          spacing: 14,
        },
      },
      "(max-width: 899px)": {
        slides: {
          perView: 1.1,
          spacing: 14,
        },
      },
    },
  });
  return (
    <section className="title-four-columns pt-7">
      <div className="inner flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <div className="w-[10px] h-[10px] bg-primary rounded-full"></div>
          {title && <h2 className="text-paragraph-p1">{title}</h2>}
        </div>
        <div>
          <div className="h-[10px] w-full border border-primary border-b-0 md:border-x border-x-0"></div>
          <div ref={sliderRef} className="keen-slider">
            {columns.map((column, index) => (
              <div
                key={index}
                className="p-[10px] flex flex-col gap-4 keen-slider__slide"
              >
                {column.image && (
                  <Asset
                    asset={column.image}
                    className="h-[560px] rounded-lg"
                  />
                )}
                <div className="flex flex-col gap-2">
                  {column.title && (
                    <h3 className="md:text-paragraph-p3 text-subheading-s3">
                      {column.title}
                    </h3>
                  )}
                  {column.description && <p>{column.description}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="h-[10px] w-full border-x border-primary"></div>
        </div>
      </div>
    </section>
  );
};

export default TitleFourColumns;
