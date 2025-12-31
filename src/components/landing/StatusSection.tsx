import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FlaskConical, MessageCircle } from "lucide-react";

const StatusSection = () => {
  const scrollToValidation = () => {
    document.getElementById("validation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 border border-secondary/30 mb-8">
            <FlaskConical className="w-5 h-5 text-secondary" />
            <span className="font-medium text-foreground">Ganhe 1 mês de acesso grátis para testar</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Estamos construindo algo para você
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Este projeto ainda está em fase de validação. Seu feedback é essencial para 
            entendermos se essa solução realmente resolve o problema de quem está construindo 
            ou reformando sua casa ou apartamento.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={scrollToValidation}
              className="group w-full sm:w-auto whitespace-normal text-center leading-tight px-6 py-4 h-auto"
            >
              <span className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <span>Quero participar do</span>
                <span className="flex items-center gap-2">
                  teste grátis de 1 mês
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Button>
          </div>

          {/* Trust note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 p-6 rounded-2xl bg-muted/50 border border-border"
          >
            <div className="flex items-start gap-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground mb-1">
                  Sua opinião importa
                </h4>
                <p className="text-sm text-muted-foreground">
                  Você irá receber um e-mail com os acessos ao preencher o formulário acima.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Cada resposta nos ajuda a entender melhor a dor de quem constrói. 
                  Não é um compromisso de compra — é uma conversa honesta sobre o que você precisa.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatusSection;
