import { motion } from "framer-motion";
import { Check, X, User, Building2, Briefcase } from "lucide-react";

const forYou = [
  {
    icon: User,
    text: "Proprietários construindo casa própria"
  },
  {
    icon: User,
    text: "Pessoas sem experiência em gestão de obra"
  },
  {
    icon: User,
    text: "Quem quer evitar prejuízo financeiro"
  }
];

const notForYou = [
  {
    icon: Building2,
    text: "Construtoras"
  },
  {
    icon: Briefcase,
    text: "Empresas"
  },
  {
    icon: Building2,
    text: "Gestão profissional de múltiplas obras"
  }
];

const AudienceSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-surface">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-base md:text-lg font-semibold mb-4">
            Para quem é
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Isso é para você?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Criamos isso pensando em um perfil específico de pessoa.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* For you */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-card border-2 border-success/30 shadow-medium"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Check className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  É para você se...
                </h3>
              </div>
              <ul className="space-y-4">
                {forYou.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-success/5"
                  >
                    <item.icon className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Not for you */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <X className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Não é para você se...
                </h3>
              </div>
              <ul className="space-y-4">
                {notForYou.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <item.icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
