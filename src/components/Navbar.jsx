import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Calendar, Menu, X, Sparkles, Globe } from 'lucide-react';
import { VENUE_CONTACT } from '../data/venueData';

function InstagramSvg({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Navbar({ lang, setLang, t, onOpenTourModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#esprit', label: t.nav.esprit },
    { href: '#espaces', label: t.nav.espaces },
    { href: '#celebrations', label: t.nav.celebrations },
    { href: '#services', label: t.nav.services },
    { href: '#simulateur', label: t.nav.devis, highlight: true },
    { href: '#galerie', label: t.nav.galerie },
    { href: '#faq', label: t.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Couture Bar */}
      <div className="bg-[#161115] text-[#EDE5D8] text-xs border-b border-[#C5A065]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-2">
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <span className="inline-flex items-center gap-1.5 text-[#C5A065] font-medium truncate">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="sm:hidden">Mvan, Yaoundé · Cameroun</span>
              <span className="hidden sm:inline">{VENUE_CONTACT.neighborhood}, {VENUE_CONTACT.city}</span>
            </span>
            <a
              href={`tel:${VENUE_CONTACT.phoneRaw}`}
              className="hidden md:inline-flex items-center gap-1.5 hover:text-[#C5A065] transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A065]" />
              <span>{VENUE_CONTACT.phoneDisplay}</span>
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href={VENUE_CONTACT.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#C5A065] transition-colors whitespace-nowrap"
            >
              <InstagramSvg className="w-3.5 h-3.5 text-[#C5A065]" />
              <span className="hidden sm:inline">{VENUE_CONTACT.instagramHandle}</span>
            </a>
            <a
              href={VENUE_CONTACT.instagramAnashUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 hover:text-[#C5A065] transition-colors text-[#EDE5D8]/80 whitespace-nowrap"
            >
              <InstagramSvg className="w-3.5 h-3.5 text-[#C5A065]" />
              <span>{VENUE_CONTACT.instagramAnashHandle}</span>
            </a>
            <span className="text-[#C5A065]/40">|</span>
            <div
              className="inline-flex items-center rounded-full bg-[#261B23] p-0.5 border border-[#C5A065]/30"
              role="group"
              aria-label="Language Switcher"
            >
              <button
                type="button"
                onClick={() => setLang('fr')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider transition-all cursor-pointer ${
                  lang === 'fr'
                    ? 'bg-[#681D54] text-white shadow-sm'
                    : 'text-[#EDE5D8]/70 hover:text-white'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#681D54] text-white shadow-sm'
                    : 'text-[#EDE5D8]/70 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF6F0]/95 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(26,19,24,0.08)] border-b border-[#C5A065]/25 py-2.5'
            : 'bg-[#FAF6F0]/90 backdrop-blur-sm border-b border-[#E6DEC8] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Official Brand Logo */}
          <a href="#" className="flex items-center group shrink-0" aria-label="La Roseraie d'Anne">
            <img
              src="/brand/logo-clean.png"
              alt="La Roseraie d'Anne — Domaine de Réception"
              className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium whitespace-nowrap transition-colors ${
                  link.highlight
                    ? 'text-[#681D54] font-semibold inline-flex items-center gap-1.5 bg-[#681D54]/8 px-3.5 py-1.5 rounded-full border border-[#681D54]/20 hover:bg-[#681D54]/15'
                    : 'text-[#2D222A] hover:text-[#681D54]'
                }`}
              >
                {link.highlight && <Sparkles className="w-3.5 h-3.5 text-[#C5A065] shrink-0" />}
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Right CTA & Language Toggle (Mobile-friendly) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="xl:hidden inline-flex items-center gap-1 px-2.5 py-2 rounded-full border border-[#C5A065]/40 bg-white/80 text-xs font-semibold text-[#681D54] cursor-pointer"
              title="Switch Language FR / EN"
            >
              <Globe className="w-3.5 h-3.5 text-[#C5A065]" />
              <span>{lang.toUpperCase()}</span>
            </button>

            <button
              type="button"
              onClick={onOpenTourModal}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#681D54] hover:bg-[#521442] text-[#FAF6F0] text-xs font-semibold tracking-wide whitespace-nowrap shadow-[0_6px_20px_-4px_rgba(104,29,84,0.45)] transition-all hover:-translate-y-0.5 cursor-pointer border border-[#C5A065]/40"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A065] shrink-0" />
              <span>{t.nav.cta}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden inline-flex items-center justify-center p-2.5 rounded-full bg-[#F3ECE1] text-[#681D54] hover:bg-[#681D54] hover:text-white transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="xl:hidden bg-[#FAF6F0] border-t border-[#E6DEC8] px-4 pt-4 pb-6 space-y-3 shadow-xl">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                    link.highlight
                      ? 'bg-[#681D54]/10 text-[#681D54] font-semibold border border-[#681D54]/20'
                      : 'text-[#2D222A] hover:bg-[#F3ECE1]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.highlight && <Sparkles className="w-4 h-4 text-[#C5A065]" />}
                </a>
              ))}
            </div>
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenTourModal();
                }}
                className="w-full py-3 rounded-full bg-[#681D54] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#C5A065]" />
                <span>{t.nav.cta}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
