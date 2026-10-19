"use client";

import { useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Lightbox from "./Lightbox";
import type { GalleryItem } from "./gallery";

/** Repite la lista tres veces para que el bucle no tenga extremos. */
const COPIES = 3;
const SETTLE_MS = 220;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Slide = {
  item: GalleryItem;
  real: number;
  copy: number;
};

const arrowButton =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 text-white/80 transition-colors duration-300 hover:border-white hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer";

function GalleryCard({
  slide,
  total,
  active,
  suspended,
  ratio,
  clone,
  onRatio,
  onOpen,
  registerRef,
}: {
  slide: Slide;
  total: number;
  active: boolean;
  suspended: boolean;
  ratio: number;
  clone: boolean;
  onRatio: (ratio: number) => void;
  onOpen: () => void;
  registerRef: (node: HTMLButtonElement | null) => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const { item, real } = slide;

  const readRatio = (width: number, height: number) => {
    if (width > 0 && height > 0) onRatio(width / height);
  };

  // El vídeo solo se mueve en la pieza centrada; el resto queda en pausa.
  useEffect(() => {
    const element = video.current;
    if (!element) return;

    if (active && !suspended && !reduce) {
      void element.play().catch(() => {});
    } else {
      element.pause();
    }
  }, [active, suspended, reduce]);

  return (
    <button
      ref={registerRef}
      type="button"
      onClick={onOpen}
      aria-hidden={clone || undefined}
      tabIndex={clone ? -1 : 0}
      aria-label={`Ampliar ${item.type === "video" ? "vídeo" : "foto"} ${real + 1} de ${total}`}
      style={{ aspectRatio: ratio }}
      className={`group relative h-full shrink-0 snap-center overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-2xl transition-opacity duration-500 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white max-w-[86vw] md:max-w-none cursor-pointer ${
        active ? "opacity-100" : "opacity-60 hover:opacity-80"
      }`}
    >
      {item.type === "video" ? (
        <video
          ref={(node) => {
            video.current = node;
            if (node) readRatio(node.videoWidth, node.videoHeight);
          }}
          src={item.src}
          poster={item.poster}
          onLoadedMetadata={(event) =>
            readRatio(
              event.currentTarget.videoWidth,
              event.currentTarget.videoHeight
            )
          }
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          ref={(node) => {
            if (node?.complete) readRatio(node.naturalWidth, node.naturalHeight);
          }}
          onLoad={(event) =>
            readRatio(
              event.currentTarget.naturalWidth,
              event.currentTarget.naturalHeight
            )
          }
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Scrim tenue para que el play respire sobre fondos claros. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"
      />

      {item.type === "video" && (
        <span className="pointer-events-none absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black/70 text-white backdrop-blur-sm md:h-14 md:w-14">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-5 w-5 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      )}
    </button>
  );
}

export default function GalleryCarousel({ items }: { items: GalleryItem[] }) {
  const count = items.length;

  const slides = useMemo<Slide[]>(
    () =>
      Array.from({ length: COPIES }, (_, copy) =>
        items.map((item, real) => ({ item, real, copy }))
      ).flat(),
    [items]
  );

  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<Array<HTMLButtonElement | null>>([]);
  const interacted = useRef(false);
  /** Destino pendiente al navegar con flechas. */
  const pending = useRef<number | null>(null);

  const [loopActive, setLoopActive] = useState(count);
  const [ratios, setRatios] = useState<Record<number, number>>({});
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();

  const activeReal = count ? ((loopActive % count) + count) % count : 0;

  const center = useCallback((card: HTMLElement, behavior: ScrollBehavior) => {
    const element = track.current;
    if (!element) return;

    element.scrollTo({
      left: card.offsetLeft + card.offsetWidth / 2 - element.clientWidth / 2,
      behavior,
    });
  }, []);

  // Arranca en la copia central para que se vean vecinas a ambos lados.
  useIsomorphicLayoutEffect(() => {
    const card = cards.current[count];
    if (!card) return;

    center(card, "auto");
    setReady(true);
  }, [center, count]);

  // Recentra al conocerse las proporciones, si aún no hay interacción.
  useEffect(() => {
    if (interacted.current) return;
    const card = cards.current[count];
    if (card) center(card, "auto");
  }, [center, count, ratios]);

  // Pieza centrada = la más cercana al centro del carril.
  useEffect(() => {
    const element = track.current;
    if (!element) return;

    let frame = 0;
    let settle = 0;

    const closest = () => {
      const middle = element.scrollLeft + element.clientWidth / 2;
      let best = count;
      let distance = Number.POSITIVE_INFINITY;

      cards.current.forEach((card, index) => {
        if (!card) return;
        const centerX = card.offsetLeft + card.offsetWidth / 2;
        const delta = Math.abs(centerX - middle);
        if (delta < distance) {
          distance = delta;
          best = index;
        }
      });

      return best;
    };

    // Salto de una copia completa, sin animación: visualmente no se mueve nada.
    const normalize = () => {
      const first = cards.current[0];
      const middleStart = cards.current[count];
      if (!first || !middleStart) return;

      const period = middleStart.offsetLeft - first.offsetLeft;
      if (!period) return;

      const current = closest();
      if (current < count) {
        element.scrollTo({ left: element.scrollLeft + period, behavior: "auto" });
        setLoopActive(current + count);
      } else if (current >= count * 2) {
        element.scrollTo({ left: element.scrollLeft - period, behavior: "auto" });
        setLoopActive(current - count);
      }
    };

    const update = () => {
      frame = 0;
      // Mientras hay un destino pendiente manda el clic, no la posición del scroll.
      if (pending.current === null) setLoopActive(closest());
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        pending.current = null;
        normalize();
      }, SETTLE_MS);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    element.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      element.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
  }, [count]);

  // Arrastrar con el ratón (en táctil el scroll ya es nativo).
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;

    const onDown = (event: PointerEvent) => {
      interacted.current = true;
      pending.current = null;
      if (event.pointerType === "touch") return;

      drag.current = {
        down: true,
        startX: event.clientX,
        startLeft: element.scrollLeft,
        moved: false,
      };
    };

    const onMove = (event: PointerEvent) => {
      if (!drag.current.down) return;

      const delta = event.clientX - drag.current.startX;
      if (Math.abs(delta) > 4) drag.current.moved = true;
      element.scrollLeft = drag.current.startLeft - delta;
    };

    const onUp = () => {
      drag.current.down = false;
    };

    element.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      element.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const goToLoop = useCallback(
    (target: number) => {
      const card = cards.current[target];
      if (!card) return;

      pending.current = target;
      center(card, reduce ? "auto" : "smooth");
      setLoopActive(target);
    },
    [center, reduce]
  );

  // El lightbox navega por índices reales; aquí se mueve la copia más cercana.
  const goToReal = useCallback(
    (real: number) => {
      const delta = (real - activeReal + count) % count;
      const step = delta <= count / 2 ? delta : delta - count;
      goToLoop(loopActive + step);
    },
    [activeReal, count, goToLoop, loopActive]
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToLoop(loopActive - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToLoop(loopActive + 1);
    }
  };

  if (count === 0) return null;

  return (
    <div>
      {/* CABECERA: título a la izquierda, flechas a la derecha */}
      <div className="mb-7 flex items-end justify-between gap-6 md:mb-9">
        <h3 className="text-2xl font-bold leading-none text-white font-serif md:text-4xl">
          Nuestro trabajo
        </h3>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => goToLoop(loopActive - 1)}
            aria-label="Pieza anterior"
            className={arrowButton}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => goToLoop(loopActive + 1)}
            aria-label="Pieza siguiente"
            className={arrowButton}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4 4.6 4.6z" />
            </svg>
          </button>
        </div>
      </div>

      {/* CARRIL A SANGRE */}
      <div
        ref={track}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Galería de fotografía y video"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onWheel={() => {
          interacted.current = true;
        }}
        className={`relative left-1/2 flex h-[clamp(340px,54vh,560px)] w-screen -translate-x-1/2 select-none snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain py-2 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white/30 md:h-[clamp(420px,66vh,760px)] md:gap-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        {slides.map((slide, index) => (
          <GalleryCard
            key={`${slide.item.src}-${slide.copy}`}
            slide={slide}
            total={count}
            active={index === loopActive}
            suspended={open}
            ratio={ratios[slide.real] ?? slide.item.ratio ?? 0.8}
            clone={slide.copy !== 1}
            onRatio={(ratio) =>
              setRatios((previous) =>
                previous[slide.real] === ratio
                  ? previous
                  : { ...previous, [slide.real]: ratio }
              )
            }
            onOpen={() => {
              // Un arrastre no debe abrir el lightbox.
              if (drag.current.moved) {
                drag.current.moved = false;
                return;
              }
              // No movemos el carril al abrir: el lightbox ya muestra la pieza.
              setLoopActive(index);
              setOpen(true);
            }}
            registerRef={(node) => {
              cards.current[index] = node;
            }}
          />
        ))}
      </div>

      {open && (
        <Lightbox
          items={items}
          index={activeReal}
          onChange={goToReal}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
