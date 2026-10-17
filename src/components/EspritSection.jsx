import React from 'react';
import { Quote, Award, Flower2, Landmark } from 'lucide-react';

const PILLAR_ICONS = [Award, Flower2, Landmark];

export default function EspritSection({ t }) {
  return (
    <section id="esprit" className="py-20 lg:py-28 bg-[#FAF6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Asymmetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Asymmetric Layered Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[26px] overflow-hidden border border-[#C5A065]/40 shadow-xl aspect-[4/5]">
              <img
                src="/images/editorial-floral-arch.jpg"
                alt="La Roseraie d'Anne Floral Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161115]/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="font-cinzel text-[10px] tracking-[0.22em] text-[#C5A065] uppercase">
                  LA ROSERAIE D'ANNE · MVAN
                </p>
                <p className="font-serif-editorial text-xl italic mt-0.5">
                  {t.nav.langLabel === 'FR'
                    ? "L'harmonie de la pierre, de l'eau et des roses."
                    : 'The harmony of architecture, water, and roses.'}
                </p>
              </div>
            </div>

            {/* Overlapping Secondary Botanical Frame */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-48 h-48 rounded-2xl overflow-hidden border-4 border-[#FAF6F0] shadow-2xl">
              <img
                src="/images/gallery-botanical-roses.jpg"
                alt="Roses Signature"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Editorial Storytelling & Quote */}
          <div className="lg:col-span-7 space-y-6 lg:pl-6">
            <span className="font-cinzel text-xs tracking-[0.22em] text-[#681D54] font-semibold uppercase block">
              {t.esprit.eyebrow}
            </span>

            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#1A1318] leading-[1.12]">
              {t.esprit.title}{' '}
              <span className="italic text-[#681D54] font-normal block sm:inline">
                {t.esprit.titleItalic}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#4A3E47] leading-relaxed">
              {t.esprit.lead}
            </p>

            {/* Founder Hospitality Promise Card */}
            <div className="bg-[#F3ECE1] border-l-4 border-[#681D54] rounded-r-2xl p-6 sm:p-7 relative">
              <Quote className="w-8 h-8 text-[#C5A065]/40 absolute top-4 right-5" />
              <p className="font-serif-editorial text-xl sm:text-2xl italic text-[#1A1318] leading-relaxed">
                {t.esprit.quote}
              </p>
              <p className="mt-3 font-cinzel text-xs tracking-[0.16em] text-[#681D54] uppercase font-semibold">
                — {t.esprit.quoteAuthor}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Signature Pillars (Benchmarking & Surpassing Les Jardins de René) */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {t.esprit.pillars.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[idx] || Award;
            return (
              <div
                key={pillar.number}
                className="group bg-white rounded-[24px] p-7 sm:p-8 border border-[#E5DEC9] hover:border-[#681D54]/50 transition-all duration-300 shadow-[0_12px_32px_-16px_rgba(26,19,24,0.08)] hover:shadow-[0_20px_40px_-15px_rgba(104,29,84,0.16)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif-editorial text-4xl font-light text-[#C5A065]">
                      {pillar.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#F3ECE1] group-hover:bg-[#681D54] text-[#681D54] group-hover:text-[#FAF6F0] flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#1A1318]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-cinzel tracking-[0.14em] uppercase text-[#681D54] mt-1 mb-4 font-semibold">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm text-[#4A3E47] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F3ECE1] flex items-center justify-between text-xs text-[#6E5D68]">
                  <span>La Roseraie d'Anne</span>
                  <span className="text-[#C5A065] font-semibold">Mvan · Yaoundé</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
