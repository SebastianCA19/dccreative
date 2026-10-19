/** Piezas de la galería de fotografía y video. */
export type GalleryItem = {
  type: "image" | "video";
  src: string;
  /** Solo vídeos: fotograma que se ve antes de reproducir. */
  poster?: string;
  /** Descripción para lectores de pantalla. */
  alt: string;
  /** Proporción ancho/alto de respaldo. */
  ratio?: number;
};

export const GALLERY: GalleryItem[] = [
  {
    type: "image",
    src: "/galeria/galeria-01.avif",
    alt: "Sesión de joyería: dos modelos frente a la pantalla de una cámara Nikon",
    ratio: 1080 / 1316,
  },
  {
    type: "image",
    src: "/galeria/galeria-02.avif",
    alt: "Mesero con dos platos en un restaurante",
    ratio: 1080 / 1350,
  },
  {
    type: "image",
    src: "/galeria/galeria-03.avif",
    alt: "Entradas de plátano con toppings servidas en tabla de madera",
    ratio: 1080 / 1350,
  },
  {
    type: "image",
    src: "/galeria/galeria-04.avif",
    alt: "Pendiente artesanal en oro sobre fondo negro",
    ratio: 1080 / 1441,
  },
  {
    type: "image",
    src: "/galeria/galeria-05.avif",
    alt: "Mujer sonriendo con una tablet en una oficina, en blanco y negro",
    ratio: 1080 / 1936,
  },
  {
    type: "image",
    src: "/galeria/galeria-06.avif",
    alt: "Retrato corporativo de una mujer con blazer oscuro y brazos cruzados",
    ratio: 1080 / 1440,
  },
  {
    type: "image",
    src: "/galeria/galeria-07.avif",
    alt: "Rodaje en un consultorio dental, en blanco y negro",
    ratio: 1080 / 1440,
  },
  {
    type: "image",
    src: "/galeria/galeria-08.avif",
    alt: "Mujer con una tablet bajo el brazo sobre fondo blanco",
    ratio: 1080 / 1620,
  },
  {
    type: "image",
    src: "/galeria/galeria-09.avif",
    alt: "Cámara Lumix, estabilizador y accesorios sobre una mesa",
    ratio: 1080 / 1920,
  },
  {
    type: "image",
    src: "/galeria/galeria-10.avif",
    alt: "Rodaje en la terraza de una hamburguesería, en blanco y negro",
    ratio: 1080 / 1920,
  },
  {
    type: "image",
    src: "/galeria/galeria-11.avif",
    alt: "Portátil con una campaña de email abierta junto a un sándwich",
    ratio: 1080 / 1920,
  },
  {
    type: "image",
    src: "/galeria/galeria-12.avif",
    alt: "Monitor de cámara durante una sesión de fotos, en blanco y negro",
    ratio: 1080 / 1920,
  },
  {
    type: "video",
    src: "/galeria/galeria-13.mp4",
    poster: "/galeria/galeria-13-poster.avif",
    alt: "Modelo con collar y pendientes dorados durante una sesión de joyería",
    ratio: 1920 / 1080,
  },
];
