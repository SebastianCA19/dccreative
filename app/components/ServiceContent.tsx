import { AnimatePresence, motion } from "framer-motion";
import Redes from "./services-content/Redes";
import Branding from "./services-content/Branding";
import Foto from "./services-content/Foto";
import Landing from "./services-content/Landing";

export default function ServiceContent({ active }: { active: number }) {
  return (
    <div className="relative mt-10 h-auto p-10 md:p-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
        >
          {active === 0 && <Redes />}
          {active === 1 && <Branding />}
          {active === 2 && <Foto />}
          {active === 3 && <Landing />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
