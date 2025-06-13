import React from "react";
import { Link, Asset } from "@/primitives";
import StructuredText from "@/primitives/structured-text";
import parse from "html-react-parser";

const TitleAnimation = ({title, items, richContent }) => {

    console.log(items)
    return (
        <section className="title-animation">
            {/* {
                items.map((el, i) => (
                    <Asset asset={el.asset} />
                ))
            } */}
        </section>
    );
};

export default TitleAnimation;
