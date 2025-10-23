import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProductGrid />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
