"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll(".reveal");
      if (elements) {
        elements.forEach((el) => {
          gsap.set(el, { opacity: 0, y: 40 });
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 60%",
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050510] px-6 py-16 sm:px-10 md:py-24"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.03)",
      }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="reveal text-2xl font-bold tracking-wider text-white sm:text-3xl md:text-4xl">
          ENGINEERED FOR{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #00e5ff, #7b2ff7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            IMPACT
          </span>
        </h2>
        <p className="reveal mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
          Every scroll, every animation, every micro-interaction is purpose-built
          to deliver a seamless, premium experience that keeps users engaged.
        </p>

        <div className="reveal mt-12 grid grid-cols-3 gap-6">
          {[
            { num: "60", unit: "FPS", desc: "Butter-smooth motion" },
            { num: "0", unit: "ms", desc: "Layout reflows" },
            { num: "GPU", unit: "", desc: "Accelerated transforms" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span
                className="text-3xl font-bold sm:text-4xl"
                style={{
                  background: "linear-gradient(135deg, #00f0ff, #7b2ff7, #ff2d55)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {item.num}
                <span className="text-lg">{item.unit}</span>
              </span>
              <span className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                {item.desc}
              </span>
            </div>
          ))}
        </div>

        <div className="reveal mt-14 flex flex-wrap items-center justify-center gap-4 text-xs font-medium uppercase tracking-widest text-gray-600">
          {["Next.js", "React", "GSAP", "Tailwind CSS", "TypeScript"].map(
            (tech, i) => (
              <span
                key={i}
                className="rounded-full border border-white/5 px-4 py-1.5 transition-colors hover:border-white/10 hover:text-gray-400"
              >
                {tech}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
