"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import Title from "./Title";

// Datos reales del caso. Las cifras van con "+" para que no envejezcan.
type Result = {
  /** null = sin dato; se muestra "—" */
  value: number | null;
  suffix: string;
  label: string;
};

type CaseData = {
  client: string;
  industry: string;
  monogram: string;
  /** Video vertical (9:16). null = se muestra el monograma. */
  video: string | null;
  /** Portada del video. */
  poster: string | null;
  challenge: string;
  approach: string;
  results: Result[];
  /** Fecha a la que corresponden los datos. */
  date: string;
  quote: string;
  author: string;
  reels: string[];
};

const CASE_DATA: CaseData = {
  client: "Libardo Pérez",
  industry: "Derecho Administrativo",
  monogram: "LP",
  video: "/testimonio-libardo.mp4",
  poster: "/testimonio-libardo-poster.jpg",
  challenge:
    "Libardo ya tenía la trayectoria, los casos y el nombre. Lo que no tenía era dónde contarlo: ni perfil, ni contenido, ni marca. Su reputación vivía en las salas y en el voz a voz, pero no en una pantalla.",
  approach:
    "Empezamos por el nombre. Definimos el posicionamiento de «Libardo Pérez abogado», su lenguaje visual y una línea editorial propia. Después vino lo que de verdad construye una marca personal: la constancia. Contenido pensado, producido y publicado mes a mes, siempre con una dirección clara y una lectura atenta de los resultados.",
  results: [
    { value: 12000, suffix: "+", label: "Seguidores" },
    { value: 60, suffix: "+", label: "Publicaciones" },
  ],
  date: "octubre de 2026",
  quote:
    "Los números de las redes han crecido de una forma que ni yo pensé que iba a ser así",
  author: "Libardo Pérez · Derecho Administrativo",
  // Ej: "https://www.instagram.com/reel/XXXXXXXXXXX/"
  reels: [],
};

/** Contador animado. */
function Counter({ value, suffix }: { value: number | null; suffix: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || value === null) return;

    let start = 0;
    const increment = value / (800 / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <p
      ref={ref}
      className="text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg mb-3"
    >
      {value === null ? "—" : `${count.toLocaleString("es-CO")}${suffix}`}
    </p>
  );
}

/** Embed oficial de Instagram. */
function ReelEmbed({ url }: { url: string }) {
  useEffect(() => {
    const instagram = (
      window as unknown as {
        instgrm?: { Embeds?: { process: () => void } };
      }
    ).instgrm;

    if (instagram?.Embeds) {
      instagram.Embeds.process();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]'
    );

    if (existing) {
      existing.addEventListener("load", () => {
        (window as unknown as { instgrm?: { Embeds?: { process: () => void } } })
          .instgrm?.Embeds?.process();
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      (window as unknown as { instgrm?: { Embeds?: { process: () => void } } })
        .instgrm?.Embeds?.process();
    };
    document.body.appendChild(script);
  }, [url]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        background: "#FFF",
        border: 0,
        borderRadius: 12,
        margin: 0,
        maxWidth: 540,
        minWidth: 326,
        padding: 0,
        width: "100%",
      }}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-6 text-center text-neutral-800"
      >
        Ver publicación en Instagram
      </a>
    </blockquote>
  );
}

/** Controladores propios: el reproductor nativo nunca se ve. */
function TestimonialVideo({ src, poster }: { src: string; poster: string | null }) {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [posterOk, setPosterOk] = useState(poster !== null);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // La duración se lee acá: el video ya cargó antes de que React monte sus handlers.
  useEffect(() => {
    const v = video.current;
    if (!v) return;

    const update = () => {
      if (Number.isFinite(v.duration)) setDuration(v.duration);
      setCurrent(v.currentTime);
    };

    update();
    const events = ["loadedmetadata", "durationchange", "timeupdate", "seeked"];
    events.forEach((e) => v.addEventListener(e, update));
    return () => events.forEach((e) => v.removeEventListener(e, update));
  }, []);

  const formatTime = (s: number) =>
    Number.isFinite(s) && s > 0
      ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`
      : "0:00";

  const togglePlay = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      setStarted(true);
      void v.play();
    } else {
      v.pause();
    }
  };

  const seek = (clientX: number) => {
    const v = video.current;
    const box = bar.current?.getBoundingClientRect();
    const total = v && Number.isFinite(v.duration) ? v.duration : duration;
    if (!v || !box || !total) return;

    const part = Math.min(Math.max((clientX - box.left) / box.width, 0), 1);
    v.currentTime = part * total;
    setCurrent(part * total);
  };

  const onSeekStart = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    seek(e.clientX);
  };

  const onSeekMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) seek(e.clientX);
  };

  const onSeekEnd = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const toggleMute = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void container.current?.requestFullscreen();
  };

  const iconClass =
    "w-9 h-9 flex items-center justify-center rounded-full text-white/70 hover:text-white transition-colors duration-300 cursor-pointer";

  return (
    <div ref={container} className="group relative w-full h-full bg-[#171717]">
      <video
        ref={video}
        src={src}
        poster={poster ?? undefined}
        playsInline
        preload="metadata"
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className={`w-full h-full cursor-pointer ${
          fullscreen ? "object-contain" : "object-cover"
        }`}
      />

      {/* POSTER */}
      <AnimatePresence>
        {!started && (
          <motion.button
            type="button"
            onClick={togglePlay}
            aria-label="Reproducir el testimonio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 cursor-pointer"
          >
            {posterOk && poster && (
              <img
                src={poster}
                alt=""
                onError={() => setPosterOk(false)}
                className="w-full h-full object-cover"
              />
            )}

            {/* Scrim */}
            <span className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-black/25 transition-all duration-500 group-hover:from-black/80 group-hover:via-black/25" />

            {/* Play */}
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <span className="relative flex items-center justify-center">
                {/* anillo fino exterior */}
                <span className="absolute w-26 h-26 md:w-30 md:h-30 rounded-full border border-white/20 transition-transform duration-500 group-hover:scale-110" />

                {/* círculo */}
                <span className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/40 bg-black/35 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.45)] flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:border-white">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-6 h-6 md:w-7 md:h-7 ml-0.5 fill-white transition-colors duration-500 group-hover:fill-[#171717]"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>

              <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/70 transition-colors duration-500 group-hover:text-white">
                Reproducir
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* CONTROLS */}
      {started && (
        <div
          className={`absolute inset-x-0 bottom-0 px-5 pb-5 pt-16 bg-linear-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-500 ${
            playing
              ? "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
              : "opacity-100"
          }`}
        >
          {/* Progress bar */}
          <div
            ref={bar}
            onPointerDown={onSeekStart}
            onPointerMove={onSeekMove}
            onPointerUp={onSeekEnd}
            onPointerCancel={onSeekEnd}
            className="group/bar relative h-4 flex items-center cursor-pointer touch-none mb-3"
          >
            <div className="h-1 w-full rounded-full bg-white/25 transition-all duration-200 group-hover/bar:h-1.5">
              <div
                className="relative h-full rounded-full bg-white"
                style={{ width: `${duration ? (current / duration) * 100 : 0}%` }}
              >
                <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-white">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pausar" : "Reproducir"}
              className={iconClass}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-current">
                {playing ? (
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
              </svg>
            </button>

            <span className="text-[11px] tabular-nums text-white/60">
              {formatTime(current)} / {formatTime(duration)}
            </span>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Activar sonido" : "Silenciar"}
              className={`${iconClass} ml-2`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                {muted ? (
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
                ) : (
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                )}
              </svg>
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={fullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
              className={`${iconClass} ml-auto`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                {fullscreen ? (
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                ) : (
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                )}
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CaseStudy() {
  return (
    <section
      id="caso"
      className="bg-linear-to-br from-black via-neutral-900 to-neutral-800 overflow-hidden"
    >
      <Title title="CASO DE ÉXITO" color="#ffffff" />

      <div className="max-w-350 mx-auto px-6 md:px-12 md:py-16 py-10">
        {/* INTRO */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          <h2 className="text-sm tracking-[0.2em] uppercase text-neutral-400 mb-6">
            Estado actual
          </h2>

          <p className="text-2xl md:text-3xl font-serif text-white leading-relaxed max-w-3xl">
            Así trabajamos una marca de principio a fin.
          </p>
        </div>

        {/* CASE — 2 COLUMNS */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* VISUAL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full mx-auto rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl flex items-center justify-center ${
              CASE_DATA.video ? "max-w-md aspect-9/16 bg-black" : "aspect-4/5 bg-white/5"
            }`}
          >
            {CASE_DATA.video ? (
              <TestimonialVideo src={CASE_DATA.video} poster={CASE_DATA.poster} />
            ) : (
              <span className="font-serif text-[8rem] leading-none text-white/90 select-none">
                {CASE_DATA.monogram}
              </span>
            )}
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-xs tracking-[0.2em] uppercase text-neutral-900 bg-white px-4 py-2 rounded-full font-semibold mb-6">
              {CASE_DATA.industry}
            </span>

            <h3 className="text-4xl md:text-5xl font-serif text-white font-bold leading-tight mb-10">
              {CASE_DATA.client}
            </h3>

            {/* THE CHALLENGE */}
            <div className="mb-8">
              <h4 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-3">
                El reto
              </h4>
              <p className="text-neutral-200 text-lg leading-relaxed">
                {CASE_DATA.challenge}
              </p>
            </div>

            {/* WHAT WE DID */}
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-3">
                Lo que hicimos
              </h4>
              <p className="text-neutral-200 text-lg leading-relaxed">
                {CASE_DATA.approach}
              </p>
            </div>
          </motion.div>
        </div>

        {/* RESULTS */}
        <div
          className={`grid gap-8 md:gap-12 mt-20 md:mt-28 ${
            CASE_DATA.results.length >= 3
              ? "md:grid-cols-3"
              : "md:grid-cols-2 max-w-3xl mx-auto w-full"
          }`}
        >
          {CASE_DATA.results.map((result, i) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center p-8 rounded-2xl bg-white/4 border border-white/10 hover:bg-white/6 hover:border-white/20 transition-all duration-300"
            >
              <Counter value={result.value} suffix={result.suffix} />

              <p className="text-sm tracking-[0.2em] uppercase text-neutral-400">
                {result.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* DATA DATE */}
        {CASE_DATA.date && (
          <p className="text-center text-xs tracking-[0.2em] uppercase text-neutral-500 mt-10">
            Datos del perfil a {CASE_DATA.date}
          </p>
        )}

        {/* QUOTE */}
        {CASE_DATA.quote && (
          <div className="text-center py-20 border-y border-white/20 mt-20 md:mt-28">
            <p className="text-3xl md:text-5xl font-serif leading-tight max-w-3xl mx-auto text-white font-bold">
              “{CASE_DATA.quote}”.
            </p>

            <p className="text-sm tracking-[0.2em] uppercase text-neutral-400 mt-8">
              {CASE_DATA.author}
            </p>
          </div>
        )}

        {/* REELS */}
        {CASE_DATA.reels.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8 mt-20">
            {CASE_DATA.reels.map((url) => (
              <ReelEmbed key={url} url={url} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
