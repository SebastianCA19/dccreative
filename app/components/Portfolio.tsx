"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Title from "./Title";

type Client = {
  name: string;
  industry: string;
  handle: string;
  link: string;
  monogram: string;
  bio: string;
  verified: boolean;
  /** Foto en /public/portfolio, sin extensión. null = monograma. */
  photo: string | null;
};

const clients: Client[] = [
  {
    name: "Libardo Pérez",
    industry: "Derecho Administrativo",
    handle: "@libardoperezv",
    link: "https://www.instagram.com/libardoperezv/",
    monogram: "LP",
    bio: "Abogado corporativo · Especialista en derecho administrativo",
    verified: true,
    photo: "libardo",
  },
  {
    name: "Dr. Lilio Badel Rey",
    industry: "Medicina Estética",
    handle: "@drliliobadelrey_",
    link: "https://www.instagram.com/drliliobadelrey_/",
    monogram: "LB",
    bio: "Antienvejecimiento y longevidad · Manejo integral del acné",
    verified: true,
    photo: "lilio",
  },
  {
    name: "Salua Isaac",
    industry: "Joyería Artesanal",
    handle: "@saluaisaacjoyeria",
    link: "https://www.instagram.com/saluaisaacjoyeria/",
    monogram: "SI",
    bio: "Joyería hecha a mano en Colombia · Envíos nacionales",
    verified: false,
    photo: "salua",
  },
  {
    name: "Sonrisas del Alma",
    industry: "Odontología",
    handle: "@sonrisasdelalmaod",
    link: "https://www.instagram.com/sonrisasdelalmaod/",
    monogram: "SA",
    bio: "Odontología general y odontopediatría · Ovejas, Sucre",
    verified: false,
    photo: "sonrisas",
  },
  {
    name: "Dra. Karen Falcon",
    industry: "Odontología Especializada",
    handle: "@dra.karenfalconm",
    link: "https://www.instagram.com/dra.karenfalconm/",
    monogram: "KF",
    bio: "Implantología oral, rehabilitación y urgencias · Sincelejo",
    verified: false,
    photo: "karen",
  },
  {
    name: "María José Villa",
    industry: "Dermatología",
    handle: "@mariajosevilladermatologa",
    link: "https://www.instagram.com/mariajosevilladermatologa/",
    monogram: "MV",
    bio: "Clínica y estética · Tratamiento de enfermedades dermatológicas",
    verified: false,
    photo: "mariajose",
  },
  {
    name: "Colegio Pestalozziano",
    industry: "Educación",
    handle: "@colpesoficial",
    link: "https://www.instagram.com/colpesoficial/",
    monogram: "CP",
    bio: "Ciencia, estudio y progreso · Más que un colegio, una gran familia",
    verified: false,
    photo: "colegio",
  },
];

/** Insignia azul de cuenta verificada. */
function VerifiedBadge() {
  return (
    <svg viewBox="0 0 24 24" aria-label="Cuenta verificada" className="w-4 h-4 shrink-0">
      <path
        fill="#0095f6"
        d="M12 1.5l2.35 1.9 2.99-.4 1.2 2.77 2.77 1.2-.4 2.99L22.5 12l-1.9 2.35.4 2.99-2.77 1.2-1.2 2.77-2.99-.4L12 22.5l-2.35-1.9-2.99.4-1.2-2.77-2.77-1.2.4-2.99L1.5 12l1.9-2.35-.4-2.99 2.77-1.2 1.2-2.77 2.99.4L12 1.5z"
      />
      <path
        fill="#fff"
        d="M10.6 15.3l-2.8-2.8 1.1-1.1 1.7 1.7 4.5-4.5 1.1 1.1-5.6 5.6z"
      />
    </svg>
  );
}

/** Extensiones que se prueban, en orden. */
const IMAGE_EXTENSIONS = [".avif", ".jpg", ".png", ".webp", ".jpeg"];

/** Foto del cliente en el anillo de Instagram. Sin archivo, cae al monograma. */
function Avatar({
  photo,
  name,
  monogram,
}: {
  photo: string | null;
  name: string;
  monogram: string;
}) {
  const [attempt, setAttempt] = useState(0);
  const noPhoto = !photo || attempt >= IMAGE_EXTENSIONS.length;

  return (
    <span className="shrink-0 w-16 h-16 rounded-full p-[2.5px] bg-[conic-gradient(from_200deg,#f9ce34,#ee2a7b,#6228d7,#f9ce34)] transition-transform duration-500 group-hover:scale-105">
      <span className="flex w-full h-full items-center justify-center rounded-full overflow-hidden bg-[#171717]">
        {noPhoto ? (
          <span className="font-serif text-xl leading-none text-white/90 select-none">
            {monogram}
          </span>
        ) : (
          <img
            src={`/portfolio/${encodeURIComponent(photo)}${IMAGE_EXTENSIONS[attempt]}`}
            alt={name}
            width={64}
            height={64}
            onError={() => setAttempt((n) => n + 1)}
            className="w-full h-full object-cover"
          />
        )}
      </span>
    </span>
  );
}

export default function Portfolio() {
  // Centra la tarjeta cuando la última fila queda sola.
  const centerLastCard = clients.length % 3 === 1;

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
          {clients.map((client, i) => (
            <motion.a
              key={client.handle}
              href={client.link}
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
              className={`group flex flex-col bg-[#faf9f6] rounded-2xl ring-1 ring-[#171717]/8 shadow-[0_2px_12px_rgba(23,23,23,0.05)] overflow-hidden transition-shadow duration-500 hover:shadow-[0_12px_32px_rgba(23,23,23,0.10)] ${
                centerLastCard && i === clients.length - 1 ? "lg:col-start-2" : ""
              }`}
            >
              {/* HEADER */}
              <div className="flex items-center gap-4 px-6 py-4">
                <Avatar
                  photo={client.photo}
                  name={client.name}
                  monogram={client.monogram}
                />

                <div className="min-w-0 flex-1">
                  <h3 className="flex items-center gap-1.5 font-serif text-lg text-[#171717] leading-snug">
                    <span className="truncate">{client.name}</span>
                    {client.verified && <VerifiedBadge />}
                  </h3>

                  <span className="block text-sm text-neutral-400 truncate">
                    {client.handle}
                  </span>
                </div>

                <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-[#171717]/6 text-[#171717]/60 text-lg transition-all duration-300 group-hover:bg-[#171717] group-hover:text-white">
                  ↗
                </span>
              </div>

              {/* INFO */}
              <div className="px-6 pt-4 pb-5 border-t border-[#171717]/8">
                <span className="text-xs tracking-[0.2em] uppercase text-neutral-500">
                  {client.industry}
                </span>

                <p className="text-sm text-neutral-500 leading-relaxed mt-2">
                  {client.bio}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
