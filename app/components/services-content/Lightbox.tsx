"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { GalleryItem } from "./gallery";

type LightboxProps = {
  items: GalleryItem[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

const roundArrow =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer";

const arrowClass = `${roundArrow} absolute top-1/2 z-10 -translate-y-1/2 md:h-12 md:w-12`;

export default function Lightbox({
  items,
  index,
  onChange,
  onClose,
}: LightboxProps) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  // Cierre en dos fases para que la foto no se mezcle con la del carrusel.
  const [closing, setClosing] = useState(false);
  const [fading, setFading] = useState(false);
  const closingRef = useRef(false);
  const closeTimer = useRef<number | null>(null);

  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);

    if (reduce) {
      onClose();
      return;
    }

    // 1) la foto se apaga (200 ms) 2) el negro se desvanece (140 ms) 3) fuera.
    closeTimer.current = window.setTimeout(() => {
      setFading(true);
      closeTimer.current = window.setTimeout(onClose, 150);
    }, 210);
  }, [onClose, reduce]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const item = items[index];
  const total = items.length;

  const step = useCallback(
    (offset: number) => {
      onChange((index + offset + total) % total);
    },
    [index, onChange, total]
  );

  // Bloquea el scroll del fondo y devuelve el foco a la pieza al cerrar.
  useEffect(() => {
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    // `preventScroll` evita el salto por el scroll suave del documento.
    closeButton.current?.focus({ preventScroll: true });
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);

  // Teclado: Esc cierra, flechas navegan y Tab no se escapa del diálogo.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialog.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], video[controls], [tabindex]:not([tabindex="-1"])'
      );

      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [requestClose, step]);

  const stop = (event: React.MouseEvent) => event.stopPropagation();

  return createPortal(
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`Vista ampliada, pieza ${index + 1} de ${total}`}
      onClick={requestClose}
      className={`fixed inset-0 z-[100] flex flex-col bg-black transition-opacity duration-150 ease-out motion-reduce:transition-none ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* BARRA SUPERIOR */}
      <div
        onClick={stop}
        className="flex items-center justify-between px-5 py-4 md:px-8"
      >
        <span className="hidden text-xs tabular-nums tracking-[0.25em] text-white/45 md:block">
          {pad(index + 1)}
          <span className="mx-2 text-white/20">/</span>
          {pad(total)}
        </span>

        <button
          ref={closeButton}
          type="button"
          onClick={requestClose}
          aria-label="Cerrar vista ampliada"
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors duration-300 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
            <path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z" />
          </svg>
        </button>
      </div>

      {/* PIEZA */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-20">
        <div
          key={`${item.src}-${index}`}
          onClick={stop}
          className={`flex max-h-full max-w-full items-center justify-center transition-opacity duration-200 ease-out motion-reduce:transition-none ${
            closing
              ? "opacity-0"
              : "animate-lightbox-in opacity-100 motion-reduce:animate-none"
          }`}
        >
          {item.type === "video" ? (
            <video
              key={item.src}
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              playsInline
              className="h-auto max-h-[calc(100dvh-9rem)] w-auto max-w-[92vw] rounded-xl bg-black md:max-h-[calc(100dvh-11rem)]"
            />
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              className="h-auto max-h-[calc(100dvh-9rem)] w-auto max-w-[92vw] rounded-xl object-contain md:max-h-[calc(100dvh-11rem)]"
            />
          )}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
              aria-label="Pieza anterior"
              className={`${arrowClass} left-3 max-md:hidden md:left-6`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
              aria-label="Pieza siguiente"
              className={`${arrowClass} right-3 max-md:hidden md:right-6`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4 4.6 4.6z" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* CONTROLES EN MÓVIL */}
      {total > 1 && (
        <div
          onClick={stop}
          className="flex items-center justify-center gap-6 pb-6 md:hidden"
        >
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Pieza anterior"
            className={roundArrow}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12z" />
            </svg>
          </button>

          <span className="text-[11px] tabular-nums tracking-[0.25em] text-white/45">
            {pad(index + 1)}
            <span className="mx-2 text-white/20">/</span>
            {pad(total)}
          </span>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Pieza siguiente"
            className={roundArrow}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4 4.6 4.6z" />
            </svg>
          </button>
        </div>
      )}

      <p className="hidden pb-5 text-center text-[11px] tracking-[0.2em] uppercase text-white/25 md:block">
        Flechas para navegar · Esc para cerrar
      </p>
    </div>,
    document.body
  );
}
