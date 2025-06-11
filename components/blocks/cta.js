import React from "react";
import { Link, Asset } from "@/primitives";
import StructuredText from "@/primitives/structured-text";
import parse from "html-react-parser";

const Cta = ({ title, richContent, backgroundImage, link }) => {
  return (
    <section className="cta relative h-[468px]">
      <div className="inner">
        <div className="absolute">
          <Asset asset={backgroundImage.asset} />
        </div>
        {title && <h2>{parse(title)}</h2>}
        <div>
          {richContent && <StructuredText data={richContent} />}
          <Link to={link}>{parse(link?.text)}</Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;
