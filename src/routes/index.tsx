import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar"; // You already have this from previous step
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-grow pt-[68px]">
        <Hero />
        <Services />
        <About />
        {/* Add Ecosystem, Contact, and Footer components here as you build them out */}
      </main>
    </div>
  );
}