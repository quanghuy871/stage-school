import { useEffect } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const useAccordionAnimation = (itemSelector, titleSelector, contentSelector, height) => {
  const pathname = usePathname();
  // const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    const faqItems = gsap.utils.toArray(itemSelector);
    const titles = gsap.utils.toArray(titleSelector);
    let anis = [];

    const toggleAnimation = (title) => {
      const selectedReversedState = title.animation.reversed();
      anis.forEach((animation) => animation.reverse());
      title.animation.reversed(!selectedReversedState);
    };

    const createAnimation = (el) => {
      const title = el?.querySelector(titleSelector);
      const content = el?.querySelector(contentSelector);

      if (!title.animation) {
        gsap.set(content, { height: height });

        const tween = gsap.from(content, {
          height: 0,
          duration: 0.1,
          ease: "power4.inOut",
          reversed: true,
        });

        title.animation = tween;
        anis.push(tween);
      }
    };

    const updateAnimations = () => {
      anis.forEach((animation) => animation.kill());
      anis = [];

      faqItems.forEach((item) => item.classList.remove("active"));
      faqItems.forEach((item) => item?.querySelector('svg').classList.remove("active"));

      faqItems.forEach((item) => {
        const title = item?.querySelector(titleSelector);
        if (title) title.animation = null;
        createAnimation(item);
      });
    };

    faqItems.forEach((item) => createAnimation(item));

    titles.forEach((title) => {
      const handleClick = () => {
        toggleAnimation(title);
        const _this = title.closest(itemSelector);
        if (_this.classList.contains("active")) {
          _this.classList.remove("active");
          _this?.querySelector('svg').classList.remove("active");
        } else {
          faqItems.forEach((el) => el.classList.remove("active"));
          _this.classList.add("active");

          faqItems.forEach((el) => el?.querySelector('svg').classList.remove("active"));
          _this?.querySelector('svg').classList.add("active");
        }
      };
      title.addEventListener("click", handleClick);
      title._handleClick = handleClick;
    });

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateAnimations, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      titles.forEach((title) => title.removeEventListener("click", title._handleClick));
    };
  }, [itemSelector, titleSelector, contentSelector, pathname]);
};

export default useAccordionAnimation;
