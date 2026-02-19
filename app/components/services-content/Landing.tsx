"use client";

import { motion } from "framer-motion";

export default function Landing({ whatsappLink }: { whatsappLink: string }) {
  return (
    <section className="text-white">

      {/* HERO INTRO */}
      <div className="flex items-center justify-end">
            <h4 className="text-sm mb-4 text-neutral-700 px-4 py-2 bg-white inline-block rounded-full font-semibold">
              Nuevo servicio
            </h4>
          </div>
      <div className="max-w-275 mx-auto mb-32">
        <h3 className="text-5xl md:text-6xl font-serif leading-tight mb-8 text-white font-bold">
          Tu landing page no es solo una página,
          es tu mejor vendedor digital.
        </h3>

        <p className="text-xl text-neutral-200 leading-relaxed max-w-175">
          Una landing page efectiva transforma visitantes en clientes. Cada elemento,
          cada palabra y cada diseño debe estar optimizado para convertir.
        </p>

        <p className="text-neutral-300 mt-6 max-w-175 text-lg">
          En DC Creative diseñamos páginas de aterrizaje estratégicas que no solo
          se ven bien, sino que generan resultados medibles.
        </p>
      </div>

      {/* BLOQUE VISUAL */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-32 px-6">
        <div>
          <h4 className="text-3xl font-serif mb-6 text-white font-bold">
            ¿Qué hace efectiva una landing page?
          </h4>

          <div className="space-y-6">
            <div>
              <h5 className="text-white font-semibold mb-2 text-lg">Mensaje claro y directo</h5>
              <p className="text-neutral-200 leading-relaxed">
                Tu propuesta de valor debe entenderse en segundos.
              </p>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-2 text-lg">Diseño orientado a conversión</h5>
              <p className="text-neutral-200 leading-relaxed">
                Cada elemento visual guía al usuario hacia la acción.
              </p>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-2 text-lg">Optimización técnica</h5>
              <p className="text-neutral-200 leading-relaxed">
                Carga rápida, responsive y preparada para SEO.
              </p>
            </div>
          </div>
        </div>

        <img
          src="/landing.jpeg"
          className="w-full h-105 object-cover rounded-2xl shadow-2xl ring-1 ring-white/10 filter grayscale"
          alt="Landing page efectiva"
        />
      </div>

      {/* FRASE IMPACTO */}
      <div className="py-32 border-y border-white/20 mb-32 text-center">
        <p className="text-5xl md:text-7xl font-serif leading-tight max-w-225 mx-auto text-white font-bold">
          Una landing page optimizada puede aumentar
          tus conversiones hasta un 300%.
        </p>
      </div>

      {/* ELEMENTOS CLAVE */}
      <div className="max-w-275 mx-auto mb-32">
        <h4 className="text-3xl font-serif mb-12 text-white font-bold text-center">
          Elementos que incluimos
        </h4>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Elemento 1 */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-2xl">
              ✦
            </div>
            <h5 className="text-xl mb-4 font-semibold text-white">Diseño impactante</h5>
            <p className="text-neutral-200 leading-relaxed">
                Combinación de estética y funcionalidad para captar atención y guiar al usuario.
            </p>
          </div>

          {/* Elemento 2 */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-2xl">
              ⚡
            </div>
            <h5 className="text-xl mb-4 font-semibold text-white">Beneficios claros</h5>
            <p className="text-neutral-200 leading-relaxed">
              Presentación estratégica de lo que tu producto o servicio soluciona.
            </p>
          </div>

          {/* Elemento 3 */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-2xl">
              ✓
            </div>
            <h5 className="text-xl mb-4 font-semibold text-white">Prueba social</h5>
            <p className="text-neutral-200 leading-relaxed">
              Testimonios, casos de éxito y elementos de confianza.
            </p>
          </div>

          {/* Elemento 4 */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-2xl">
              →
            </div>
            <h5 className="text-xl mb-4 font-semibold text-white">Call-to-action estratégico</h5>
            <p className="text-neutral-200 leading-relaxed">
              Botones y formularios optimizados para máxima conversión.
            </p>
          </div>

          {/* Elemento 5 */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-2xl">
              🎨
            </div>
            <h5 className="text-xl mb-4 font-semibold text-white">Diseño responsive</h5>
            <p className="text-neutral-200 leading-relaxed">
              Perfecta visualización en móvil, tablet y desktop.
            </p>
          </div>

        </div>
      </div>

      {/* PROCESO */}
      <div className="max-w-275 mx-auto mb-32">
        <h4 className="text-3xl font-serif mb-12 text-white font-bold text-center">
          Cómo trabajamos tu landing page
        </h4>

        <div className="space-y-6">
          
          <div className="flex gap-6 p-8 rounded-2xl bg-white/4 border border-white/10">
            <div className="shrink-0 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h5 className="text-white text-xl font-semibold mb-2">Brief y estrategia</h5>
              <p className="text-neutral-200 leading-relaxed">
                Entendemos tu producto, audiencia y objetivo de conversión para definir
                la arquitectura de información y el enfoque estratégico.
              </p>
            </div>
          </div>

          <div className="flex gap-6 p-8 rounded-2xl bg-white/4 border border-white/10">
            <div className="shrink-0 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h5 className="text-white text-xl font-semibold mb-2">Copywriting y contenido</h5>
              <p className="text-neutral-200 leading-relaxed">
                Creamos textos persuasivos optimizados para conversión, con propuesta
                de valor clara y llamados a la acción efectivos.
              </p>
            </div>
          </div>

          <div className="flex gap-6 p-8 rounded-2xl bg-white/4 border border-white/10">
            <div className="shrink-0 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h5 className="text-white text-xl font-semibold mb-2">Diseño y desarrollo</h5>
              <p className="text-neutral-200 leading-relaxed">
                Diseñamos la interfaz con UX/UI enfocado en conversión y desarrollamos
                con tecnología moderna, rápida y optimizada.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DIFERENCIADOR */}
      <div className="py-20 mb-32 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-neutral-400 uppercase tracking-wider text-sm mb-4">
            Más que diseño
          </p>
          <h4 className="text-4xl md:text-5xl font-serif text-white font-bold mb-6">
            Creamos activos digitales que generan retorno
          </h4>
          <p className="text-neutral-200 text-lg leading-relaxed">
            No vendemos páginas bonitas. Vendemos herramientas de conversión
            diseñadas estratégicamente para alcanzar tus objetivos de negocio.
          </p>
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="text-center py-24 border-t border-white/20">
        <h4 className="text-4xl font-serif mb-6 text-white font-bold">
          Cada proyecto es único
        </h4>

        <p className="text-neutral-300 mb-10 max-w-2xl mx-auto text-lg">
          Desarrollamos tu landing page de forma personalizada según tu industria,
          audiencia y objetivos específicos de conversión.
        </p>

        <motion.button 
          className="px-5 py-5 md:px-10 md:py-5 bg-white text-black rounded-full font-semibold text-md md:text-lg shadow-xl hover:cursor-pointer relative overflow-hidden"
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
          <span className="relative z-10">Solicitar asesoria personalizada</span>
        </motion.button>

        <p className="text-neutral-400 mt-8 text-sm">
          Agenda una reunión sin costo para revisar tu proyecto
        </p>
      </div>

    </section>
  );
}