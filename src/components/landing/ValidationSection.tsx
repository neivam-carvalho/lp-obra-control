import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ArrowRight, Sparkles, User, Phone, Mail, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Função para formatar telefone brasileiro
const formatPhoneBR = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

// Validação de telefone brasileiro (10 ou 11 dígitos)
const isValidPhoneBR = (phone: string): boolean => {
  const numbers = phone.replace(/\D/g, '');
  return numbers.length >= 10 && numbers.length <= 11;
};

// Validação de email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

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

interface ContactData {
  name: string;
  phone: string;
  email: string;
}

const ValidationSection = () => {
  const [step, setStep] = useState(1);
  const [selectedWorkValue, setSelectedWorkValue] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [contactData, setContactData] = useState<ContactData>({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const { toast } = useToast();

  const isContactValid = contactData.name.trim() && 
    contactData.phone.trim() && 
    contactData.email.trim() &&
    isValidPhoneBR(contactData.phone) &&
    isValidEmail(contactData.email);

  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneBR(e.target.value);
    setContactData({ ...contactData, phone: formatted });
    if (formatted && !isValidPhoneBR(formatted)) {
      setErrors({ ...errors, phone: "Telefone inválido" });
    } else {
      setErrors({ ...errors, phone: undefined });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setContactData({ ...contactData, email });
    if (email && !isValidEmail(email)) {
      setErrors({ ...errors, email: "E-mail inválido" });
    } else {
      setErrors({ ...errors, email: undefined });
    }
  };

  const handleSubmit = async () => {
    if (!contactData.name.trim() || !contactData.phone.trim() || !contactData.email.trim()) {
      toast({
        title: "Preencha todos os campos",
        description: "Por favor, informe seu nome, telefone e e-mail.",
        variant: "destructive"
      });
      return;
    }

    if (!isValidPhoneBR(contactData.phone)) {
      toast({
        title: "Telefone inválido",
        description: "Por favor, informe um telefone válido com DDD.",
        variant: "destructive"
      });
      return;
    }

    if (!isValidEmail(contactData.email)) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, informe um e-mail válido.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactData.name,
          phone: contactData.phone,
          email: contactData.email,
          workValue: selectedWorkValue,
          selectedPrice: selectedPrice
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar dados');
      }

      setSubmitted(true);
      toast({
        title: "Obrigado pelo interesse!",
        description: "Entraremos em contato quando o produto estiver disponível.",
      });
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      toast({
        title: "Erro ao enviar",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="validation" className="py-16 lg:py-28 bg-green-100 text-foreground">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 md:mb-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-green-800">
              Obrigado pelo interesse!
            </h2>
            <p className="text-base md:text-lg text-green-700 mb-6 md:mb-8">
              Seu interesse nos ajuda a construir algo que realmente resolve o seu problema.
              Clique no botão abaixo para acessar o Obra Control e faça o seu cadastro ou login.
            </p>
            <a
              href="https://obracontrol.upvya.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-12 md:mb-16 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Acesse o Obra Control
            </a>
            <br>
            </br>
            <div className="p-4 rounded-xl bg-white/70 inline-block text-left">
              <p className="text-sm text-green-700">
                Nome: <span className="font-semibold">{contactData.name}</span>
              </p>
              <p className="text-sm text-green-700 mt-1">
                Valor da obra: <span className="font-semibold">{selectedWorkValue}</span>
              </p>
              <p className="text-sm text-green-700 mt-1">
                Disposição: <span className="font-semibold">R${selectedPrice}/mês</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="validation" className="py-16 lg:py-28 bg-gradient-hero text-primary-foreground">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Vamos juntos
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-5xl font-bold mb-4">
            Ajude-nos a construir isso
          </h2>
          <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto">
            Responda algumas perguntas rápidas para entendermos melhor sua situação.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-8 md:mb-10">
            <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-colors ${step >= 1 ? 'bg-secondary' : 'bg-primary-foreground/30'}`} />
            <div className={`w-6 md:w-8 h-0.5 transition-colors ${step >= 2 ? 'bg-secondary' : 'bg-primary-foreground/30'}`} />
            <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-colors ${step >= 2 ? 'bg-secondary' : 'bg-primary-foreground/30'}`} />
            <div className={`w-6 md:w-8 h-0.5 transition-colors ${step >= 3 ? 'bg-secondary' : 'bg-primary-foreground/30'}`} />
            <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-colors ${step >= 3 ? 'bg-secondary' : 'bg-primary-foreground/30'}`} />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-5 md:p-8"
              >
                <h3 className="font-display text-lg md:text-xl font-bold mb-4 md:mb-6 text-center">
                  Qual o valor estimado da sua obra?
                </h3>
                <div className="grid gap-2 md:gap-3">
                  {workValues.map((value) => (
                    <button
                      key={value}
                      onClick={() => {
                        setSelectedWorkValue(value);
                        setTimeout(() => setStep(2), 200);
                      }}
                      className={`w-full p-3 md:p-4 rounded-xl text-left text-sm md:text-base font-medium transition-all ${
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
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-5 md:p-8"
              >
                <h3 className="font-display text-lg md:text-xl font-bold mb-2 text-center">
                  Quanto você pagaria para evitar prejuízo financeiro na obra?
                </h3>
                <p className="text-xs md:text-sm opacity-75 text-center mb-4 md:mb-6">
                  Considerando um sistema que antecipa problemas de orçamento.
                </p>
                <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                  {priceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedPrice(option.value)}
                      className={`relative p-3 md:p-5 rounded-xl font-medium transition-all ${
                        selectedPrice === option.value
                          ? 'bg-secondary text-secondary-foreground ring-2 ring-secondary ring-offset-2 ring-offset-primary'
                          : 'bg-primary-foreground/10 hover:bg-primary-foreground/20'
                      }`}
                    >
                      {option.popular && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] md:text-xs font-bold rounded-full whitespace-nowrap">
                          Popular
                        </span>
                      )}
                      <span className="text-sm md:text-lg">{option.label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className="text-primary-foreground hover:bg-primary-foreground/10 order-2 sm:order-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    variant="hero"
                    size="lg"
                    className="flex-1 order-1 sm:order-2"
                    disabled={!selectedPrice}
                    onClick={() => setStep(3)}
                  >
                    Continuar
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-5 md:p-8"
              >
                <h3 className="font-display text-lg md:text-xl font-bold mb-2 text-center">
                  Suas informações de contato
                </h3>
                <p className="text-xs md:text-sm opacity-75 text-center mb-4 md:mb-6">
                  Prometemos não enviar spam. Só entraremos em contato sobre o produto.
                </p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-primary-foreground flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Nome completo
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-secondary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-primary-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Telefone/WhatsApp
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={contactData.phone}
                      onChange={handlePhoneChange}
                      maxLength={15}
                      className={`bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-secondary ${errors.phone ? 'border-red-400' : ''}`}
                    />
                    {errors.phone && <span className="text-red-300 text-xs">{errors.phone}</span>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-primary-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={contactData.email}
                      onChange={handleEmailChange}
                      className={`bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-secondary ${errors.email ? 'border-red-400' : ''}`}
                    />
                    {errors.email && <span className="text-red-300 text-xs">{errors.email}</span>}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Button
                    variant="ghost"
                    onClick={() => setStep(2)}
                    className="text-primary-foreground hover:bg-primary-foreground/10 order-2 sm:order-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    variant="hero"
                    size="lg"
                    className="flex-1 order-1 sm:order-2"
                    disabled={!isContactValid || isLoading}
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Confirmar interesse
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
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
