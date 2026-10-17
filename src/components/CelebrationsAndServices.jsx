import React from 'react';
import { CheckCircle2, PlusCircle, Sparkles, ArrowUpRight } from 'lucide-react';
import { VENUE_CONTACT } from '../data/venueData';

export default function CelebrationsAndServices({ t, lang, onAddServiceToSimulator }) {
  const handleSelectAddon = (serviceId) => {
    const mapAddon =
      serviceId === 'traiteur'
        ? 'traiteur'
        : serviceId === 'scenographie'
        ? 'decor'
        : serviceId === 'mobilier'
        ? 'mobilier'
        : serviceId === 'cortege'
        ? 'voiture'
        : serviceId === 'sonlumiere'
        ? 'son'
        : 'suite';
    onAddServiceToSimulator(mapAddon);
    const el = document.getElementById('simulateur');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Celebrations Sur-Mesure Section */}
      <section id="celebrations" className="py-20 lg:py-28 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="font-cinzel text-xs tracking-[0.22em] text-[#681D54] font-semibold uppercase block">
              {t.celebrations.eyebrow}
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#1A1318] leading-tight">
              {t.celebrations.title}{' '}
              <span className="italic text-[#681D54] font-normal">
                {t.celebrations.titleItalic}
              </span>
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {t.celebrations.items.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-[26px] overflow-hidden border border-[#E5DEC9] hover:border-[#C5A065] transition-all duration-300 shadow-[0_14px_34px_-16px_rgba(26,19,24,0.08)] flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 overflow-hidden bg-[#161115]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161115]/80 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-[#681D54]/90 text-white font-cinzel text-[10px] tracking-widest uppercase border border-[#C5A065]/40">
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-6 sm:p-7 space-y-4">
                    <h3 className="font-serif-editorial text-2xl font-semibold text-[#1A1318] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#4A3E47] leading-relaxed">{item.description}</p>

                    <div className="space-y-2 pt-2">
                      {item.highlights.map((hl, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#2D222A]">
                          <CheckCircle2 className="w-4 h-4 text-[#681D54] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-[#F3ECE1] flex items-center justify-between">
                  <a
                    href="#simulateur"
                    className="text-xs font-semibold text-[#681D54] hover:text-[#521442] inline-flex items-center gap-1.5"
                  >
                    <span>
                      {lang === 'fr' ? 'Configurer cet événement' : 'Configure this event'}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[11px] text-[#6E5D68]">Mvan, Yaoundé</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Clés en Main & Upselling (Dark Velours Couture Section) */}
      <section id="services" className="py-20 lg:py-28 bg-velours-dark text-[#FAF6F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl space-y-4">
              <span className="font-cinzel text-xs tracking-[0.22em] text-[#C5A065] font-semibold uppercase block">
                {t.services.eyebrow}
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl text-white leading-tight">
                {t.services.title}{' '}
                <span className="italic text-[#C5A065] font-normal">
                  {t.services.titleItalic}
                </span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#EDE5D8]/80 max-w-md leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>

          {/* 5 High-Margin Turnkey Services Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {t.services.items.map((srv, idx) => {
              const colSpan = idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
              return (
                <div
                  key={srv.id}
                  className={`${colSpan} group rounded-[24px] bg-[#21181F]/90 border border-[#C5A065]/25 hover:border-[#C5A065] transition-all overflow-hidden flex flex-col justify-between`}
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={srv.image}
                        alt={srv.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#21181F] via-[#21181F]/30 to-transparent" />
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#161115]/85 border border-[#C5A065]/40 text-[10px] font-cinzel tracking-widest uppercase text-[#C5A065]">
                        {srv.badge}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="font-serif-editorial text-2xl font-semibold text-white">
                        {srv.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#EDE5D8]/80 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#C5A065]">{srv.priceHint}</span>
                    <button
                      type="button"
                      onClick={() => handleSelectAddon(srv.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#C5A065] transition-colors cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4 text-[#C5A065]" />
                      <span>
                        {lang === 'fr' ? 'Inclure au devis' : 'Add to quote'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct Concierge Strip */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#681D54]/60 via-[#2A1B27] to-[#1B3B2B]/50 border border-[#C5A065]/35 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-cinzel text-xs tracking-widest uppercase text-[#C5A065]">
                {lang === 'fr'
                  ? 'CONCIERGERIE PRIVÉE · LA ROSERAIE D’ANNE'
                  : 'PRIVATE CONCIERGE · LA ROSERAIE D’ANNE'}
              </p>
              <p className="font-serif-editorial text-2xl text-white">
                {lang === 'fr'
                  ? 'Vous résidez dans la diaspora (France, Belgique, Canada, USA) ? Planifiez une visite vidéo en direct.'
                  : 'Living in the diaspora (Europe, North America)? Schedule a live guided video walkthrough.'}
              </p>
            </div>
            <a
              href={`${VENUE_CONTACT.whatsappBaseUrl}?text=${encodeURIComponent(
                lang === 'fr'
                  ? "Bonjour La Roseraie d'Anne, je souhaite planifier une visite (sur place à Mvan ou en vidéo WhatsApp) pour mon événement."
                  : "Hello La Roseraie d'Anne, I would like to schedule a tour (on-site in Mvan or via live WhatsApp video) for my event."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C5A065] hover:bg-[#d4b278] text-[#161115] text-xs sm:text-sm font-bold tracking-wide transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{VENUE_CONTACT.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
