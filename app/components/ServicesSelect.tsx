"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  options: string[];
  value: number;
  onChange: (index: number) => void;
};

export default function ServiceSelect({ options, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // cerrar al hacer click fuera
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", handle);
    return () => window.removeEventListener("click", handle);
  }, []);

  return (
    <div ref={ref} className="relative w-full md:hidden flex itmes-center justify-center">
      {/* SELECT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-auto
          flex items-center justify-between
          px-6 py-4
          rounded-xl
          bg-white/5
          backdrop-blur
          border border-white/10
          text-white font-serif text-lg
          tracking-wide
        "
      >
        {options[value]}

        {/* icon */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4"
        >
          ▾
        </motion.span>
      </button>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="
              absolute left-0 right-0 mt-3
              rounded-xl
              bg-neutral-900
              border border-white/10
              overflow-hidden
              z-40
            "
          >
            {options.map((opt, i) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(i);
                  setOpen(false);
                }}
                className="relative w-full text-left px-6 py-4 group"
              >
                {/* glow */}
                <span className="
                  absolute inset-0
                  opacity-0 group-hover:opacity-40
                  blur-xl transition
                  bg-linear-to-r from-neutral-500 via-neutral-600 to-neutral-700
                " />

                <span
                  className={`
                    relative z-10 font-serif tracking-wide
                    ${
                      i === value
                        ? "text-white"
                        : "text-neutral-400"
                    }
                  `}
                >
                  {opt}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
