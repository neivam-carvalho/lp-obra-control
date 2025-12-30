import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const workValues = [
  "Menos de R$100.000",
  "R$100.000 a R$200.000",
  "R$200.000 a R$500.000",
  "R$500.000 a R$1.000.000",
  "Mais de R$1.000.000"
];

const priceOptions = [
  { value: 29, label: "R$29/mês", popular: false },
  { value: 59, label: "R$59/mês", popular: true },
  { value: 99, label: "R$99/mês", popular: false },
  { value: 149, label: "R$149/mês", popular: false }
];

const ValidationSection = () => {
  const [step, setStep] = useState(1);
  const [selectedWorkValue, setSelectedWorkValue] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    // In a real scenario, this would send data to analytics/backend
    console.log("Validation data:", { selectedWorkValue, selectedPrice });
    setSubmitted(true);
    toast({
      title: "Obrigado pelo interesse!",
      description: "Entraremos em contato quando o produto estiver disponível.",
    });
  };

  if (submitted) {
    return (
      <section id="validation" className="py-20 lg:py-28 bg-gradient-hero text-primary-foreground">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-secondary/20 flex items-center justify-center">
              <Check className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Obrigado pela sua resposta!
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Seu interesse nos ajuda a construir algo que realmente resolve o seu problema.
              Entraremos em contato assim que o produto estiver disponível.
            </p>
            <div className="p-4 rounded-xl bg-primary-foreground/10 inline-block">
              <p className="text-sm opacity-75">
                Valor da obra: <span className="font-semibold">{selectedWorkValue}</span>
              </p>
              <p className="text-sm opacity-75 mt-1">
                Disposição: <span className="font-semibold">R${selectedPrice}/mês</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="validation" className="py-20 lg:py-28 bg-gradient-hero text-primary-foreground">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Validação
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ajude-nos a construir isso
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Responda duas perguntas rápidas para entendermos melhor sua situação.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className={`w-3 h-3 rounded-full transition-colors ${step >= 1 ? 'bg-secondary' : 'bg-primary-foreground/30'}`} />
            <div className={`w-8 h-0.5 transition-colors ${step >= 2 ? 'bg-secondary' : 'bg-primary-foreground/30'}`} />
            <div className={`w-3 h-3 rounded-full transition-colors ${step >= 2 ? 'bg-secondary' : 'bg-primary-foreground/30'}`} />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8"
              >
                <h3 className="font-display text-xl font-bold mb-6 text-center">
                  Qual o valor estimado da sua obra?
                </h3>
                <div className="grid gap-3">
                  {workValues.map((value) => (
                    <button
                      key={value}
                      onClick={() => {
                        setSelectedWorkValue(value);
                        setTimeout(() => setStep(2), 200);
                      }}
                      className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                        selectedWorkValue === value
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-primary-foreground/10 hover:bg-primary-foreground/20'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8"
              >
                <h3 className="font-display text-xl font-bold mb-2 text-center">
                  Quanto você pagaria para evitar prejuízo financeiro na obra?
                </h3>
                <p className="text-sm opacity-75 text-center mb-6">
                  Considerando um sistema que antecipa problemas de orçamento.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {priceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedPrice(option.value)}
                      className={`relative p-5 rounded-xl font-medium transition-all ${
                        selectedPrice === option.value
                          ? 'bg-secondary text-secondary-foreground ring-2 ring-secondary ring-offset-2 ring-offset-primary'
                          : 'bg-primary-foreground/10 hover:bg-primary-foreground/20'
                      }`}
                    >
                      {option.popular && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-secondary text-secondary-foreground text-xs font-bold rounded-full">
                          Popular
                        </span>
                      )}
                      <span className="text-lg">{option.label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className="text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Voltar
                  </Button>
                  <Button
                    variant="hero"
                    size="lg"
                    className="flex-1"
                    disabled={!selectedPrice}
                    onClick={handleSubmit}
                  >
                    Confirmar interesse
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ValidationSection;
