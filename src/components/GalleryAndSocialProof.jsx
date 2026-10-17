import React, { useState } from 'react';
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  ChevronDown,
  MapPin,
  Phone,
  Navigation,
  MessageCircle,
  Clock,
  Sparkles,
  Building,
} from 'lucide-react';
import { VENUE_CONTACT } from '../data/venueData';

function InstagramSvg({ className = 'w-4 h-4' }) {
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

function FacebookSvg({ className = 'w-4 h-4' }) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function GalleryAndSocialProof({ t, lang, onOpenTourModal }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const filteredGallery =
    activeFilter === 'all'
      ? t.gallery.items
      : t.gallery.items.filter((item) => item.category === activeFilter);

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((prev) => (prev + 1) % filteredGallery.length);
  const prevImage = () =>
    setLightboxIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);

  const getDirectWhatsAppUrl = () => {
    const text =
      lang === 'fr'
        ? "Bonjour La Roseraie d'Anne & Anash Events, je souhaite planifier une visite privée du domaine à Mvan (Yaoundé) et découvrir vos formules."
        : "Hello La Roseraie d'Anne & Anash Events, I would like to schedule a private tour of the estate in Mvan (Yaoundé) and explore your packages.";
    return `${VENUE_CONTACT.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      {/* 1. Filterable Masonry Gallery */}
      <section id="galerie" className="py-20 lg:py-28 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-3">
              <span className="font-cinzel text-xs tracking-[0.22em] text-[#681D54] font-semibold uppercase block">
                {t.gallery.eyebrow}
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#1A1318] leading-tight">
                {t.gallery.title}{' '}
                <span className="italic text-[#681D54] font-normal">
                  {t.gallery.titleItalic}
                </span>
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {t.gallery.filters.map((f) => {
                const active = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setActiveFilter(f.id);
                      setLightboxIndex(null);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                      active
                        ? 'bg-[#681D54] text-white border-[#C5A065] shadow-sm'
                        : 'bg-white text-[#4A3E47] border-[#E5DEC9] hover:border-[#681D54]'
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editorial Asymmetric Masonry Grid */}
          <div className="grid grid-cols-12 gap-4 sm:gap-6">
            {filteredGallery.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className={`${item.span} group relative rounded-[24px] overflow-hidden bg-[#161115] border border-[#C5A065]/35 h-72 sm:h-80 cursor-pointer shadow-md`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161115]/85 via-[#161115]/15 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF6F0]/90 text-[#681D54] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <ZoomIn className="w-4 h-4" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="font-serif-editorial text-2xl font-semibold">{item.title}</p>
                  <p className="text-xs text-[#C5A065] mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
          <div className="fixed inset-0 z-50 bg-[#161115]/95 backdrop-blur-md flex items-center justify-center p-4">
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={prevImage}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full space-y-4 text-center">
              <img
                src={filteredGallery[lightboxIndex].image}
                alt={filteredGallery[lightboxIndex].title}
                className="max-h-[75vh] w-auto mx-auto rounded-2xl border border-[#C5A065]/40 object-contain"
              />
              <div>
                <p className="font-serif-editorial text-2xl text-white">
                  {filteredGallery[lightboxIndex].title}
                </p>
                <p className="text-xs text-[#C5A065]">
                  {filteredGallery[lightboxIndex].subtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </section>

      {/* 2. Testimonials Section */}
      <section className="py-20 lg:py-24 bg-[#F3ECE1] border-t border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <span className="font-cinzel text-xs tracking-[0.22em] text-[#681D54] font-semibold uppercase block">
              {t.testimonials.eyebrow}
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#1A1318] leading-tight">
              {t.testimonials.title}{' '}
              <span className="italic text-[#681D54] font-normal">
                {t.testimonials.titleItalic}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, i) => (
              <div
                key={i}
                className="bg-[#FAF6F0] rounded-[24px] p-7 border border-[#E5DEC9] flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-[#C5A065]">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-4 h-4 fill-[#C5A065]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#681D54] bg-[#681D54]/8 px-2.5 py-1 rounded-full">
                      {item.highlight}
                    </span>
                  </div>
                  <p className="font-serif-editorial text-xl italic text-[#1A1318] leading-relaxed">
                    “{item.quote}”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5DEC9]">
                  <p className="text-sm font-bold text-[#1A1318]">{item.author}</p>
                  <p className="text-xs text-[#6E5D68]">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Expandable FAQ Section */}
      <section id="faq" className="py-20 lg:py-24 bg-[#FAF6F0] border-t border-[#E5DEC9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="font-cinzel text-xs tracking-[0.22em] text-[#681D54] font-semibold uppercase block">
              {t.faq.eyebrow}
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#1A1318]">
              {t.faq.title}{' '}
              <span className="italic text-[#681D54] font-normal">{t.faq.titleItalic}</span>
            </h2>
          </div>

          <div className="space-y-3.5">
            {t.faq.items.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E5DEC9] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif-editorial text-xl sm:text-2xl font-semibold text-[#1A1318]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#681D54] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-[#4A3E47] leading-relaxed border-t border-[#F3ECE1]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Privileged Location (Mvan, Yaoundé) & Anash Events Showrooms */}
      <section className="py-20 lg:py-24 bg-[#F3ECE1] border-t border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <span className="font-cinzel text-xs tracking-[0.22em] text-[#681D54] font-semibold uppercase block">
                {t.location.eyebrow}
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#1A1318] leading-tight">
                {t.location.title}{' '}
                <span className="italic text-[#681D54] font-normal">
                  {t.location.titleItalic}
                </span>
              </h2>
              <p className="text-base text-[#4A3E47] leading-relaxed">
                {t.location.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {t.location.landmarks.map((lm, i) => (
                  <div
                    key={i}
                    className="bg-[#FAF6F0] rounded-2xl p-4 border border-[#E5DEC9] flex items-center gap-3.5"
                  >
                    <span className="px-3 py-1.5 rounded-xl bg-[#681D54] text-white font-serif-editorial text-base font-bold shrink-0">
                      {lm.time}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#1A1318]">
                      {lm.place}
                    </span>
                  </div>
                ))}
              </div>

              {/* Official Social Channels Bar */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={VENUE_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#681D54] text-[#1A1318] hover:text-white border border-[#C5A065]/50 text-xs font-semibold transition-all shadow-xs"
                >
                  <InstagramSvg className="w-4 h-4 text-[#681D54] group-hover:text-white" />
                  <span>Instagram Domaine : {VENUE_CONTACT.instagramHandle}</span>
                </a>

                <a
                  href={VENUE_CONTACT.instagramAnashUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#681D54] text-[#1A1318] hover:text-white border border-[#C5A065]/50 text-xs font-semibold transition-all shadow-xs"
                >
                  <InstagramSvg className="w-4 h-4 text-[#C5A065]" />
                  <span>Scénographie : {VENUE_CONTACT.instagramAnashHandle}</span>
                </a>

                <a
                  href={VENUE_CONTACT.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#681D54] text-[#1A1318] hover:text-white border border-[#C5A065]/50 text-xs font-semibold transition-all shadow-xs"
                >
                  <FacebookSvg className="w-4 h-4 text-[#681D54]" />
                  <span>{VENUE_CONTACT.facebookName}</span>
                </a>
              </div>
            </div>

            {/* Right Private Visit & Showrooms Card */}
            <div className="lg:col-span-5 bg-velours-dark text-[#FAF6F0] rounded-[28px] p-7 sm:p-9 border-2 border-[#C5A065]/45 shadow-2xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#681D54]/80 border border-[#C5A065]/40 text-xs font-cinzel tracking-widest uppercase text-[#C5A065]">
                <Clock className="w-3.5 h-3.5" />
                <span>09h00 – 18h30 · 7j/7</span>
              </div>

              <h3 className="font-serif-editorial text-3xl text-white leading-snug">
                {t.location.visitCardTitle}
              </h3>

              <p className="text-sm text-[#EDE5D8]/80 leading-relaxed">
                {t.location.visitCardSubtitle}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5 text-[#C5A065] font-medium">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Domaine :</strong> {VENUE_CONTACT.neighborhood}, {VENUE_CONTACT.city}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-[#EDE5D8]/90">
                  <Building className="w-4 h-4 text-[#C5A065] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Showrooms Anash Events :</strong> {VENUE_CONTACT.showroomAddress}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-white font-semibold pt-1 border-t border-white/10">
                  <Phone className="w-4 h-4 text-[#C5A065] shrink-0 mt-0.5" />
                  <div>
                    <p>WhatsApp Principal : {VENUE_CONTACT.phoneDisplay}</p>
                    <p className="text-xs text-[#EDE5D8]/75 font-normal mt-0.5">
                      Showroom : {VENUE_CONTACT.secondaryPhones.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <a
                  href={getDirectWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-5 rounded-full bg-[#681D54] hover:bg-[#7d2365] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 border border-[#C5A065]/50 shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#C5A065]" />
                  <span>{t.location.visitButton}</span>
                </a>

                <a
                  href={VENUE_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 border border-white/15 transition-all"
                >
                  <Navigation className="w-4 h-4 text-[#C5A065]" />
                  <span>{t.location.directionsButton}</span>
                </a>

                <a
                  href={VENUE_CONTACT.showroomMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-5 rounded-full bg-white/5 hover:bg-white/10 text-[#C5A065] text-xs font-medium flex items-center justify-center gap-2 border border-[#C5A065]/30 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{t.location.showroomButton}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Luxury Dark Footer */}
      <footer className="bg-[#120D11] text-[#EDE5D8] pt-16 pb-12 border-t border-[#C5A065]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            <div className="md:col-span-5 space-y-4">
              <img
                src="/brand/logo-light.png"
                alt="La Roseraie d'Anne — Domaine de Réception"
                className="h-12 sm:h-14 w-auto object-contain"
              />
              <p className="text-xs sm:text-sm text-[#EDE5D8]/75 max-w-md leading-relaxed">
                {t.footer.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a
                  href={VENUE_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/8 hover:bg-[#681D54] text-xs font-medium text-white border border-[#C5A065]/30 transition-colors"
                >
                  <InstagramSvg className="w-3.5 h-3.5 text-[#C5A065]" />
                  <span>{VENUE_CONTACT.instagramHandle}</span>
                </a>
                <a
                  href={VENUE_CONTACT.instagramAnashUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/8 hover:bg-[#681D54] text-xs font-medium text-white border border-[#C5A065]/30 transition-colors"
                >
                  <InstagramSvg className="w-3.5 h-3.5 text-[#C5A065]" />
                  <span>{VENUE_CONTACT.instagramAnashHandle}</span>
                </a>
                <a
                  href={VENUE_CONTACT.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/8 hover:bg-[#681D54] text-xs font-medium text-white border border-[#C5A065]/30 transition-colors"
                >
                  <FacebookSvg className="w-3.5 h-3.5 text-[#C5A065]" />
                  <span>Anash Events</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <p className="font-cinzel text-xs tracking-widest uppercase text-[#C5A065] font-semibold">
                {lang === 'fr' ? 'Navigation' : 'Explore'}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#EDE5D8]/80">
                <li><a href="#esprit" className="hover:text-[#C5A065]">{t.nav.esprit}</a></li>
                <li><a href="#espaces" className="hover:text-[#C5A065]">{t.nav.espaces}</a></li>
                <li><a href="#celebrations" className="hover:text-[#C5A065]">{t.nav.celebrations}</a></li>
                <li><a href="#services" className="hover:text-[#C5A065]">{t.nav.services}</a></li>
                <li><a href="#simulateur" className="hover:text-[#C5A065]">{t.nav.devis}</a></li>
                <li><a href="#galerie" className="hover:text-[#C5A065]">{t.nav.galerie}</a></li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2.5">
              <p className="font-cinzel text-xs tracking-widest uppercase text-[#C5A065] font-semibold">
                {lang === 'fr' ? 'Domaine & Showrooms Anash Events' : 'Estate & Anash Events Showrooms'}
              </p>
              <p className="text-xs text-[#EDE5D8]/85">
                <strong className="text-white">Domaine :</strong> {VENUE_CONTACT.neighborhood}, {VENUE_CONTACT.city}
              </p>
              <p className="text-xs text-[#EDE5D8]/85">
                <strong className="text-white">Showrooms :</strong> {VENUE_CONTACT.showroomAddress}
              </p>
              <p className="text-sm font-semibold text-white pt-1">
                WhatsApp Direct :{' '}
                <a href={getDirectWhatsAppUrl()} target="_blank" rel="noreferrer" className="text-[#C5A065] hover:underline">
                  {VENUE_CONTACT.phoneDisplay}
                </a>
              </p>
              <p className="text-xs text-[#EDE5D8]/70">
                Lignes Showroom : {VENUE_CONTACT.secondaryPhones.join(' / ')}
              </p>
              <button
                type="button"
                onClick={onOpenTourModal}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5A065] hover:bg-[#d4b278] text-[#161115] text-xs font-bold tracking-wide cursor-pointer transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.nav.cta}</span>
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EDE5D8]/60">
            <p>{t.footer.rights}</p>
            <p className="text-[#C5A065]/80">{t.footer.crafted}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
