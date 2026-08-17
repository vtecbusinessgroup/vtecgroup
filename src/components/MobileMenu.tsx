import { Home, Layers, Briefcase, Users, LineChart, FileText, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const menuLinks = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Layers, label: "MILIKI App", href: "/miliki" },
    { icon: Briefcase, label: "Our Services", href: "/services" },
    { icon: Users, label: "Leadership", href: "/leadership" },
    { icon: LineChart, label: "VTEC Intelligence", href: "/business-diagnostic" },
    { icon: FileText, label: "Blog", href: "/blog" },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[300px] border-l border-white/10 bg-slate-900/95 backdrop-blur-xl sm:w-[350px]">
        <SheetHeader className="border-b border-white/10 pb-4">
          <SheetTitle className="text-white">
            <span className="text-green-500">VTEC</span> Menu
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 flex flex-col gap-2">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/30">Explore</div>
          {menuLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white"
            >
              <link.icon className="h-4 w-4 text-green-500" />
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <Button asChild className="w-full rounded-full bg-green-600 font-bold hover:bg-green-500">
            <a href="#contact" onClick={() => onOpenChange(false)}>
              <MessageCircle className="mr-2 h-4 w-4" /> Contact Us
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}