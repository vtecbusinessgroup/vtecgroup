import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-md px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-green-500">
              <img src="/vtec-logo.png" alt="VTEC" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold tracking-widest text-white">VTEC</span>
              <span className="text-[10px] uppercase tracking-wide text-green-500">Business Group</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="/services" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Services</a>
            <a href="/solutions" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Solutions</a>
            <a href="/vision-2035" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Vision 2035</a>
            <Button asChild className="rounded-full bg-green-600 hover:bg-green-500">
              <a href="#contact">Contact Us</a>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button onClick={() => setIsOpen(true)} className="flex items-center md:hidden">
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </nav>
      
      <MobileMenu open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}