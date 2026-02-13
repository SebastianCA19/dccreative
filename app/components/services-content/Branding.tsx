"use client";

import { motion } from "framer-motion";

export default function Branding() {
  return (
    <section className="text-white">

      {/* INTRO */}
      <div className="max-w-275 mx-auto mb-32">
        <h3 className="text-5xl md:text-6xl font-serif leading-tight mb-8 text-white font-bold">
          Una marca no es solo cómo se ve,
          es cómo se percibe.
        </h3>

        <p className="text-xl text-neutral-200 leading-relaxed max-w-175">
          El branding define la forma en la que tu negocio es recordado,
          entendido y elegido. Una identidad clara transmite confianza,
          coherencia y dirección.
        </p>

        <p className="text-neutral-300 mt-6 max-w-175 text-lg">
          En DC Creative desarrollamos marcas con intención estratégica,
          diseñadas para sostener el crecimiento y posicionarse con
          claridad en su mercado.
        </p>
      </div>

      {/* BLOQUE VISUAL */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-32 px-6">
        <img
          src="/Tarjeta.png"
          className="w-full h-105 object-cover rounded-2xl shadow-2xl ring-1 ring-white/10 filter grayscale"
          alt="Branding coherente"
        />

        <div>
          <h4 className="text-3xl font-serif mb-6 text-white font-bold">
            Coherencia en cada punto de contacto
          </h4>

          <p className="text-neutral-200 leading-relaxed text-lg">
            Construimos sistemas visuales que se adaptan a redes,
            web, impresos y comunicación comercial sin perder
            consistencia ni identidad.
          </p>
        </div>
      </div>

      {/* FRASE IMPACTO */}
      <div className="py-32 border-y border-white/20 mb-32 text-center">
        <p className="text-4xl md:text-7xl font-serif leading-tight max-w-225 mx-auto text-white font-bold">
          Una marca clara atrae mejores clientes,
          genera confianza y sostiene el crecimiento.
        </p>
      </div>

      {/* PROCESO */}
      <div className="max-w-275 mx-auto mb-32">
        <h4 className="text-3xl font-serif mb-12 text-white font-bold">
          Nuestro proceso
        </h4>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="p-6 rounded-xl bg-white/4 border border-white/10 hover:bg-white/6 hover:border-white/20 transition-all duration-300">
            <h5 className="mb-4 text-white text-xl font-semibold">1. Diagnóstico</h5>
            <p className="text-neutral-200 leading-relaxed">
              Analizamos tu negocio, audiencia, competencia y
              objetivos para definir una dirección clara.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/4 border border-white/10 hover:bg-white/6 hover:border-white/20 transition-all duration-300">
            <h5 className="mb-4 text-white text-xl font-semibold">2. Estrategia</h5>
            <p className="text-neutral-200 leading-relaxed">
              Definimos posicionamiento, personalidad de marca,
              tono y estructura visual.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/4 border border-white/10 hover:bg-white/6 hover:border-white/20 transition-all duration-300">
            <h5 className="mb-4 text-white text-xl font-semibold">3. Diseño</h5>
            <p className="text-neutral-200 leading-relaxed">
              Creamos la identidad visual completa alineada a la
              estrategia definida.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/4 border border-white/10 hover:bg-white/6 hover:border-white/20 transition-all duration-300">
            <h5 className="mb-4 text-white text-xl font-semibold">4. Entrega</h5>
            <p className="text-neutral-200 leading-relaxed">
              Manual de marca y piezas base listas para aplicar en
              todos los canales.
            </p>
          </div>
        </div>
      </div>

      {/* ENTREGABLES */}
      <div className="max-w-275 mx-auto mb-32">
        <h4 className="text-3xl font-serif mb-10 text-white font-bold">
          Entregables principales
        </h4>

        <ul className="grid md:grid-cols-2 gap-4">
          <li className="flex items-start text-neutral-200 text-lg">
            <span className="mr-3 text-white mt-1">•</span>
            <span>Diagnóstico y dirección estratégica</span>
          </li>
          <li className="flex items-start text-neutral-200 text-lg">
            <span className="mr-3 text-white mt-1">•</span>
            <span>Concepto de marca</span>
          </li>
          <li className="flex items-start text-neutral-200 text-lg">
            <span className="mr-3 text-white mt-1">•</span>
            <span>Identidad visual</span>
          </li>
          <li className="flex items-start text-neutral-200 text-lg">
            <span className="mr-3 text-white mt-1">•</span>
            <span>Paleta tipográfica</span>
          </li>
          <li className="flex items-start text-neutral-200 text-lg">
            <span className="mr-3 text-white mt-1">•</span>
            <span>Manual de marca</span>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center py-24 border-t border-white/20">
        <h4 className="text-4xl mb-6 font-bold text-white">
          Cada marca requiere un enfoque distinto
        </h4>

        <p className="text-neutral-300 mb-10 max-w-150 mx-auto text-lg">
          Por eso desarrollamos propuestas personalizadas según el
          alcance, la etapa del negocio y los objetivos de la marca.
        </p>

        <motion.button 
          className="px-10 py-5 bg-white text-black rounded-full font-semibold text-lg shadow-xl relative overflow-hidden hover:cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.div
            className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/60 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
          <span className="relative z-10">Solicitar cotización personalizada</span>
        </motion.button>
      </div>

    </section>
  );
}