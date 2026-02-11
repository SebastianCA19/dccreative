"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden text-[#f1e9e0]">

      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-black/90" />

      {/* Blur lateral estilo referencia */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-1/2 bg-[#1a0e0a]/70 blur-2xl" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 blur-3xl" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 pt-24">
        <div className="max-w-5xl text-center">
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="leading-[0.9]"
          >
            <span className="block font-serif italic text-[clamp(3rem,7vw,6rem)] font-light">
              La creatividad
            </span>

            <span className="block font-serif text-[clamp(3.2rem,7vw,6.2rem)] font-light">
              es infinita
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-8 max-w-md text-sm md:text-base text-[#e8dfd6]"
          >
            Manejo de redes sociales, identidad visual y estrategia creativa
            para marcas que quieren destacar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <button className="rounded-lg border border-white/40 px-8 py-3 text-sm tracking-wide transition hover:bg-white hover:text-black">
              Ver servicios
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
