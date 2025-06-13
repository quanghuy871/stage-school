import React from "react";
import { Link, Asset } from "@/primitives";
import StructuredText from "@/primitives/structured-text";
import parse from "html-react-parser";

const DoubleImage = ({ firstImage, secondImage }) => {
  return (
    <section className="double-image">
        <div className="flex">
            {firstImage && <Asset className="md:!aspect-[720/892]" asset={firstImage.asset} />}
            {secondImage && <Asset className="md:!aspect-[720/892]" asset={secondImage.asset} />}
        </div>
    </section>
  );
};

export default DoubleImage;
