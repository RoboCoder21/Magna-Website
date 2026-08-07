import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube, Facebook, Linkedin, Send, ArrowUp } from "lucide-react";
import contactData from "@/content/contact.json";

const TikTokIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 1 1-2.896-2.896c.244 0 .478.03.704.084V9.375a6.34 6.34 0 0 0-.704-.04 6.341 6.341 0 1 0 6.341 6.341V8.662a8.204 8.204 0 0 0 4.77 1.516v-3.445a4.833 4.833 0 0 1-1.000-.047z"/>
  </svg>
);

const footerLinks = {
  services: [
    { name: "Event Planning", href: "#" },
    { name: "Video Production", href: "#" },
    { name: "Photography", href: "#" },
    { name: "Live Streaming", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

const Footer = () => {
  const [data, setData] = useState(() => contactData);

  useEffect(() => {
    const local = localStorage.getItem("magna_content_contact");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed) setData((prev) => ({ ...prev, ...parsed }));
      } catch (e) {}
    }

    fetch("/content/contact.json?t=" + Date.now())
      .then((res) => (res.ok ? res.json() : null))
      .then((remoteData) => {
        if (remoteData) setData((prev) => ({ ...prev, ...remoteData }));
      })
      .catch(() => {});
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialItems = [
    { icon: TikTokIcon, href: (data as any).tiktok || "#", label: "TikTok" },
    { icon: Instagram, href: (data as any).instagram || "#", label: "Instagram" },
    { icon: Youtube, href: (data as any).youtube || "#", label: "YouTube" },
    { icon: Facebook, href: (data as any).facebook || "#", label: "Facebook" },
    { icon: Linkedin, href: (data as any).linkedin || "#", label: "LinkedIn" },
    { icon: Send, href: (data as any).telegram || "#", label: "Telegram" },
  ];

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 glass-strong" />
      
      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#home"
              className="inline-block text-3xl font-display font-bold text-gradient-gold mb-6"
              whileHover={{ scale: 1.05 }}
            >
              MAGNA<span className="text-foreground">.</span>
            </motion.a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Event, film, and digital crews working as one. We ship experiences that travel beyond the venue.
            </p>
            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3">
              {socialItems.map((social) => {
                if (!social.href || social.href === "") return null;
                const isExternal = social.href.startsWith("http");
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={isExternal ? "_blank" : "_self"}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/30 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Magna. All rights reserved.
          </p>
          
          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
