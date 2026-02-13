"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";

export default function HugeTitle({ title, color }: { title: string, color?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const fontSize = useMemo(() => {
    const length = title.length;
    const baseWidth = 100;
    const charWidthFactor = 0.62;
    
    return `${(baseWidth / (length * charWidthFactor))}vw`;
  }, [title]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 20%"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [1.15, 0.8]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [1.15, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["8px", "0px"]);

  return (
    <section
      ref={ref}
      className="relative h-auto overflow-hidden flex justify-center"
    >
      <motion.h2
        style={{
          scaleY,
          scaleX,
          y,
          filter: blur,
          transformOrigin: "center center",
          fontSize,
          color: color || "#000",
        }}
        className="
          font-extrabold
          leading-[0.78]
          tracking-[-0.06em]
          text-neutral-900
          will-change-transform
          whitespace-nowrap
          -ml-[0.5vw]
        "
      >
        {title}
      </motion.h2>
    </section>
  );
}