import React, { useState } from 'react';
import { MessageCircle, X, Calendar, MapPin, Phone, Sparkles } from 'lucide-react';
import { CONTENT, VENUE_CONTACT } from './data/venueData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EspritSection from './components/EspritSection';
import SpacesExplorer from './components/SpacesExplorer';
import CelebrationsAndServices from './components/CelebrationsAndServices';
import QuoteSimulator from './components/QuoteSimulator';
import GalleryAndSocialProof from './components/GalleryAndSocialProof';

export default function App() {
  // Default strictly to French ('fr') per Bos's directive
  const [lang, setLang] = useState('fr');
  const [selectedSpace, setSelectedSpace] = useState('privatisation');
  const [selectedAddons, setSelectedAddons] = useState(['traiteur', 'decor']);
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [tourName, setTourName] = useState('');
  const [tourDate, setTourDate] = useState('');
  const [tourType, setTourType] = useState('sur-place');

  const t = CONTENT[lang] || CONTENT.fr;

  const handleAddServiceToSimulator = (addonId) => {
    setSelectedAddons((prev) => (prev.includes(addonId) ? prev : [...prev, addonId]));
  };

  const getFloatingWhatsAppUrl = () => {
    const msg =
      lang === 'fr'
        ? "Bonjour La Roseraie d'Anne, je visite votre site web et je souhaite obtenir des informations sur la privatisation du domaine à Mvan, Yaoundé."
        : "Hello La Roseraie d'Anne, I am visiting your website and would like information about booking the estate in Mvan, Yaoundé.";
    return `${VENUE_CONTACT.whatsappBaseUrl}?text=${encodeURIComponent(msg)}`;
  };

  const getTourModalWhatsAppUrl = () => {
    const modeLabel =
      tourType === 'video'
        ? lang === 'fr'
          ? 'Visite Vidéo WhatsApp en Direct (Diaspora)'
          : 'Live WhatsApp Video Walkthrough (Diaspora)'
        : lang === 'fr'
        ? 'Visite Privée sur Place à Mvan, Yaoundé'
        : 'In-Person Private Tour in Mvan, Yaoundé';

    const msg =
      lang === 'fr'
        ? `Bonjour La Roseraie d'Anne,\n\nJe souhaite réserver une *${modeLabel}* :\n• Nom : ${tourName || 'Client VIP'}\n• Date de visite souhaitée : ${tourDate || 'Cette semaine'}\n\nMerci de me confirmer le créneau.`
        : `Hello La Roseraie d'Anne,\n\nI would like to book a *${modeLabel}*:\n• Name: ${tourName || 'VIP Client'}\n• Preferred Tour Date: ${tourDate || 'This week'}\n\nPlease confirm the time slot.`;

    return `${VENUE_CONTACT.whatsappBaseUrl}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#1A1318]">
      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        onOpenTourModal={() => setTourModalOpen(true)}
      />

      <main className="flex-1">
        <Hero t={t} onOpenTourModal={() => setTourModalOpen(true)} />
        <EspritSection t={t} />
        <SpacesExplorer
          t={t}
          lang={lang}
          onSelectSpaceForSimulator={(spaceId) => setSelectedSpace(spaceId)}
        />
        <CelebrationsAndServices
          t={t}
          lang={lang}
          onAddServiceToSimulator={handleAddServiceToSimulator}
        />
        <QuoteSimulator
          t={t}
          lang={lang}
          selectedSpace={selectedSpace}
          setSelectedSpace={setSelectedSpace}
          selectedAddons={selectedAddons}
          setSelectedAddons={setSelectedAddons}
        />
        <GalleryAndSocialProof
          t={t}
          lang={lang}
          onOpenTourModal={() => setTourModalOpen(true)}
        />
      </main>

      {/* Floating Bottom-Right WhatsApp Concierge Button (+237 6 99 90 60 75) */}
      <a
        href={getFloatingWhatsAppUrl()}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp Concierge +237 6 99 90 60 75"
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 group flex items-center gap-2 sm:gap-2.5 px-3.5 py-2.5 sm:pl-4 sm:pr-5 sm:py-3.5 rounded-full bg-[#1B3B2B] hover:bg-[#142d20] text-white shadow-[0_14px_34px_-6px_rgba(27,59,43,0.65)] border border-[#C5A065]/60 transition-all hover:-translate-y-0.5"
      >
        <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A065] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#C5A065]" />
        </span>
        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5A065]" />
        <div className="text-left">
          <p className="hidden sm:block text-[10px] font-cinzel tracking-wider uppercase text-[#C5A065] leading-none">
            {lang === 'fr' ? 'Conciergerie Directe' : 'Direct Concierge'}
          </p>
          <p className="text-[11px] sm:text-xs font-semibold leading-tight sm:mt-0.5">
            {VENUE_CONTACT.phoneDisplay}
          </p>
        </div>
      </a>

      {/* Private Tour Booking Modal */}
      {tourModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#161115]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF6F0] border-2 border-[#C5A065]/50 rounded-[28px] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-5">
            <button
              type="button"
              onClick={() => setTourModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#F3ECE1] hover:bg-[#681D54] text-[#1A1318] hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5">
              <span className="font-cinzel text-[11px] tracking-[0.2em] uppercase text-[#681D54] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A065]" />
                <span>LA ROSERAIE D'ANNE · MVAN, YAOUNDÉ</span>
              </span>
              <h3 className="font-serif-editorial text-3xl text-[#1A1318] font-semibold">
                {lang === 'fr'
                  ? 'Planifier une Visite Privée'
                  : 'Schedule a Private Estate Tour'}
              </h3>
              <p className="text-xs sm:text-sm text-[#4A3E47]">
                {lang === 'fr'
                  ? 'Choisissez entre une visite sur place à Mvan avec notre régisseur ou une visite vidéo WhatsApp en direct.'
                  : 'Choose between an in-person tour in Mvan with our estate manager or a live WhatsApp video walkthrough.'}
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setTourType('sur-place')}
                  className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    tourType === 'sur-place'
                      ? 'bg-[#681D54] text-white border-[#C5A065]'
                      : 'bg-white text-[#1A1318] border-[#E5DEC9]'
                  }`}
                >
                  {lang === 'fr' ? 'Visite sur Place (Mvan)' : 'In-Person Tour (Mvan)'}
                </button>
                <button
                  type="button"
                  onClick={() => setTourType('video')}
                  className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    tourType === 'video'
                      ? 'bg-[#681D54] text-white border-[#C5A065]'
                      : 'bg-white text-[#1A1318] border-[#E5DEC9]'
                  }`}
                >
                  {lang === 'fr' ? 'Visite Vidéo (Diaspora)' : 'Live Video Tour'}
                </button>
              </div>

              <input
                type="text"
                value={tourName}
                onChange={(e) => setTourName(e.target.value)}
                placeholder={
                  lang === 'fr' ? 'Votre nom complet' : 'Your full name'
                }
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5DEC9] text-sm"
              />

              <input
                type="date"
                value={tourDate}
                onChange={(e) => setTourDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5DEC9] text-sm"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-[#F3ECE1] border border-[#E5DEC9] text-xs space-y-1 text-[#2D222A]">
              <div className="flex items-center gap-2 font-semibold text-[#681D54]">
                <MapPin className="w-3.5 h-3.5" />
                <span>{VENUE_CONTACT.neighborhood}, {VENUE_CONTACT.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#681D54]" />
                <span>Direct & WhatsApp : {VENUE_CONTACT.phoneDisplay}</span>
              </div>
            </div>

            <a
              href={getTourModalWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 rounded-full bg-[#681D54] hover:bg-[#521442] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg border border-[#C5A065]/40"
            >
              <Calendar className="w-4 h-4 text-[#C5A065]" />
              <span>
                {lang === 'fr'
                  ? 'Confirmer le Rendez-Vous sur WhatsApp'
                  : 'Confirm Appointment on WhatsApp'}
              </span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
