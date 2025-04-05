import { motion, useScroll, useTransform } from "motion/react";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

function App() {
  // Lenis smooth scrolling
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  // Ref for the scroll position
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll position
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.9],
    [
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 34% 40%, 34% 83%, 72% 83%, 72% 40%, 32% 40%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%)",
    ]
  );

  const slideUp = useTransform(scrollYProgress, [0, 0.2], ["0%", "-100%"]);

  const fadeOut = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const imageDown = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);

  return (
    <main>
      {/* Parent Div */}
      <div ref={scrollRef} className="relative h-[230vh]">
        <div className="sticky top-0 h-screen">
          {/* Image Wrapper */}
          <div className="absolute inset-0 -z-10">
            <motion.img
              className="h-screen w-full"
              style={{ y: imageDown }}
              src="/image.webp"
              alt="image"
            />
          </div>
          {/* Text Overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center bg-gray-300 text-neutral-950"
            style={{
              clipPath: clipPath,
            }}
          >
            <motion.h1
              className="text-[9vw] font-extrabold uppercase tracking-tighter"
              style={{ y: slideUp }}
            >
              Fathers{" "}
              <span className="text-5xl inline-block -mx-3 -translate-y-1/2">
                &
              </span>{" "}
              Mothers
            </motion.h1>
            <motion.p
              className="text-2xl font-serif"
              style={{ opacity: fadeOut }}
            >
              Every town across Canada has a Chinese-Canadian café
            </motion.p>
          </motion.div>
        </div>
      </div>
      {/* Content Below */}
      <div className="bg-gray-300 text-neutral-950 px-10 py-24 text-4xl h-screen flex flex-col items-center justify-center uppercase font-bold tracking-tighter">
        <div>
          <p>
            Inspired from:{" "}
            <a href="https://sonsanddaughters.xyz/">sonsanddaughters.xyz</a>
          </p>
          <p>
            Source Code: <a href="https://github.com/shakanksh/mask-animation">Github</a>
          </p>
          <p>
            Connect: <a href="https://www.instagram.com/shakankshs/">Instagram</a>, <a href="https://x.com/shakanksh">X</a>,{" "}
            <a href="https://www.linkedin.com/in/shakanksh/">LinkedIn</a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
