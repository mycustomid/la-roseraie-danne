import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  MessageCircle,
  Download,
  Users,
  Calendar,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { VENUE_CONTACT } from '../data/venueData';

export default function QuoteSimulator({
  t,
  lang,
  selectedSpace,
  setSelectedSpace,
  selectedAddons,
  setSelectedAddons,
}) {
  const [eventType, setEventType] = useState('mariage');
  const [guests, setGuests] = useState(300);
  const [clientName, setClientName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [brochureAlert, setBrochureAlert] = useState(false);

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate dynamic indicative budget in FCFA
  const activeEventObj =
    t.simulator.eventTypes.find((e) => e.id === eventType) || t.simulator.eventTypes[0];
  const activeSpaceObj =
    t.simulator.spaces.find((s) => s.id === selectedSpace) || t.simulator.spaces[0];

  const venueEstimate = Math.round(activeEventObj.baseEstimate * activeSpaceObj.multiplier);

  const addonsEstimate = selectedAddons.reduce((sum, addonId) => {
    const found = t.simulator.addonsList.find((a) => a.id === addonId);
    if (!found) return sum;
    return sum + found.flat + found.perGuest * guests;
  }, 0);

  const totalEstimate = venueEstimate + addonsEstimate;
  const formattedTotal = new Intl.NumberFormat('fr-FR').format(totalEstimate) + ' FCFA';
  const formattedVenueOnly = new Intl.NumberFormat('fr-FR').format(venueEstimate) + ' FCFA';

  const selectedAddonLabels = selectedAddons
    .map((id) => t.simulator.addonsList.find((a) => a.id === id)?.label)
    .filter(Boolean);

  // Build pre-filled WhatsApp message in active language (FR or EN)
  const buildWhatsAppUrl = () => {
    const addonText =
      selectedAddonLabels.length > 0
        ? selectedAddonLabels.join(', ')
        : lang === 'fr'
        ? 'Location sèche uniquement'
        : 'Venue rental only';

    const message =
      lang === 'fr'
        ? `Bonjour La Roseraie d'Anne (Mvan, Yaoundé),\n\nJe souhaite vérifier la disponibilité et recevoir une proposition personnalisée :\n• Événement : ${activeEventObj.label}\n• Nombre d'invités : ${guests} personnes\n• Espace choisi : ${activeSpaceObj.name}\n• Prestations souhaitées : ${addonText}\n• Estimation simulée : ${formattedTotal}\n• Date souhaitée : ${eventDate || 'À définir'}\n• Nom : ${clientName || 'Client VIP'}\n• Téléphone : ${clientPhone || 'Via WhatsApp'}${notes ? `\n• Précisions : ${notes}` : ''}\n\nMerci de m'indiquer vos créneaux pour une visite privée du domaine.`
        : `Hello La Roseraie d'Anne (Mvan, Yaoundé),\n\nI would like to check availability and receive a bespoke proposal:\n• Event Type: ${activeEventObj.label}\n• Guest Count: ${guests} guests\n• Selected Space: ${activeSpaceObj.name}\n• Selected Services: ${addonText}\n• Simulated Estimate: ${formattedTotal}\n• Preferred Date: ${eventDate || 'TBD'}\n• Name: ${clientName || 'VIP Client'}\n• Phone: ${clientPhone || 'Via WhatsApp'}${notes ? `\n• Notes: ${notes}` : ''}\n\nPlease let me know your available slots for a private tour of the estate.`;

    return `${VENUE_CONTACT.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
  };

  const handleDownloadDossier = () => {
    const contentLines = [
      "==============================================================",
      "   LA ROSERAIE D'ANNE — DOMAINE DE RÉCEPTION (MVAN, YAOUNDÉ)  ",
      "==============================================================",
      "",
      `${lang === 'fr' ? 'DOSSIER DE CONFIGURATION SUR-MESURE' : 'BESPOKE EVENT CONFIGURATION DOSSIER'}`,
      `WhatsApp Conciergerie : ${VENUE_CONTACT.phoneDisplay}`,
      `Instagram : ${VENUE_CONTACT.instagramHandle}`,
      "",
      "--------------------------------------------------------------",
      `• ${lang === 'fr' ? 'Nature de la célébration' : 'Celebration Type'} : ${activeEventObj.label}`,
      `• ${lang === 'fr' ? 'Nombre de convives' : 'Estimated Guests'} : ${guests}`,
      `• ${lang === 'fr' ? 'Espace sélectionné' : 'Selected Space'} : ${activeSpaceObj.name}`,
      `• ${lang === 'fr' ? 'Options Clés en Main' : 'Turnkey Add-ons'} : ${
        selectedAddonLabels.length > 0 ? selectedAddonLabels.join(', ') : 'Aucune / None'
      }`,
      `• ${lang === 'fr' ? 'Date souhaitée' : 'Preferred Date'} : ${eventDate || 'Non renseignée'}`,
      `• ${lang === 'fr' ? 'Client' : 'Client Name'} : ${clientName || 'Client La Roseraie d’Anne'}`,
      "--------------------------------------------------------------",
      `${lang === 'fr' ? 'BUDGET INDICATIF SIMULÉ' : 'INDICATIVE SIMULATED ESTIMATE'} : ${formattedTotal}`,
      "--------------------------------------------------------------",
    ].join('\n');

    const blob = new Blob([contentLines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Devis-La-Roseraie-dAnne-${guests}-invites.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setBrochureAlert(true);
  };

  return (
    <section
      id="simulateur"
      className="py-20 lg:py-28 bg-parchment-grain border-b border-[#E5DEC9] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="font-cinzel text-xs tracking-[0.22em] text-[#681D54] font-semibold uppercase block">
            {t.simulator.eyebrow}
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#1A1318] leading-tight">
            {t.simulator.title}{' '}
            <span className="italic text-[#681D54] font-normal">{t.simulator.titleItalic}</span>
          </h2>
          <p className="text-base text-[#4A3E47] leading-relaxed">{t.simulator.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Interactive Controls */}
          <div className="lg:col-span-7 bg-white rounded-[28px] p-6 sm:p-9 border border-[#E5DEC9] shadow-[0_18px_40px_-18px_rgba(26,19,24,0.08)] space-y-8">
            {/* Step 1: Event Type */}
            <div className="space-y-3">
              <label className="block font-cinzel text-xs tracking-wider uppercase text-[#681D54] font-bold">
                {t.simulator.steps.eventType}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {t.simulator.eventTypes.map((ev) => {
                  const active = eventType === ev.id;
                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => setEventType(ev.id)}
                      className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        active
                          ? 'bg-[#681D54] text-white border-[#C5A065] shadow-sm'
                          : 'bg-[#FAF6F0] hover:bg-[#F3ECE1] text-[#1A1318] border-[#E5DEC9]'
                      }`}
                    >
                      <span>{ev.label}</span>
                      {active && <Check className="w-4 h-4 text-[#C5A065] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Guest Count Slider + Quick Pills */}
            <div className="space-y-3 pt-2 border-t border-[#F3ECE1]">
              <div className="flex items-center justify-between">
                <label className="font-cinzel text-xs tracking-wider uppercase text-[#681D54] font-bold">
                  {t.simulator.steps.guestCount}
                </label>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#681D54]/10 text-[#681D54] font-serif-editorial text-2xl font-bold">
                  <Users className="w-4 h-4" />
                  {guests} {lang === 'fr' ? 'invités' : 'guests'}
                </span>
              </div>

              <input
                type="range"
                min={50}
                max={800}
                step={25}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full roseraie-slider my-2"
                aria-label={t.simulator.steps.guestCount}
              />

              <div className="flex flex-wrap gap-2 pt-1">
                {t.simulator.guestPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setGuests(preset)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      guests === preset
                        ? 'bg-[#161115] text-[#C5A065] border-[#C5A065]'
                        : 'bg-[#FAF6F0] text-[#4A3E47] border-[#E5DEC9] hover:border-[#681D54]'
                    }`}
                  >
                    {preset} {lang === 'fr' ? 'pers.' : 'guests'}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Space Configuration */}
            <div className="space-y-3 pt-2 border-t border-[#F3ECE1]">
              <label className="block font-cinzel text-xs tracking-wider uppercase text-[#681D54] font-bold">
                {t.simulator.steps.spaceChoice}
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {t.simulator.spaces.map((sp) => {
                  const active = selectedSpace === sp.id;
                  return (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => setSelectedSpace(sp.id)}
                      className={`text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        active
                          ? 'bg-[#681D54]/8 border-[#681D54] ring-1 ring-[#681D54]'
                          : 'bg-[#FAF6F0] hover:bg-[#F3ECE1] border-[#E5DEC9]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Building2
                          className={`w-5 h-5 shrink-0 ${
                            active ? 'text-[#681D54]' : 'text-[#6E5D68]'
                          }`}
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#1A1318]">{sp.name}</p>
                          <p className="text-xs text-[#6E5D68]">{sp.cap}</p>
                        </div>
                      </div>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                          active
                            ? 'bg-[#681D54] border-[#681D54] text-white'
                            : 'border-[#C5A065]'
                        }`}
                      >
                        {active && <Check className="w-3 h-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Turnkey Add-ons */}
            <div className="space-y-3 pt-2 border-t border-[#F3ECE1]">
              <label className="block font-cinzel text-xs tracking-wider uppercase text-[#681D54] font-bold">
                {t.simulator.steps.addons}
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {t.simulator.addonsList.map((addon) => {
                  const checked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      role="checkbox"
                      aria-checked={checked}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleAddon(addon.id);
                        }
                      }}
                      className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                        checked
                          ? 'bg-[#F3ECE1] border-[#681D54]'
                          : 'bg-[#FAF6F0]/70 hover:bg-[#FAF6F0] border-[#E5DEC9]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center border shrink-0 ${
                            checked
                              ? 'bg-[#681D54] border-[#681D54] text-white'
                              : 'bg-white border-[#C5A065]'
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5" />}
                        </span>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-[#1A1318]">
                            {addon.label}
                          </p>
                          <p className="text-xs text-[#6E5D68]">{addon.desc}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-[#681D54] shrink-0">
                        {addon.perGuest > 0
                          ? `+${new Intl.NumberFormat('fr-FR').format(addon.perGuest)} /inv.`
                          : `+${new Intl.NumberFormat('fr-FR').format(addon.flat)}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Date & Client Info */}
            <div className="space-y-3 pt-2 border-t border-[#F3ECE1]">
              <label className="block font-cinzel text-xs tracking-wider uppercase text-[#681D54] font-bold">
                {t.simulator.steps.details}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={t.simulator.form.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#E5DEC9] text-sm text-[#1A1318] focus:outline-none focus:border-[#681D54]"
                />
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  aria-label={t.simulator.form.datePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#E5DEC9] text-sm text-[#1A1318] focus:outline-none focus:border-[#681D54]"
                />
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder={t.simulator.form.phonePlaceholder}
                  className="sm:col-span-2 w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#E5DEC9] text-sm text-[#1A1318] focus:outline-none focus:border-[#681D54]"
                />
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.simulator.form.notesPlaceholder}
                  className="sm:col-span-2 w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#E5DEC9] text-sm text-[#1A1318] focus:outline-none focus:border-[#681D54]"
                />
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Sticky Luxury Dossier Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 bg-velours-dark text-[#FAF6F0] rounded-[28px] p-6 sm:p-8 border-2 border-[#C5A065]/45 shadow-[0_25px_55px_-15px_rgba(26,19,24,0.35)] space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="font-cinzel text-[10px] tracking-[0.2em] text-[#C5A065] uppercase">
                  {t.simulator.summary.header}
                </p>
                <p className="font-serif-editorial text-2xl text-white mt-0.5">
                  La Roseraie d'Anne · Mvan
                </p>
              </div>
              <img
                src="/brand/logo-light.png"
                alt="La Roseraie d'Anne"
                className="h-9 w-auto object-contain opacity-95"
              />
            </div>

            {/* Live Selected Parameters */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-[#EDE5D8]/70">
                  {lang === 'fr' ? 'Célébration :' : 'Celebration:'}
                </span>
                <span className="font-semibold text-white text-right">{activeEventObj.label}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-[#EDE5D8]/70">
                  {lang === 'fr' ? 'Nombre de convives :' : 'Guest Count:'}
                </span>
                <span className="font-semibold text-[#C5A065]">
                  {guests} {lang === 'fr' ? 'invités' : 'guests'}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 py-1.5 border-b border-white/10">
                <span className="text-[#EDE5D8]/70 shrink-0">
                  {lang === 'fr' ? 'Espace :' : 'Space:'}
                </span>
                <span className="font-semibold text-white text-right">{activeSpaceObj.name}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-[#EDE5D8]/70">
                  {lang === 'fr' ? 'Base Domaine Estimée :' : 'Base Venue Estimate:'}
                </span>
                <span className="font-medium text-[#EDE5D8]">{formattedVenueOnly}</span>
              </div>

              {selectedAddonLabels.length > 0 && (
                <div className="py-1.5 border-b border-white/10 space-y-1.5">
                  <span className="text-[#C5A065] text-xs font-cinzel uppercase tracking-wider block">
                    {lang === 'fr' ? 'Options Clés en Main :' : 'Selected Enhancements:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedAddonLabels.map((lbl, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-[#681D54]/60 border border-[#C5A065]/30 text-[11px] text-white"
                      >
                        {lbl}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Total Estimate Box */}
            <div className="rounded-2xl bg-[#221720] border border-[#C5A065]/40 p-5 text-center space-y-1">
              <p className="font-cinzel text-[11px] tracking-[0.18em] text-[#C5A065] uppercase">
                {t.simulator.summary.estimatedRangeLabel}
              </p>
              <p className="font-serif-editorial text-3xl sm:text-4xl font-bold text-white">
                {formattedTotal}
              </p>
              <p className="text-[11px] text-[#EDE5D8]/70 pt-1">
                {t.simulator.summary.venueOnlyNote}
              </p>
            </div>

            {/* Complimentary Inclusions */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#C5A065] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.simulator.summary.includedTitle}</span>
              </p>
              <ul className="space-y-1.5 text-xs text-[#EDE5D8]/85">
                {t.simulator.summary.includedItems.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A065] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary WhatsApp & Download CTAs */}
            <div className="space-y-3 pt-2">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 px-5 rounded-full bg-[#681D54] hover:bg-[#7d2365] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 shadow-[0_10px_25px_-5px_rgba(104,29,84,0.65)] border border-[#C5A065]/50 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#C5A065]" />
                <span>{t.simulator.summary.whatsappCta}</span>
              </a>

              <button
                type="button"
                onClick={handleDownloadDossier}
                className="w-full py-3.5 px-5 rounded-full bg-white/10 hover:bg-white/15 text-[#FAF6F0] border border-[#C5A065]/35 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#C5A065]" />
                <span>{t.simulator.summary.brochureCta}</span>
              </button>

              {brochureAlert && (
                <div className="p-3 rounded-xl bg-[#1B3B2B]/80 border border-[#C5A065]/40 text-xs text-[#FAF6F0]">
                  {t.simulator.summary.brochureSentMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
