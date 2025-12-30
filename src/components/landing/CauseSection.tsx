import { motion } from "framer-motion";
import { Eye, EyeOff, Target } from "lucide-react";

const CauseSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-surface">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-base md:text-lg font-semibold mb-4">
              A causa real
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              O problema não é a obra ser cara
            </h2>
          </motion.div>

          {/* Main insight card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-accent rounded-3xl blur-xl opacity-20" />
            <div className="relative bg-card rounded-3xl p-8 md:p-12 border border-border shadow-strong">
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-secondary/20 flex items-center justify-center">
                    <EyeOff className="w-10 h-10 text-secondary" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive flex items-center justify-center"
                  >
                    <span className="text-destructive-foreground text-xs font-bold">!</span>
                  </motion.div>
                </div>
              </div>

              <blockquote className="text-center">
                <p className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  É descobrir <span className="text-gradient-hero">tarde demais</span> que o dinheiro não vai dar.
                </p>
                <footer className="text-muted-foreground text-lg">
                  Quando você percebe o problema, já está pagando caro por ele.
                </footer>
              </blockquote>
            </div>
          </motion.div>

          {/* Supporting points */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <EyeOff className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  Falta de visibilidade
                </h3>
                <p className="text-muted-foreground text-sm">
                  Você não tem como saber, com antecedência, se vai faltar dinheiro no meio da obra.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  Descoberta tardia
                </h3>
                <p className="text-muted-foreground text-sm">
                  Quando você finalmente vê o rombo, já não há tempo para evitar os juros e o desespero.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CauseSection;
