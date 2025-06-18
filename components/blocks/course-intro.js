import { Link, Asset } from "@/primitives";
import parse from "html-react-parser";
import StructuredText from "@/primitives/structured-text";

const CourseIntro = ({ subtitle, title, richContent, link, items }) => {
    return (
        <section className="course-intro">
            <div className="inner">
                <div>
                    {subtitle && <h3>{parse(subtitle)}</h3>}
                    {title && <h2>{parse(title)}</h2>}
                </div>

                <div className="">
                    <div>
                        {richContent && <StructuredText data={richContent} />}
                        {link && <Link to={link}>{parse(link?.text)}</Link>}
                    </div>
                    <div>
                        {items?.length > 0 &&
                            items.map((item, index) => (
                                <div key={index}>
                                    {item.title && <h3>{parse(item.title)}</h3>}
                                    {item.firstRichContent && <StructuredText data={item.firstRichContent} />}
                                    {item.secondRichContent && <StructuredText data={item.secondRichContent} />}
                                </div>
                            ))}
                        <Link to="/">Payment Options</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseIntro;
