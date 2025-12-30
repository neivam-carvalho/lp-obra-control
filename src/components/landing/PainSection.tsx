import { motion } from "framer-motion";
import { AlertCircle, TrendingUp, Clock, HeartCrack } from "lucide-react";

const painPoints = [
  {
    icon: TrendingUp,
    title: "O dinheiro acaba antes da obra terminar",
    description: "Você planejou tudo, mas os custos reais sempre superam as estimativas."
  },
  {
    icon: AlertCircle,
    title: "Surgem gastos grandes fora do planejamento",
    description: "Imprevistos que ninguém avisou aparecem no pior momento possível."
  },
  {
    icon: Clock,
    title: "Multas, juros e parcelamentos começam a aparecer",
    description: "Quando percebe, já está pagando juros no cartão ou cheque especial."
  },
  {
    icon: HeartCrack,
    title: "Decisões passam a ser tomadas no desespero",
    description: "Cortes de qualidade, atrasos, e compromissos que você não queria fazer."
  }
];

const PainSection = () => {
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
            Você se identifica?
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            A realidade de quem constrói a própria casa
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Se você está passando por isso, saiba que não está sozinho.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-background border border-border hover:border-destructive/30 transition-all duration-300 hover:shadow-medium"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                  <point.icon className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainSection;
