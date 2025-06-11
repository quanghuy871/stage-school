import React from "react";
import Link from "@/primitives/link";
import parse from "html-react-parser";

const LandingBanner = ({ title, buttons }) => {
    
    return (
        <section className="landing-banner">
            <div className="inner">
                <div>
                    {title && <h2>{parse(title)}</h2>}
                    <div>
                        {buttons.map((button, index) => (
                            <Link key={index} to={button}>
                                {parse(button?.text)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingBanner;
