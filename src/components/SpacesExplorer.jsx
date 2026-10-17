import React, { useState } from 'react';
import { Users, Maximize2, Check, Sparkles, MessageCircle, Wine, Presentation } from 'lucide-react';
import { VENUE_CONTACT } from '../data/venueData';

export default function SpacesExplorer({ t, lang, onSelectSpaceForSimulator }) {
  const [activeTab, setActiveTab] = useState(0);
  const currentSpace = t.spaces.items[activeTab] || t.spaces.items[0];

  const handleSelectSpace = (spaceId) => {
    const mapId =
      spaceId === 'roseraie'
        ? 'jardin'
        : spaceId === 'pavillon'
        ? 'pavillon'
        : 'privatisation';
    onSelectSpaceForSimulator(mapId);
    const el = document.getElementById('simulateur');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getSpaceWhatsAppUrl = (spaceName) => {
    const msg =
      lang === 'fr'
        ? `Bonjour La Roseraie d'Anne, je souhaite obtenir les disponibilités et tarifs pour l'espace "${spaceName}" à Mvan, Yaoundé.`
        : `Hello La Roseraie d'Anne, I would like to check availability and rates for "${spaceName}" in Mvan, Yaoundé.`;
    return `${VENUE_CONTACT.whatsappBaseUrl}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="espaces" className="py-20 lg:py-28 bg-[#F3ECE1] border-y border-[#E5DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="font-cinzel text-xs tracking-[0.22em] text-[#681D54] font-semibold uppercase block">
            {t.spaces.eyebrow}
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#1A1318] leading-tight">
            {t.spaces.title}{' '}
            <span className="italic text-[#681D54] font-normal">{t.spaces.titleItalic}</span>
          </h2>
          <p className="text-base text-[#4A3E47] leading-relaxed">{t.spaces.subtitle}</p>
        </div>

        {/* Interactive Space Selector Tabs */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {t.spaces.items.map((space, idx) => {
            const active = idx === activeTab;
            return (
              <button
                key={space.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  active
                    ? 'bg-[#681D54] text-white border-[#C5A065] shadow-[0_14px_30px_-10px_rgba(104,29,84,0.45)]'
                    : 'bg-[#FAF6F0] hover:bg-white text-[#1A1318] border-[#E5DEC9]'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span
                    className={`font-cinzel tracking-widest uppercase ${
                      active ? 'text-[#C5A065]' : 'text-[#681D54]'
                    }`}
                  >
                    0{idx + 1} · {space.surface}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      active ? 'bg-white/15 text-white' : 'bg-[#681D54]/10 text-[#681D54]'
                    }`}
                  >
                    {space.banquet}
                  </span>
                </div>
                <p className="font-serif-editorial text-xl font-semibold leading-snug">
                  {space.name}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Space Showcase Panel */}
        <div className="mt-8 bg-[#FAF6F0] rounded-[28px] border border-[#C5A065]/40 shadow-[0_24px_50px_-20px_rgba(26,19,24,0.14)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Image Column */}
            <div className="lg:col-span-6 relative min-h-[320px] sm:min-h-[420px] bg-[#161115]">
              <img
                key={currentSpace.image}
                src={currentSpace.image}
                alt={currentSpace.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161115]/80 via-transparent to-transparent" />

              {/* Top Badge */}
              <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-[#161115]/85 backdrop-blur-md border border-[#C5A065]/40 text-xs font-cinzel tracking-wider uppercase text-[#C5A065]">
                {currentSpace.badge}
              </div>

              {/* Secondary Inset Preview */}
              <div className="hidden sm:flex absolute bottom-5 left-5 right-5 items-end justify-between gap-4">
                <div className="bg-[#161115]/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-white max-w-xs">
                  <p className="text-[11px] font-cinzel uppercase tracking-widest text-[#C5A065]">
                    La Roseraie d'Anne · Mvan
                  </p>
                  <p className="text-xs text-[#EDE5D8] mt-1">{currentSpace.tagline}</p>
                </div>
                <img
                  src={currentSpace.secondaryImage}
                  alt={currentSpace.name}
                  className="w-28 h-20 rounded-xl object-cover border-2 border-[#C5A065] shadow-lg shrink-0"
                />
              </div>
            </div>

            {/* Right Architectural Specs Column */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div>
                  <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#1A1318] font-semibold">
                    {currentSpace.name}
                  </h3>
                  <p className="text-sm text-[#681D54] font-medium mt-1">{currentSpace.tagline}</p>
                </div>

                {/* Capacity Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  <div className="bg-white rounded-xl p-3 border border-[#E5DEC9]">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#6E5D68]">
                      <Maximize2 className="w-3.5 h-3.5 text-[#681D54]" />
                      <span>{t.spaces.labels.surface}</span>
                    </div>
                    <p className="font-serif-editorial text-xl font-bold text-[#1A1318] mt-0.5">
                      {currentSpace.surface}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-3 border border-[#E5DEC9]">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#6E5D68]">
                      <Users className="w-3.5 h-3.5 text-[#681D54]" />
                      <span>{t.spaces.labels.banquet}</span>
                    </div>
                    <p className="font-serif-editorial text-xl font-bold text-[#1A1318] mt-0.5">
                      {currentSpace.banquet}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-3 border border-[#E5DEC9]">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#6E5D68]">
                      <Wine className="w-3.5 h-3.5 text-[#681D54]" />
                      <span>{t.spaces.labels.cocktail}</span>
                    </div>
                    <p className="font-serif-editorial text-xl font-bold text-[#1A1318] mt-0.5">
                      {currentSpace.cocktail}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-3 border border-[#E5DEC9]">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#6E5D68]">
                      <Presentation className="w-3.5 h-3.5 text-[#681D54]" />
                      <span>{t.spaces.labels.conference}</span>
                    </div>
                    <p className="font-serif-editorial text-xl font-bold text-[#1A1318] mt-0.5">
                      {currentSpace.conference}
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#4A3E47] leading-relaxed">
                  {currentSpace.description}
                </p>

                {/* Amenities Checklist */}
                <div className="space-y-2 pt-1">
                  {currentSpace.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2D222A]">
                      <span className="w-5 h-5 rounded-full bg-[#681D54]/10 text-[#681D54] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E5DEC9] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectSpace(currentSpace.id)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#681D54] hover:bg-[#521442] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A065]" />
                  <span>{t.spaces.labels.selectSpaceCta}</span>
                </button>

                <a
                  href={getSpaceWhatsAppUrl(currentSpace.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-[#F3ECE1] text-[#1A1318] border border-[#C5A065]/50 text-xs sm:text-sm font-semibold transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#1B3B2B]" />
                  <span>{t.spaces.labels.bookVisitCta}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
