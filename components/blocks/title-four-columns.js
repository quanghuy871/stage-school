import React from "react";
import { Link, Asset } from "@/primitives";

const TitleFourColumns = ({ title, columns }) => {
    return (
        <section className="title-four-columns">
            <div>
                <div>{title && <h2>{title}</h2>}</div>

                <div>
                    {columns.map((column, index) => (
                        <div key={index}>
                            {column.image && <Asset asset={column.image} />}
                            {column.title && <h3>{column.title}</h3>}
                            {column.description && <p>{column.description}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TitleFourColumns;