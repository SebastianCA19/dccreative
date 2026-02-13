"use client";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Title from "./components/Title";
import ServiceSelect from "./components/ServicesSelect";
import { motion } from "framer-motion";
import { useState } from "react";
import ServiceContent from "./components/ServiceContent";

export default function Home() {
  const services = [
    "MANEJO DE REDES",
    "BRANDING/REBRANDING",
    "FOTOGRAFÍA Y FILMAKING",
    "LANDING PAGE",
  ];

  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <Header />

      {/* HERO */}
      <Hero />

      {/* ESENCIA */}
      <section className="bg-[#f2f0eb] overflow-hidden">
        <Title title="ESENCIA" color="#171717" />

        <div className="max-w-350 mx-auto px-6 md:px-12 md:py-16 py-5">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* VIDEO */}
            <div className="w-full lg:w-1/2">
              <video
                src="/video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="
            w-full 
            h-[60vh] lg:h-[80vh] 
            object-cover 
            rounded-2xl
          "
              />
            </div>

            {/* TEXTO */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-end text-center lg:text-right">
              <h2
                className="
          text-sm tracking-[0.2em] uppercase
          text-neutral-500 mb-6
        "
              >
                ¿Quiénes somos?
              </h2>

              <p
                className="
          text-2xl md:text-3xl
          font-serif
          text-neutral-900
          leading-relaxed
          max-w-130
          mb-8
        "
              >
                En <span className="font-bold">DC CREATIVE</span> acompañamos
                marcas, negocios y empresas en la construcción de una presencia
                digital coherente, estratégica y alineada a sus objetivos.
              </p>

              <p
                className="
          text-xl
          text-neutral-600
          leading-relaxed
          max-w-150
        "
              >
                Creemos en el contenido con propósito, en las marcas
                estratégicamente dirigidas y en procesos claros que sostienen el
                crecimiento. Nuestro enfoque integra estrategia, creatividad y
                ejecución para que las redes sociales no solo comuniquen, sino
                que generen valor real para tu marca.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-350 mx-auto px-6 md:px-12 md:py-16 py-5">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 text-center lg:text-left">
            {/* TEXTO */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <h2
                className="
          text-sm tracking-[0.2em] uppercase
          text-neutral-500 mb-6 mt-4
        "
              >
                PILARES
              </h2>
              <p
                className="
          text-xl
          text-neutral-900
          leading-relaxed
          max-w-150
        "
              >
                Nuestra labor se fundamenta en un proceso integral que comienza
                con un diagnóstico preciso y una dirección estratégica de marca,
                sentando las bases necesarias para una identidad sólida. A
                partir de allí, definimos con maestría el lenguaje visual y
                comunicacional a través de nuestra dirección creativa,
                asegurando que cada mensaje resuene con claridad. Esta visión se
                materializa en una ejecución impecable de contenido, siempre
                guiada por la intención y la coherencia en cada plataforma.
                Finalmente, cerramos el ciclo mediante una lectura analítica de
                resultados que nos permite la optimización constante de cada
                esfuerzo, garantizando un crecimiento sostenido y estratégico.
              </p>
            </div>

            {/* IMAGEN */}
            <div className="w-full lg:w-1/2">
              <img
                src="/photo_2.jpg"
                alt="Esencia DC Creative"
                className="
            w-full 
            h-[60vh] lg:h-[80vh] 
            object-cover 
            rounded-2xl
            filter grayscale
          "
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="bg-linear-to-br from-black via-neutral-900 to-neutral-800 overflow-hidden">
        <div className="mt-7 lg:mt-0">
          <Title title="SERVICIOS" color="#ffffff" />
        </div>
        <div className="max-w-350 mx-auto px-6 md:px-12 mt-8 lg:mt-15">
          <h1 className="text-[#f2f0eb] text-center max-w-full mx-auto text-xl md:text-2xl leading-relaxed mb-12">
            DC Creative ofrece una gama de servicios diseñados para potenciar tu
            presencia digital y construir una marca sólida. Desde el manejo
            estratégico de redes sociales hasta el desarrollo de identidades
            visuales impactantes, nuestro enfoque integral abarca cada aspecto
            necesario para destacar en el entorno digital.
          </h1>
        </div>
        <nav className="flex-wrap justify-center gap-10 py-16 hidden md:flex">
          {services.map((item, i) => (
            <button
              key={item}
              onClick={() => setActive(i)}
              className="relative group hover:cursor-pointer"
            >
              {/* glow */}
              <span
                className="
        absolute inset-0 
        translate-y-6
        opacity-0 
        transition-all duration-500
        group-hover:opacity-60
        group-hover:translate-y-2
        bg-linear-to-r from-neutral-500 via-neutral-600 to-neutral-700
        rounded-t-full
        blur-xl
      "
              />

              {/* texto */}
              <span
                className={`
          relative z-10
          font-serif
          text-xl md:text-2xl
          tracking-wide
          transition-all duration-400
          ${
            active === i
              ? "text-white"
              : "text-neutral-400 group-hover:text-white"
          }
        `}
              >
                {item}
              </span>

              {/* underline activo */}
              <motion.span
                layoutId="serviceUnderline"
                className="absolute left-0 -bottom-3 h-px bg-white"
                style={{
                  width: active === i ? "100%" : 0,
                }}
                transition={{ duration: 0.4 }}
              />
            </button>
          ))}
        </nav>
        
        <ServiceSelect
          options={services}
          value={active}
          onChange={setActive}
        />
        <ServiceContent active={active} />
      </section>

      {/* SECCIÓN TEST 3 */}
      <section className="h-screen bg-neutral-200 flex items-center justify-center">
        <h2 className="text-5xl font-serif text-black">Sección 3</h2>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
