"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "galery1.jpg",
    "galery2.jpg",
    "galery3.jpg",
    "galery4.jpg",
];

export default function Foto({ whatsappLink }: { whatsappLink: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const next = () => setIndex((index + 1) % images.length);
  const prev = () =>
    setIndex((index - 1 + images.length) % images.length);

  // detectar swipe
  const handleDragEnd = (e: any, info: any) => {
    if (info.offset.x < -80) next();
    if (info.offset.x > 80) prev();
  };

  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto">

        {/* INTRO */}
        <div className="text-left mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight font-serif mb-6">
            Contenido visual que
            <br />
            conecta y vende
          </h1>

          <p className="mt-6 text-neutral-200 max-w-2xl text-lg leading-relaxed">
            Creamos fotografías y piezas audiovisuales que elevan la
            percepción de tu marca y la hacen destacar en redes,
            campañas y plataformas digitales.
          </p>
        </div>

        {/* RAZÓN */}
        <div className="grid md:grid-cols-2 gap-16 items-center md:mb-32 mb-25">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 font-serif">
              ¿Por qué invertir en contenido profesional?
            </h2>

            <p className="text-neutral-200 leading-relaxed text-lg">
              Las personas compran con los ojos. Un buen contenido visual
              genera confianza, posiciona tu marca y aumenta la
              percepción de valor de tus productos o servicios.
            </p>
          </div>

          <div className="relative">
            <video 
              src="/video2.mp4" 
              className="rounded-2xl shadow-2xl w-full h-full object-cover ring-1 ring-white/10" 
                autoPlay
                loop
                muted
                playsInline
            />
          </div>
        </div>

        {/* GALERÍA */}
        <div className="mb-15">
          <h3 className="text-7xl font-bold text-white text-center mb-12 font-serif tracking-widest">
            NUESTRO TRABAJO
          </h3>

          <div className="relative w-full max-w-4xl mx-auto aspect-3/4 md:aspect-14/10 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
            <AnimatePresence initial={false}>
              <motion.img
                key={index}
                src={images[index]}
                className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.7,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}

                // swipe mobile
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
              />
            </AnimatePresence>
          </div>
          {/* CONTROLES */}
          <div className="flex justify-center items-center gap-6 mt-8">
            {/* Botón anterior */}
            <motion.button
              onClick={prev}
              className="w-12 h-12 rounded-full border-2 border-white/20 bg-white/5 hover:bg-white hover:border-white hover:text-black text-white transition-all duration-300 flex items-center justify-center font-bold text-lg shadow-xl backdrop-blur-sm hover:cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ←
            </motion.button>

            {/* Indicadores (dots) */}
            <div className="flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === index 
                      ? "w-8 h-3 bg-white" 
                      : "w-3 h-3 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>

            {/* Botón siguiente */}
            <motion.button
              onClick={next}
              className="w-12 h-12 rounded-full border-2 border-white/20 bg-white/5 hover:bg-white hover:border-white hover:text-black text-white transition-all duration-300 flex items-center justify-center font-bold text-lg shadow-xl backdrop-blur-sm hover:cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              →
            </motion.button>
          </div>

          {/* Contador */}
          <p className="text-center mt-4 text-neutral-400 text-sm">
            {index + 1} / {images.length}
          </p>
        </div>

        {/* QUOTE VISUAL */}
        <div className="text-center py-20 border-y border-white/20">
          <p className="text-4xl md:text-5xl font-serif leading-tight max-w-3xl mx-auto text-white font-bold">
            El contenido visual de calidad no es un gasto,
            es una inversión en la percepción de tu marca.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center rounded-3xl px-8 py-10">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">
            Llevemos tu marca a otro nivel visual
          </h3>

          <p className="text-neutral-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Cada proyecto es diferente. Cuéntanos qué necesitas y
            crearemos una propuesta audiovisual a tu medida.
          </p>
        <motion.button 
          className="px-5 py-5 md:px-10 md:py-5 bg-white text-black rounded-full font-semibold text-md md:text-lg shadow-xl hover:cursor-pointer relative overflow-hidden mt-10"
          whileHover="hover"
          initial="rest"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05 }
          }}
        >
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0"
            variants={{
              rest: { x: "-100%", opacity: 0 },
              hover: { x: "100%", opacity: 0.3 }
            }}
            transition={{ duration: 0.6 }}
            onClick={() => window.open(whatsappLink, "blank")}
          />
          <span className="relative z-10">Solicitar propuesta personalizada</span>
        </motion.button>
          <p className="text-xs mt-4 md:mt-2 text-neutral-400">El precio depende de la dificultad del proyecto a realizar</p>
        </div>

      </div>
    </section>
  );
}