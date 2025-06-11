import HyperionLink from "@/components/hyperion-link";

const NotFound = () => {
  return (
    <section className="not-found h-screen bg-wisp-1 pt-[70px] md:pt-[92px]">
      <div className="grid grid-cols-[repeat(25,_1fr)] grid-rows-[repeat(3,_1fr)] mb-[130px]">
        {Array.from({ length: 75 }).map((_, i) => {
          if (
            i === 25 ||
            i === 26 ||
            i === 48 ||
            i === 49 ||
            i === 50 ||
            i === 51 ||
            i === 52 ||
            i === 53 ||
            i === 54 ||
            i === 55 ||
            i === 69 ||
            i === 70 ||
            i === 71 ||
            i === 72 ||
            i === 73 ||
            i === 74
          ) {
            return <div key={i} className="bg-transparent aspect-square"></div>;
          }
          return (
            <div
              key={i}
              className="bg-[#D3D9D3] border border-sage-1 aspect-square"
            ></div>
          );
        })}
      </div>

      <div className="text-center mx-auto px-5">
        <h3 className="text-heading-h1 font-[400] mb-5 tracking-[-0.6px] md:tracking-[-1px]">
          404
        </h3>
        <p className="text-paragraph-p1 font-[350] md:max-w-[385px] mx-auto">
          Looks like this page can’t be found. Sorry about that. But since
          you’re here, why not take a break?
        </p>

        <div className="flex gap-[34px] items-center justify-center mt-[130px]">
          <HyperionLink
            tag=""
            className="btn btn-hyperion--orange min-w-[160px]"
            to="/"
          >
            <span className="!justify-center">Start</span>
          </HyperionLink>
          <HyperionLink
            tag=""
            className="btn btn-hyperion--orange min-w-[160px]"
            to="/"
          >
            <span className="!justify-center">Return Home</span>
          </HyperionLink>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
