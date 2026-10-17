"use client";

import { motion } from "framer-motion";
import Title from "./Title";

type Cliente = {
  nombre: string;
  rubro: string;
  handle: string;
  link: string;
  monograma: string;
  /** Ruta en /public cuando el cliente mande su logo o captura. Con null se usa el monograma. */
  imagen: string | null;
};

const clientes: Cliente[] = [
  {
    nombre: "Libardo Pérez",
    rubro: "Derecho Administrativo",
    handle: "@libardoperezv",
    link: "https://www.instagram.com/libardoperezv/",
    monograma: "LP",
    imagen: null,
  },
  {
    nombre: "Dr. Lilio Badel Rey",
    rubro: "Medicina Estética",
    handle: "@drliliobadelrey_",
    link: "https://www.instagram.com/drliliobadelrey_/",
    monograma: "LB",
    imagen: null,
  },
  {
    nombre: "Colegio Pestalozziano",
    rubro: "Educación",
    handle: "@colpesoficial",
    link: "https://www.instagram.com/colpesoficial/",
    monograma: "CP",
    imagen: null,
  },
  {
    nombre: "Sonrisas del Alma",
    rubro: "Odontología",
    handle: "@sonrisasdelalmaod",
    link: "https://www.instagram.com/sonrisasdelalmaod/",
    monograma: "SA",
    imagen: null,
  },
  {
    nombre: "María José Villa",
    rubro: "Dermatología",
    handle: "@mariajosevilladermatologa",
    link: "https://www.instagram.com/mariajosevilladermatologa/",
    monograma: "MV",
    imagen: null,
  },
  {
    nombre: "Dra. Karen Falcon",
    rubro: "Odontología",
    handle: "@dra.karenfalconm",
    link: "https://www.instagram.com/dra.karenfalconm/",
    monograma: "KF",
    imagen: null,
  },
];

export default function Portfolio() {
  return (
    <section id="portafolio" className="bg-[#f2f0eb] overflow-hidden">
      <Title title="PORTAFOLIO" color="#171717" />

      <div className="max-w-350 mx-auto px-6 md:px-12 md:py-16 py-10">
        {/* INTRO */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          <h2 className="text-sm tracking-[0.2em] uppercase text-neutral-500 mb-6">
            Nuestros clientes
          </h2>

          <p className="text-2xl md:text-3xl font-serif text-neutral-900 leading-relaxed max-w-3xl">
            Profesionales, clínicas y marcas que confían su presencia digital a
            DC Creative.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {clientes.map((cliente, i) => (
            <motion.a
              key={cliente.handle}
              href={cliente.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="group flex flex-col bg-white rounded-2xl shadow-lg ring-1 ring-black/5 overflow-hidden transition-shadow duration-500 hover:shadow-2xl"
            >
              {/* VISUAL */}
              <div className="relative aspect-4/5 overflow-hidden bg-[#171717]">
                {cliente.imagen ? (
                  <img
                    src={cliente.imagen}
                    alt={cliente.nombre}
                    className="w-full h-full object-cover filter grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-[6rem] leading-none text-white/90 select-none transition-transform duration-700 group-hover:scale-105">
                      {cliente.monograma}
                    </span>
                  </div>
                )}

                {/* FLECHA */}
                <span className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur text-white/70 text-lg transition-all duration-300 group-hover:bg-white group-hover:text-[#171717]">
                  ↗
                </span>
              </div>

              {/* INFO */}
              <div className="flex flex-col gap-2 p-6">
                <span className="text-xs tracking-[0.2em] uppercase text-neutral-500">
                  {cliente.rubro}
                </span>

                <h3 className="text-xl font-serif text-[#171717] leading-snug">
                  {cliente.nombre}
                </h3>

                <span className="text-sm text-neutral-400">
                  {cliente.handle}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
