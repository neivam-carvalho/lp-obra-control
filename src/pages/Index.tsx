import HeroSection from "@/components/landing/HeroSection";
import PainSection from "@/components/landing/PainSection";
import CauseSection from "@/components/landing/CauseSection";
import TransformationSection from "@/components/landing/TransformationSection";
import AudienceSection from "@/components/landing/AudienceSection";
import ValidationSection from "@/components/landing/ValidationSection";
import StatusSection from "@/components/landing/StatusSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PainSection />
      <CauseSection />
      <TransformationSection />
      <AudienceSection />
      <ValidationSection />
      <StatusSection />
      
      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 — Projeto em fase de validação
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
