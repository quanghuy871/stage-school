import { PortableText } from "@portabletext/react";
import Asset from "@/primitives/asset";
import parse from "html-react-parser";

const createHeadingRenderer =
  (className) =>
  ({ node, children }) => {
    
    const Tag = `${node.style}`;
    const content = Array.isArray(children) ? children.join("") : children;

    return (
      <Tag className={className}>
        {parse(content)}
      </Tag>
    );
  };

const createBlockquoteRenderer =
  (className) =>
  ({ node, children, key }) => (
    <blockquote cite={node.attribution} key={key} className={className}>
      <p>{children}</p>
      <footer>
        <cite>{node.attribution}</cite>
      </footer>
    </blockquote>
  );

const components = {
  types: {
    image: ({ value }) => <Asset alt={value.alt} asset={value.imageUrl} />,
    html: ({ value }) => (
      <div dangerouslySetInnerHTML={{ __html: value.content }} />
    ),
  },

  marks: {
    strong: ({ children, value }) => <strong className="font-bold text-red-500">{children}</strong>,
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a href={value.href} rel={rel}>
          {children}
        </a>
      );
    },
  },
  block: {
    blockquote: createBlockquoteRenderer("border-l-purple-500"),
    h1: createHeadingRenderer("h1"),
    h2: createHeadingRenderer("h2"),
    h3: createHeadingRenderer("h3"),
    h4: createHeadingRenderer("h4"),
    h5: createHeadingRenderer("h5"),
    h6: createHeadingRenderer("h6"),
    normal: ({ children }) => {
      const content = Array.isArray(children) ? children.join("") : children;
      return <p>{parse(content)}</p>;
    },
  },
  list: {
    bullet: ({ children }) => <ul className="mt-xl">{children}</ul>,
    number: ({ children }) => <ol className="mt-lg">{children}</ol>,
    checkmarks: ({ children }) => (
      <ol className="m-auto text-lg">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ listStyleType: "disclosure-closed" }}>{children}</li>
    ),
    checkmarks: ({ children }) => <li>{children}</li>,
  },
};

const StructuredText = ({ data, className, as = "p" }) => {
  if (!data || data?.content?.length <= 0) return null;

  const updatedData = {
    ...data,
    blocks: (data || []).map((block) => ({
      ...block,
      id: block._key,
    })),
  };

  const Component = as;

  return (
    <div>
      <PortableText
        value={updatedData.blocks}
        className={className}
        components={{
          ...components,
          block: {
            ...components.block,
            normal: ({ children }) => {
              const content = Array.isArray(children) ? children.join("") : children;
              return <Component className={className}>{parse(content)}</Component>;
            },
          },
        }}
        onMissingComponent={(message, options) => console.log(message)}
      />
    </div>
  );
};

export default StructuredText;