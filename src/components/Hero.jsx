import React, { useState } from 'react';
import { Sparkles, ArrowRight, Calendar, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Hero({ t, onOpenTourModal }) {
  const [activeMoodIndex, setActiveMoodIndex] = useState(0);
  const currentMood = t.hero.moods[activeMoodIndex] || t.hero.moods[0];

  return (
    <section className="relative overflow-hidden bg-parchment-grain pt-6 pb-16 lg:pt-12 lg:pb-24 border-b border-[#E5DEC9]">
      {/* Subtle botanical ornamental background ring */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full border border-[#C5A065]/20 opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-20 -left-32 w-[360px] h-[360px] rounded-full border border-[#681D54]/10 opacity-50"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE1] border border-[#C5A065]/40">
              <span className="w-2 h-2 rounded-full bg-[#681D54] animate-pulse" />
              <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.18em] text-[#681D54] font-semibold uppercase">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-[62px] leading-[1.06] text-[#1A1318] tracking-tight">
              {t.hero.titleLine1}{' '}
              <span className="italic font-normal text-[#681D54] block sm:inline">
                {t.hero.titleItalic}
              </span>{' '}
              {t.hero.titleLine2}
            </h1>

            <p className="text-base sm:text-lg text-[#4A3E47] leading-relaxed max-w-xl font-normal">
              {t.hero.subtitle}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#simulateur"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#681D54] hover:bg-[#521442] text-[#FAF6F0] text-sm font-semibold tracking-wide shadow-[0_12px_28px_-6px_rgba(104,29,84,0.5)] transition-all hover:-translate-y-0.5 border border-[#C5A065]/40"
              >
                <Sparkles className="w-4 h-4 text-[#C5A065]" />
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenTourModal}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-white/90 hover:bg-[#F3ECE1] text-[#1A1318] border border-[#C5A065]/50 text-sm font-semibold transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#681D54]" />
                <span>{t.hero.secondaryCta}</span>
              </button>
            </div>

            {/* Interactive Atmosphere Switcher */}
            <div className="pt-4 border-t border-[#E5DEC9]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-cinzel text-[11px] uppercase tracking-[0.2em] text-[#681D54] font-semibold">
                  {t.hero.moodLabel}
                </span>
                <span className="text-xs text-[#6E5D68] font-medium">
                  0{activeMoodIndex + 1} / 0{t.hero.moods.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {t.hero.moods.map((m, idx) => {
                  const isSelected = idx === activeMoodIndex;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActiveMoodIndex(idx)}
                      className={`text-left px-3.5 py-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#161115] text-[#FAF6F0] border-[#C5A065] shadow-md'
                          : 'bg-white/75 hover:bg-white text-[#2D222A] border-[#E5DEC9]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={`text-[10px] font-cinzel tracking-widest uppercase ${
                            isSelected ? 'text-[#C5A065]' : 'text-[#681D54]'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#C5A065]" />}
                      </div>
                      <p className="text-xs font-semibold leading-snug">{m.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[28px] overflow-hidden border-2 border-[#C5A065]/40 shadow-[0_28px_60px_-15px_rgba(26,19,24,0.25)] bg-[#161115] aspect-[4/3] sm:aspect-[16/11]">
              <img
                key={currentMood.image}
                src={currentMood.image}
                alt={currentMood.label}
                className="w-full h-full object-cover transition-all duration-700 scale-100 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161115]/90 via-[#161115]/25 to-transparent" />

              {/* Top Right Floating Crest */}
              <div className="absolute top-4 right-4 bg-[#FAF6F0]/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#C5A065]/50 shadow-lg flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#681D54]" />
                <span className="text-xs font-semibold text-[#1A1318]">Mvan · Yaoundé</span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 text-[#FAF6F0]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#681D54]/90 border border-[#C5A065]/40 text-[11px] font-cinzel tracking-widest uppercase text-[#FAF6F0]">
                    {currentMood.tag}
                  </span>
                  <span className="text-xs font-semibold text-[#C5A065] bg-[#161115]/80 px-3 py-1 rounded-full border border-[#C5A065]/30">
                    {currentMood.accentMetric}
                  </span>
                </div>
                <p className="font-serif-editorial text-xl sm:text-2xl italic text-white leading-snug">
                  “{currentMood.caption}”
                </p>
              </div>
            </div>

            {/* Floating Assurance Ribbon below hero image */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="bg-white/90 border border-[#E5DEC9] rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#1B3B2B] shrink-0" />
                <span className="text-xs font-medium text-[#2D222A]">
                  {t.nav.langLabel === 'FR' ? 'Groupe Électrogène Auto' : 'Auto Backup Generator'}
                </span>
              </div>
              <div className="bg-white/90 border border-[#E5DEC9] rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#681D54] shrink-0" />
                <span className="text-xs font-medium text-[#2D222A]">
                  {t.nav.langLabel === 'FR' ? 'Plan B Pluie Climatisé' : 'Climatised Rain Backup'}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-white/90 border border-[#E5DEC9] rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A065] shrink-0" />
                <span className="text-xs font-medium text-[#2D222A]">
                  {t.nav.langLabel === 'FR' ? 'Parking Clos 150+ Places' : '150+ Gated Parking'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Metric Architectural Strip */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-[#C5A065]/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.hero.metrics.map((m, i) => (
            <div
              key={i}
              className="bg-white/85 backdrop-blur-sm rounded-2xl p-5 border border-[#E5DEC9] hover:border-[#C5A065] transition-all shadow-xs"
            >
              <p className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#681D54]">
                {m.value}
              </p>
              <p className="text-sm font-semibold text-[#1A1318] mt-1">{m.label}</p>
              <p className="text-xs text-[#6E5D68] mt-0.5">{m.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
