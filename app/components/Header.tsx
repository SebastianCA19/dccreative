"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = ["¿Quiénes Somos?", "Servicios", "Portafolio"];

  return (
    <>
      {/* HEADER */}
      <header className="absolute top-0 left-0 z-50 w-full h-20 flex items-center justify-center">
          {/* LOGO */}
          <motion.div
            className="absolute left-6 md:left-auto md:static"
            animate={{ opacity: menuOpen ? 0 : 1 }}
          >
            <Image
              src={"/white.png"}
              alt="logo"
              width={90}
              height={40}
            />
          </motion.div>

            {/* NAV DESKTOP */}
          <nav className="hidden md:flex absolute left-10 space-x-10 font-sans text-sm tracking-wide">
            {links.map((item) => (
              <motion.a
                key={item}
                whileHover={{ y: -2 }}
                className="relative group cursor-pointer text-white"
              >
                {item}

                {/* BORDE ANIMADO */}
                <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-white origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </motion.a>
            ))}
          </nav>

          {/* HAMBURGUESA / X */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute right-6 md:hidden w-8 h-8 flex items-center justify-center z-60"
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
            className="fixed inset-0 z-40 bg-white flex items-center justify-center"
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
              {["¿QUIÉNES SOMOS?", "SERVICIOS", "PORTAFOLIO"].map((item) => (
                <motion.a
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setMenuOpen(false)}
                  className="relative group cursor-pointer text-black"
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
