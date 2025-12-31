import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostra o header quando rolar mais de 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToValidation = () => {
    document.getElementById("validation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft"
        >
          <div className="container py-3 flex items-center justify-between">
            <span className="font-display font-bold text-lg text-foreground">
              Obra Control
            </span>
            <Button 
              variant="hero" 
              size="sm" 
              onClick={scrollToValidation}
              className="text-sm px-4 py-2"
            >
              Quero 1 mês grátis
            </Button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
