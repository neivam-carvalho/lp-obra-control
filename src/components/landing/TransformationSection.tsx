import { motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";

const beforeItems = [
  "Falta de clareza financeira",
  "Surpresas constantes",
  "Ansiedade e insegurança"
];

const afterItems = [
  "Visibilidade antecipada",
  "Decisões mais racionais",
  "Menos juros e prejuízo"
];

const TransformationSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-success/10 text-success text-base md:text-lg font-semibold mb-4">
            Transformação
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Da incerteza para o controle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Imagine saber com semanas de antecedência quando vai faltar dinheiro.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="h-full p-8 rounded-2xl bg-background border-2 border-destructive/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <X className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Antes
                  </h3>
                </div>
                <ul className="space-y-4">
                  {beforeItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                        <X className="w-3.5 h-3.5 text-destructive" />
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Arrow (desktop) */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow"
              >
                <ArrowRight className="w-6 h-6 text-primary" />
              </motion.div>
            </div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="h-full p-8 rounded-2xl bg-background border-2 border-success/30 shadow-medium">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-success" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Depois
                  </h3>
                </div>
                <ul className="space-y-4">
                  {afterItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-success" />
                      </div>
                      <span className="text-foreground font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Mobile arrow */}
          <div className="flex md:hidden justify-center -my-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow rotate-90"
            >
              <ArrowRight className="w-5 h-5 text-primary" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
