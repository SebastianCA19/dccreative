import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <Header />

      {/* HERO */}
      <Hero />

      {/* SECCIÓN TEST 1 */}
      <section className="h-screen bg-white flex items-center justify-center">
        <h2 className="text-5xl font-serif text-black">Sección 1</h2>
      </section>

      {/* SECCIÓN TEST 2 */}
      <section className="h-screen bg-neutral-100 flex items-center justify-center">
        <h2 className="text-5xl font-serif text-black">Sección 2</h2>
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
