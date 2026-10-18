import { AnimatePresence, motion } from "framer-motion";
import SocialMedia from "./services-content/SocialMedia";
import Branding from "./services-content/Branding";
import Photo from "./services-content/Photo";
import Landing from "./services-content/Landing";

export default function ServiceContent({ 
  active, 
  whatsappLink 
}: { 
  active: number; 
  whatsappLink: string 
}){
  return (
    <div className="relative mt-10 h-auto p-8 md:px-20 md:py-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
        >
          {active === 0 && <SocialMedia whatsappLink={whatsappLink} />}
          {active === 1 && <Branding whatsappLink={whatsappLink} />}
          {active === 2 && <Photo whatsappLink={whatsappLink} />}
          {active === 3 && <Landing whatsappLink={whatsappLink} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
