import HeroSection from "@/components/landing/HeroSection";
import PainSection from "@/components/landing/PainSection";
import CauseSection from "@/components/landing/CauseSection";
import TransformationSection from "@/components/landing/TransformationSection";
import AudienceSection from "@/components/landing/AudienceSection";
import ValidationSection from "@/components/landing/ValidationSection";
import StatusSection from "@/components/landing/StatusSection";
import Header from "@/components/landing/Header";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
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
          <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
            <p>
              Desenvolvido por{" "}
              <a 
                href="https://upvya.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Upvya
              </a>
            </p>
            <p>© 2025 Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
