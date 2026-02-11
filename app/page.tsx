import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Title from "./components/Title";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <Header />

      {/* HERO */}
      <Hero />

      {/* ESENCIA */}
      <section className="bg-white overflow-hidden">
        <Title title="ESENCIA" />

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
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
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
                En <span className="font-bold">DC CREATIVE</span> acompañamos marcas, negocios y empresas en la
                construcción de una presencia digital coherente, estratégica y
                alineada a sus objetivos.
              </p>

              <p
                className="
          text-lg
          text-neutral-600
          leading-relaxed
          max-w-130
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
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* TEXTO */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <h2
                className="
          text-sm tracking-[0.2em] uppercase
          text-neutral-500 mb-6
        "
              >
                PILARES
              </h2>
              <p
                className="
          text-lg
          text-neutral-800
          leading-relaxed
          max-w-130
        "
              >
                Nuestra labor se fundamenta en un proceso integral que comienza con un diagnóstico preciso y una dirección estratégica de marca, sentando las bases necesarias para una identidad sólida. A partir de allí, definimos con maestría el lenguaje visual y comunicacional a través de nuestra dirección creativa, asegurando que cada mensaje resuene con claridad.

Esta visión se materializa en una ejecución impecable de contenido, siempre guiada por la intención y la coherencia en cada plataforma. Finalmente, cerramos el ciclo mediante una lectura analítica de resultados que nos permite la optimización constante de cada esfuerzo, garantizando un crecimiento sostenido y estratégico.
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

      {/* SECCIÓN TEST 2 */}
      <section className="h-screen bg-white overflow-hidden">
        <Title title="SERVICIOS" />
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
