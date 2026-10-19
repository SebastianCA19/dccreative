"use client";

import { motion } from "framer-motion";
import GalleryCarousel from "./GalleryCarousel";
import { GALLERY } from "./gallery";

export default function Photo({ whatsappLink }: { whatsappLink: string }) {
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
          <GalleryCarousel items={GALLERY} />
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
          onClick={() => window.open(whatsappLink, "blank")}
        >
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0"
            variants={{
              rest: { x: "-100%", opacity: 0 },
              hover: { x: "100%", opacity: 0.3 }
            }}
            transition={{ duration: 0.6 }}
          />
          <span className="relative z-10">Solicitar propuesta personalizada</span>
        </motion.button>
          <p className="text-xs mt-4 md:mt-2 text-neutral-400">El precio depende de la dificultad del proyecto a realizar</p>
        </div>

      </div>
    </section>
  );
}