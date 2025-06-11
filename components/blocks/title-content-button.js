import React from "react";
import parse from "html-react-parser";
import StructuredText from "@/primitives/structured-text";
import Link from "@/primitives/link";

const TitleContentButton = ({ title, richContent, link }) => {
    return (
        <section className="title-content-button">
            <div className="inner">
                <div>{title && <h2>{parse(title)}</h2>}</div>
                <div>
                    {richContent && (
                        <StructuredText
                            data={richContent}
                        />
                    )}
                    {link && (
                        <Link to={link}>
                            {parse(link?.text)}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TitleContentButton;
