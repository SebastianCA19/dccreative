"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Redes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  // contador %
  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = 80; // puedes cambiar %
    const duration = 800;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [inView]);

  return (
    <section className="text-white">

      {/* INTRO */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
        <div>
          <h3 className="text-4xl font-serif mb-6 font-bold text-white">
            MANEJO ESTRATEGICO DE REDES SOCIALES
          </h3>

          <p className="text-neutral-200 leading-relaxed mb-6 text-lg">
            Hoy las redes sociales no son solo un canal de publicación, son una
            herramienta de posicionamiento, confianza y crecimiento.  
            Un manejo estratégico permite que tu marca comunique con intención,
            conecte con su audiencia y convierta visibilidad en resultados
            reales.
          </p>

          <p className="text-neutral-300 leading-relaxed text-lg">
            En DC Creative estructuramos el contenido, la comunicación y la
            ejecución para que tus redes no se improvisen: se dirijan con
            estrategia.
          </p>
        </div>

        <div className="w-full h-105 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
          <img src="/redes.jpeg" className="w-full h-full object-cover filter grayscale" alt="Redes sociales" />
        </div>
      </div>

      {/* IMPACTO */}
      <div
        ref={ref}
        className="text-center py-20 border-y border-white/20 mb-20 "
      >
        <p className="text-2xl mb-8 text-neutral-100 font-semibold">
          El manejo de redes puede hacer crecer tu negocio en un
        </p>

        <div className="text-[120px] font-bold tracking-tight text-white drop-shadow-lg">
          {count}%
        </div>

        <p className="text-neutral-300 mt-4 text-lg max-w-2xl mx-auto">
          cuando existe estrategia, constancia y optimización real.
        </p>
      </div>

      {/* COMPARACIÓN */}
      <div className="mb-24">
        <h4 className="text-3xl font-serif mb-12 text-center text-white font-bold">
          Planes de manejo mensual
        </h4>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* BÁSICO */}
          <div className="p-8 rounded-2xl bg-white/[0.07] border border-white/20 hover:bg-white/9 transition-all duration-300 hover:border-white/30 hover:shadow-xl hover:scale-[1.02] shadow-lg">
            <h5 className="text-3xl  mt-2 mb-8 text-white font-semibold text-center">BÁSICO</h5>
            <div className="text-center border-y border-white/20 mb-8 bg-white/2"/>

            <ul className="space-y-4 text-neutral-200">
              <li className="flex items-center">
                <span className="mr-3 text-neutral-400 mt-1">•</span>
                <span>Planeación estratégica</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-neutral-400 mt-1">•</span>
                <span>Producción de contenido</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-neutral-400 mt-1">•</span>
                <span>4 reels mensuales</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-neutral-400 mt-1">•</span>
                <span>1 visita de grabación</span>
              </li>
              <li className="flex items-center opacity-60">
                <span className="mr-3 text-neutral-500 mt-1">•</span>
                <span>Sin Meta Ads</span>
              </li>
              <li className="flex items-center opacity-60">
                <span className="mr-3 text-neutral-500 mt-1">•</span>
                <span>Sin optimización avanzada</span>
              </li>
            </ul>
          </div>

          {/* INTERMEDIO */}
          <div className="p-8 rounded-2xl bg-white/12 border border-white/30 hover:bg-white/15 transition-all duration-300 hover:border-white/40 shadow-lg hover:shadow-2xl relative hover:scale-[1.02]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">
              Popular
            </div>
            <h5 className="text-3xl mt-2 mb-8 font-semibold text-center">INTERMEDIO</h5>
            <div className="text-center border-y border-white/20 mb-8 bg-white/2"/>

            <ul className="space-y-4 text-neutral-100">
              <li className="flex items-center">
                <span className="mr-3 text-neutral-300 mt-1">•</span>
                <span>Planeación estratégica</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-neutral-300 mt-1">•</span>
                <span>Producción de contenido</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-neutral-300 mt-1">•</span>
                <span>8 reels mensuales</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-neutral-300 mt-1">•</span>
                <span>2 visitas de grabación</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-neutral-300 mt-1">•</span>
                <span>Meta Ads básico</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-neutral-300 mt-1">•</span>
                <span>Optimización mensual</span>
              </li>
            </ul>
          </div>

          {/* PREMIUM */}
          <div className="p-8 rounded-2xl bg-white text-black hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] shadow-xl">
            <h5 className="text-3xl mt-2 mb-8 font-semibold">PREMIUM</h5>
            <div className="text-center border-y border-black/20 mb-8 bg-black/2"/>

            <ul className="space-y-4 text-neutral-800">
              <li className="flex items-center">
                <span className="mr-3 text-neutral-600 mt-1">•</span>
                <span>Planeación estratégica</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-neutral-600 mt-1">•</span>
                <span>Producción continua</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-neutral-600 mt-1">•</span>
                <span>8+ reels mensuales</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-neutral-600 mt-1">•</span>
                <span>Grabación constante</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-neutral-600 mt-1">•</span>
                <span>Meta Ads avanzado</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-neutral-600 mt-1">•</span>
                <span>Optimización semanal</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-24 border-t border-white/20">
        <h4 className="text-4xl font-serif mb-6 text-white font-bold">
          Empieza a estructurar tus redes con intención
        </h4>

        <p className="text-neutral-300 mb-10 text-lg">
          Puedes solicitar tu plan de manejo desde
        </p>

        <div className="text-5xl font-bold mb-10 text-white">
          $450.000 <span className="text-neutral-400 text-3xl">COP</span>
        </div>

        <motion.button 
          className="px-10 py-5 bg-white text-black rounded-full font-semibold text-lg shadow-xl hover:cursor-pointer relative overflow-hidden"
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
          />
          <span className="relative z-10">Solicitar propuesta</span>
        </motion.button>
      </div>

    </section>
  );
}