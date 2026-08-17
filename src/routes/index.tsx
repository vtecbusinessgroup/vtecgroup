import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
// Import the rest of your sections as you create them:
// import { Ecosystem } from "@/components/Ecosystem";
// import { Contact } from "@/components/Contact";
// import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="flex-grow pt-[68px]"> {/* Account for the fixed Navbar height */}
        <Hero />
        <Services />
        <About />
        
        {/* 
           Add your remaining sections here in order:
           <Ecosystem />
           <WhyChooseVTEC />
           <Testimonials />
           <Vision />
           <Waitlist />
           <Contact />
           <Footer />
        */}
      </main>
    </div>
  );
}