"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = ["¿Quiénes Somos?", "Servicios", "Portafolio", "Caso de Éxito"];
  const goto = ["#esencia", "#servicios", "#portafolio", "#caso"];

  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();

    const element = document.getElementById(targetId);
    if(element){
      if(menuOpen) setMenuOpen(false);
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({top, behavior: "smooth"});
    }
  }
  return (
    <>
      {/* HEADER */}
      {/* Tres columnas: el logo queda centrado por columnas simétricas,
          así el nav nunca puede encimarse con él. */}
      <header className="absolute top-0 left-0 z-50 w-full h-20 px-6 grid grid-cols-[auto_1fr_auto] xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
          {/* NAV DESKTOP */}
          <motion.nav
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className={`hidden xl:flex col-start-1 items-center justify-self-start gap-6 font-sans text-sm tracking-wide ${
              menuOpen ? "pointer-events-none" : ""
            }`}
          >
            {links.map((item) => (
              <motion.a
                key={item}
                whileHover={{ y: -2 }}
                className="relative group cursor-pointer text-white text-lg font-medium"
                href={goto[links.indexOf(item)]}
                onClick={(e) => handleScroll(e, goto[links.indexOf(item)].substring(1))}
              >
                {item}

                {/* BORDE ANIMADO */}
                <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-white origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </motion.a>
            ))}
          </motion.nav>

          {/* LOGO */}
          <motion.div
            className="col-start-1 xl:col-start-2 xl:justify-self-center"
            animate={{ opacity: menuOpen ? 0 : 1 }}
          >
            <Image
              src={"/white.avif"}
              alt="logo"
              width={90}
              height={40}
            />
          </motion.div>

          {/* HAMBURGUESA / X */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`col-start-3 justify-self-end w-8 h-8 items-center justify-center z-60 ${
              menuOpen ? "flex" : "flex xl:hidden"
            }`}
          >
            <div className="relative w-6 h-6">
              <motion.span
                animate={{
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? 0 : -6,
                  backgroundColor: menuOpen ? "#000" : "#fff",
                }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-1/2 w-6 h-0.5"
                style={{ transformOrigin: "center" }}
              />

              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1, backgroundColor: menuOpen ? "#000" : "#fff" }}
                transition={{ duration: 0.2 }}
                className={`absolute left-0 top-1/2 w-6 h-0.5`}
              />

              <motion.span
                animate={{
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? 0 : 6,
                  backgroundColor: menuOpen ? "#000" : "#fff",
                }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-1/2 w-6 h-0.5"
                style={{ transformOrigin: "center" }}
              />
            </div>
          </button>
      </header>

      {/* MENU FULLSCREEN */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-white flex items-center justify-center overflow-none"
          >
            <motion.nav
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="flex flex-col items-center space-y-10 text-2xl font-medium font-serif tracking-widest"
            >
              {links.map((item) => (
                <motion.a
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={(e) => handleScroll(e, goto[links.indexOf(item)].substring(1))}
                  className="relative group cursor-pointer text-black"
                  href={goto[links.indexOf(item)]}
                >
                  {item}
                  <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
