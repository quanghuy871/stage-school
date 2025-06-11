import React from "react";
import Link from "@/primitives/link";
import parse from "html-react-parser";

const TitleListButton = ({ title, list, button }) => {
    return (
        <section className="title-list-button">
            <div className="inner">
               <div >
                {title && <h2>{parse(title)}</h2>}
               </div>

               <div>
                <div>
                    {list.map((item, index) => (
                        <p key={index}>{parse(item)}</p>
                    ))}
                </div>
                <div>
                    {button && <Link to={button}>{parse(button?.text)}</Link>}
                </div>
               </div>
            </div>
        </section>
    );
};

export default TitleListButton;
