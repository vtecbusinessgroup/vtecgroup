import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services"; // You will create these
import { About } from "@/components/About";       // You will create these
import { Ecosystem } from "@/components/Ecosystem"; // You will create these

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  // We removed the isClient/useEffect gate and iframe because
  // TanStack Router automatically handles SSR for us without blocking the UI.
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <About />
        <Ecosystem />
        {/* Add your Waitlist, Contact, and Footer components here */}
      </main>
    </div>
  );
}