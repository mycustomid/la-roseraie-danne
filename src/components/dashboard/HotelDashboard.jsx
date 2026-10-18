import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  BedDouble,
  UtensilsCrossed,
  Receipt,
  ShieldCheck,
  Zap,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Filter,
  DollarSign,
  Phone,
  FileText,
  Printer,
  Share2,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  MapPin
} from 'lucide-react';
import { VENUE_CONTACT } from '../../data/venueData';

export default function HotelDashboard({ onBackToWebsite }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRoomFilter, setSelectedRoomFilter] = useState('all');
  const [newBookingModal, setNewBookingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Currency formatter for Central African Franc (FCFA / XAF)
  const formatXAF = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF', // Displays as CFA / FCFA
      maximumFractionDigits: 0,
    }).format(amount).replace('XOF', 'FCFA');
  };

  // Mock Estate Rooms & Suites Data
  const rooms = [
    {
      id: 'suite-imperiale',
      name: 'Suite Nuptiale Impériale (Anne)',
      type: 'Suite Prestige Événementielle',
      capacity: '2 adultes · Lit King Size 200x200',
      status: 'occupied',
      currentGuest: 'M. & Mme Ebanda (Mariage)',
      checkIn: '17 Oct 2026',
      checkOut: '19 Oct 2026',
      ratePerNight: 250000,
      amenities: ['Jacuzzi Privatif', 'Salon de Maquillage Mariée', 'Vue Roseraie', 'Service Majordome'],
    },
    {
      id: 'suite-rose',
      name: 'Suite Rose Poudrée',
      type: 'Suite VIP Étage',
      capacity: '2 adultes · Lit Queen Size',
      status: 'clean',
      currentGuest: null,
      checkIn: 'Prête',
      checkOut: 'Disponible',
      ratePerNight: 160000,
      amenities: ['Balcon Panoramique', 'Climatisation Inverter', 'Mini-bar Offert'],
    },
    {
      id: 'pavillon-jasmin',
      name: 'Pavillon Jasmin',
      type: 'Bungalow d\'Hôtes Rez-de-Jardin',
      capacity: '3 adultes · 1 Lit Double + 1 Simple',
      status: 'housekeeping',
      currentGuest: 'Famille Ngando (Arrivée 15h00)',
      checkIn: '18 Oct 2026 (15h)',
      checkOut: '21 Oct 2026',
      ratePerNight: 125000,
      amenities: ['Terrasse Ombragée', 'Accès Direct Bassin', 'Douche Italienne'],
    },
    {
      id: 'pavillon-flore',
      name: 'Pavillon Flore',
      type: 'Bungalow d\'Hôtes Piscine',
      capacity: '2 adultes · Lit Double',
      status: 'clean',
      currentGuest: null,
      checkIn: 'Prête',
      checkOut: 'Disponible',
      ratePerNight: 125000,
      amenities: ['Vue Miroir d\'Eau', 'Machine Nespresso', 'Wi-Fi Fibre Dédiée'],
    },
    {
      id: 'loge-mariee',
      name: 'Loge Boudoir Mariée (Dressing)',
      type: 'Loge de Préparatifs & Vestiaire VIP',
      capacity: 'Espace Styling 8 personnes',
      status: 'event-blocked',
      currentGuest: 'Réservé Samedi (Cortège Mariée)',
      checkIn: 'Samedi 07h00',
      checkOut: 'Samedi 18h00',
      ratePerNight: 100000,
      amenities: ['Miroirs Éclairés Hollywood', 'Portants Robes Cérémonie', 'Frigo Champagne'],
    },
  ];

  // Mock Events & Bookings Data
  const events = [
    {
      id: 'EVT-2026-089',
      title: 'Mariage Grand Standing · Ebanda & Fotso',
      type: 'Mariage Religieux & Soirée de Gala',
      space: 'Grande Roseraie + Pavillon d\'Anne',
      date: 'Samedi 25 Octobre 2026',
      guests: 650,
      clientName: 'Dr. Joseph Ebanda',
      clientPhone: '+237 6 77 12 34 56',
      totalCost: 14500000,
      paidDeposit: 8000000,
      status: 'confirmed',
      cateringMenu: 'Buffet Royal Camerounais (Ndolé, Koki, Bar Braisé)',
      decorTheme: 'Or Champagne & Aubergine Roseraie (Anash Events)',
    },
    {
      id: 'EVT-2026-090',
      title: 'Cérémonie de Dot Traditionnelle de Prestige',
      type: 'Célébration Coutumière',
      space: 'La Grande Roseraie (Pelouse Royale)',
      date: 'Dimanche 26 Octobre 2026',
      guests: 350,
      clientName: 'Mme Chantal Manga',
      clientPhone: '+237 6 99 45 67 89',
      totalCost: 7800000,
      paidDeposit: 4000000,
      status: 'confirmed',
      cateringMenu: 'Banquet Traditionnel Terroir & Grillades',
      decorTheme: 'Fleurs Sauvages & Tissus Raphia Nobles',
    },
    {
      id: 'EVT-2026-091',
      title: 'Séminaire Annuel & Dîner Diplomatique CEMAC',
      type: 'Conférence & Gala Corporate',
      space: 'Le Pavillon d\'Anne (Climatisé)',
      date: 'Jeudi 05 Novembre 2026',
      guests: 180,
      clientName: 'Délégation Régionale Afrique Centrale',
      clientPhone: '+237 6 55 88 99 00',
      totalCost: 9200000,
      paidDeposit: 9200000,
      status: 'fully-paid',
      cateringMenu: 'Menu Gastronomique International 4 Services',
      decorTheme: 'Minimalisme Corporate Haute Précision',
    },
    {
      id: 'EVT-2026-092',
      title: 'Cocktail VIP de Lancement Produit Cosmétique',
      type: 'Cocktail Dînatoire',
      space: 'Terrasse du Miroir d\'Eau',
      date: 'Samedi 14 Novembre 2026',
      guests: 220,
      clientName: 'Laboratoires Élixir Beauté',
      clientPhone: '+237 6 90 11 22 33',
      totalCost: 5500000,
      paidDeposit: 2500000,
      status: 'option',
      cateringMenu: 'Bouchées Salées & Bar à Cocktails Signature',
      decorTheme: 'Lumières Subaquatiques & Arches Roses Blanches',
    },
  ];

  // Filtered rooms
  const filteredRooms = rooms.filter((r) => {
    if (selectedRoomFilter === 'all') return true;
    return r.status === selectedRoomFilter;
  });

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#1E171D] font-sans">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-[#161115] text-[#FAF6F0] border-b border-[#C5A065]/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToWebsite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2A1D27] hover:bg-[#681D54] text-[#C5A065] text-xs font-semibold border border-[#C5A065]/40 transition-colors cursor-pointer"
            >
              <span>← Voir le Site Public</span>
            </button>
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#681D54] text-[#C5A065]">
                <Building2 className="w-4 h-4" />
              </span>
              <div>
                <h1 className="text-sm font-semibold tracking-wide flex items-center gap-1.5">
                  <span>LA ROSERAIE D'ANNE</span>
                  <span className="text-[10px] font-mono uppercase bg-[#C5A065]/20 text-[#C5A065] px-1.5 py-0.5 rounded">
                    ESTATE OS v1.0
                  </span>
                </h1>
                <p className="text-[11px] text-[#FAF6F0]/60 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#C5A065]" />
                  <span>Mvan, Yaoundé · Cameroun</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-[#FAF6F0]/80 bg-[#261B23] px-3 py-1.5 rounded-full border border-white/10">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Groupe Électrogène : <strong>100% OK</strong> (Auto-ATS)</span>
            </div>
            <button
              type="button"
              onClick={() => setNewBookingModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#681D54] hover:bg-[#521442] text-white text-xs font-semibold border border-[#C5A065]/50 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#C5A065]" />
              <span className="hidden sm:inline">Nouvelle Réservation</span>
              <span className="sm:hidden">Créer</span>
            </button>
          </div>
        </div>

        {/* Subnav Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'overview', label: 'Vue d\'Ensemble', icon: Building2 },
            { id: 'rooms', label: 'Suites & Chambres (5)', icon: BedDouble },
            { id: 'events', label: 'Calendrier & Événements', icon: Calendar },
            { id: 'catering', label: 'Banquets & Traiteur', icon: UtensilsCrossed },
            { id: 'billing', label: 'Devis & Facturation FCFA', icon: Receipt },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-[#681D54] text-white shadow-sm'
                    : 'text-[#EDE5D8]/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#C5A065]' : 'text-current'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* KPI Strip */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#DED4C0] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-[#6B5A66] font-medium">
              <span>Taux d'Occupation Suites</span>
              <BedDouble className="w-4 h-4 text-[#681D54]" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#1E171D]">80%</p>
            <p className="text-[11px] text-emerald-700 font-medium">4 suites / 5 occupées ou réservées</p>
          </div>

          <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#DED4C0] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-[#6B5A66] font-medium">
              <span>Événements ce Mois</span>
              <Calendar className="w-4 h-4 text-[#681D54]" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#1E171D]">12</p>
            <p className="text-[11px] text-[#6B5A66]">6 Mariages · 3 Dots · 3 Corporate</p>
          </div>

          <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#DED4C0] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-[#6B5A66] font-medium">
              <span>Chiffre d'Affaires Prévu</span>
              <DollarSign className="w-4 h-4 text-[#C5A065]" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-[#1E171D]">{formatXAF(37000000)}</p>
            <p className="text-[11px] text-emerald-700 font-medium">+22% vs mois précédent</p>
          </div>

          <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#DED4C0] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-[#6B5A66] font-medium">
              <span>Acomptes Reçus (Banque/OM)</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-[#1E171D]">{formatXAF(23700000)}</p>
            <p className="text-[11px] text-[#6B5A66]">Solde restant à percevoir : {formatXAF(13300000)}</p>
          </div>
        </section>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Actions & Live Alerts Banner */}
            <div className="bg-gradient-to-r from-[#161115] to-[#2E1A27] text-white p-5 rounded-2xl border border-[#C5A065]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#C5A065] tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Régie Domaine & Logistique Mvan</span>
                </span>
                <h2 className="text-lg sm:text-xl font-semibold">
                  Mariage Ebanda & Fotso · 650 Invités prévus ce Samedi
                </h2>
                <p className="text-xs text-white/70">
                  Vérification technique : Scénographie Anash Events en cours · Ravitaillement groupe 250 kVA validé · Parking 120 places préparé.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`tel:${VENUE_CONTACT.phoneRaw}`}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-2 border border-white/20"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A065]" />
                  <span>Régisseur Mvan</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveTab('billing')}
                  className="px-4 py-2 rounded-xl bg-[#681D54] hover:bg-[#521442] text-xs font-semibold flex items-center gap-2 border border-[#C5A065]/50 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C5A065]" />
                  <span>Voir la Facture</span>
                </button>
              </div>
            </div>

            {/* Grid 2 Columns: Suites status + Next Events */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Suites & Rooms Summary Card */}
              <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#DED4C0] space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <BedDouble className="w-4 h-4 text-[#681D54]" />
                    <span>Statut des Chambres & Suites (Mvan)</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('rooms')}
                    className="text-xs text-[#681D54] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Gérer tout</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-[#EADFCB]">
                  {rooms.slice(0, 4).map((room) => (
                    <div key={room.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <p className="font-semibold text-sm text-[#1E171D]">{room.name}</p>
                        <p className="text-[#6B5A66]">{room.capacity}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                            room.status === 'clean'
                              ? 'bg-emerald-100 text-emerald-800'
                              : room.status === 'occupied'
                              ? 'bg-purple-100 text-[#681D54]'
                              : room.status === 'housekeeping'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {room.status === 'clean'
                            ? 'Prête'
                            : room.status === 'occupied'
                            ? 'Occupée'
                            : room.status === 'housekeeping'
                            ? 'En Nettoyage'
                            : 'Bloquée'}
                        </span>
                        <p className="text-[11px] font-mono mt-0.5 text-[#1E171D] font-medium">
                          {formatXAF(room.ratePerNight)}/nuit
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Events Summary Card */}
              <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#DED4C0] space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#681D54]" />
                    <span>Prochaines Célébrations & Galas</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('events')}
                    className="text-xs text-[#681D54] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Planning complet</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {events.slice(0, 3).map((evt) => (
                    <div key={evt.id} className="p-3.5 rounded-xl bg-white border border-[#E5DEC9] space-y-1.5 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-sm text-[#1E171D] truncate">{evt.title}</span>
                        <span className="text-[10px] font-mono bg-[#681D54]/10 text-[#681D54] px-2 py-0.5 rounded font-semibold whitespace-nowrap">
                          {evt.guests} invités
                        </span>
                      </div>
                      <p className="text-[#6B5A66] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A065]" />
                        <span>{evt.space} · {evt.date}</span>
                      </p>
                      <div className="flex items-center justify-between pt-1 text-[11px]">
                        <span className="text-[#6B5A66]">Contact : {evt.clientName}</span>
                        <span className="font-mono font-bold text-[#681D54]">{formatXAF(evt.totalCost)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Rooms & Suites */}
        {activeTab === 'rooms' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#FAF6F0] p-4 rounded-2xl border border-[#DED4C0]">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {['all', 'clean', 'occupied', 'housekeeping', 'event-blocked'].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedRoomFilter(filter)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                      selectedRoomFilter === filter
                        ? 'bg-[#681D54] text-white shadow-sm'
                        : 'bg-white text-[#2D222A] border border-[#E5DEC9] hover:bg-[#F3ECE1]'
                    }`}
                  >
                    {filter === 'all'
                      ? 'Toutes les Chambres (5)'
                      : filter === 'clean'
                      ? 'Prêtes / Disponibles'
                      : filter === 'occupied'
                      ? 'Occupées'
                      : filter === 'housekeeping'
                      ? 'Nettoyage / Housekeeping'
                      : 'Bloquées Événement'}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#6B5A66] shrink-0 font-medium">
                Affichage : {filteredRooms.length} suite(s)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRooms.map((room) => (
                <div key={room.id} className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#DED4C0] shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-[#681D54] uppercase tracking-wider font-semibold">
                          {room.type}
                        </span>
                        <h4 className="font-bold text-base text-[#1E171D]">{room.name}</h4>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          room.status === 'clean'
                            ? 'bg-emerald-100 text-emerald-800'
                            : room.status === 'occupied'
                            ? 'bg-purple-100 text-[#681D54]'
                            : room.status === 'housekeeping'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {room.status === 'clean'
                          ? 'Prête'
                          : room.status === 'occupied'
                          ? 'Occupée'
                          : room.status === 'housekeeping'
                          ? 'Ménage'
                          : 'Bloquée'}
                      </span>
                    </div>

                    <p className="text-xs text-[#6B5A66]">{room.capacity}</p>

                    <div className="p-3 bg-white rounded-xl border border-[#E5DEC9] text-xs space-y-1">
                      <p className="text-[#1E171D] font-medium">
                        Occupant : {room.currentGuest || 'Aucun (Libre)'}
                      </p>
                      <p className="text-[#6B5A66] text-[11px]">
                        Séjour : {room.checkIn} → {room.checkOut}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {room.amenities.map((item, idx) => (
                        <span key={idx} className="text-[10px] bg-[#F3ECE1] text-[#2D222A] px-2 py-0.5 rounded-md">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E5DEC9] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#6B5A66] block leading-none">Tarif nuitée</span>
                      <span className="font-mono font-bold text-sm text-[#681D54]">{formatXAF(room.ratePerNight)}</span>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#C5A065]/50 hover:bg-[#681D54] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Détails / Clé
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Events & Bookings */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#DED4C0] flex items-center justify-between gap-3">
              <h3 className="font-bold text-base text-[#1E171D]">Calendrier des Événements & Privatisation</h3>
              <button
                type="button"
                onClick={() => setNewBookingModal(true)}
                className="px-3.5 py-2 rounded-xl bg-[#681D54] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5 text-[#C5A065]" />
                <span>Bloquer une Date</span>
              </button>
            </div>

            <div className="space-y-3">
              {events.map((evt) => (
                <div key={evt.id} className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#DED4C0] shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#681D54]">{evt.id}</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold uppercase text-[10px]">
                          {evt.status === 'fully-paid' ? '100% Réglé' : 'Acompte Validé (50%)'}
                        </span>
                      </div>
                      <h4 className="font-bold text-lg text-[#1E171D] mt-0.5">{evt.title}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#6B5A66] block">Montant Total Événement</span>
                      <span className="font-mono font-bold text-lg text-[#681D54]">{formatXAF(evt.totalCost)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-white p-3.5 rounded-xl border border-[#E5DEC9]">
                    <div>
                      <span className="text-[#6B5A66] block">Espace Réservé :</span>
                      <strong className="text-[#1E171D]">{evt.space}</strong>
                    </div>
                    <div>
                      <span className="text-[#6B5A66] block">Date de Célébration :</span>
                      <strong className="text-[#1E171D]">{evt.date}</strong>
                    </div>
                    <div>
                      <span className="text-[#6B5A66] block">Nombre d'Invités :</span>
                      <strong className="text-[#1E171D]">{evt.guests} personnes assises</strong>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1">
                    <div className="space-y-0.5 text-[#6B5A66]">
                      <p>Client : <strong>{evt.clientName}</strong> ({evt.clientPhone})</p>
                      <p>Formule Restauration : <em>{evt.cateringMenu}</em></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab('billing')}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#DED4C0] hover:bg-[#F3ECE1] text-xs font-semibold"
                      >
                        Facture & Reçu
                      </button>
                      <a
                        href={`https://wa.me/${evt.clientPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#1B3B2B] hover:bg-[#142d20] text-white text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Share2 className="w-3.5 h-3.5 text-[#C5A065]" />
                        <span>WhatsApp Client</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Catering & Banquets */}
        {activeTab === 'catering' && (
          <div className="space-y-4">
            <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#DED4C0] space-y-3 shadow-sm">
              <h3 className="font-bold text-base text-[#1E171D]">Gestion des Banquets & Restauration Haute Gastronomie</h3>
              <p className="text-xs text-[#6B5A66]">
                Menus officiels servis au Domaine de Réception La Roseraie d'Anne avec notre brigade traiteur et partenaires gastronomiques de Yaoundé.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-white rounded-xl border border-[#E5DEC9] space-y-2 text-xs">
                  <span className="text-[10px] font-mono text-[#C5A065] uppercase font-bold">Formule Prestige</span>
                  <h4 className="font-bold text-sm text-[#1E171D]">Buffet Royal Camerounais</h4>
                  <p className="text-[#6B5A66]">
                    Ndolé royal aux gambas et viande fumée, Koki blanc à l'huile rouge noble, Bar géant braisé de Kribi, Alloco et plantains tapés.
                  </p>
                  <p className="font-mono font-bold text-[#681D54] pt-2">25.000 FCFA / convive</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#E5DEC9] space-y-2 text-xs">
                  <span className="text-[10px] font-mono text-[#C5A065] uppercase font-bold">Formule Diplomatique</span>
                  <h4 className="font-bold text-sm text-[#1E171D]">Menu Dîner de Gala International</h4>
                  <p className="text-[#6B5A66]">
                    Foie gras poêlé aux mangues caramélisées, Filet de bœuf sauce poivre de Penja, Mousseline de patates douces, Symphonie de macarons et roses.
                  </p>
                  <p className="font-mono font-bold text-[#681D54] pt-2">35.000 FCFA / convive</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#E5DEC9] space-y-2 text-xs">
                  <span className="text-[10px] font-mono text-[#C5A065] uppercase font-bold">Formule Sunset & Bassin</span>
                  <h4 className="font-bold text-sm text-[#1E171D]">Cocktail Dînatoire Chic (25 Pièces)</h4>
                  <p className="text-[#6B5A66]">
                    Brochettes de gambas marinées, Minis brochettes de soya gourmet, Verrines avocat crabe, Coupe de champagne de bienvenue.
                  </p>
                  <p className="font-mono font-bold text-[#681D54] pt-2">18.500 FCFA / convive</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Billing & Invoices */}
        {activeTab === 'billing' && (
          <div className="space-y-4">
            <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#DED4C0] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5DEC9] pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#681D54] uppercase font-semibold">
                    Document Comptable Officiel
                  </span>
                  <h3 className="font-serif-editorial text-2xl font-bold text-[#1E171D]">
                    Facture Proforma / Devis N° FAC-2026-089
                  </h3>
                  <p className="text-xs text-[#6B5A66]">
                    Émis pour le Mariage Dr. Joseph Ebanda & Mlle Sandra Fotso
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#DED4C0] text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:bg-[#F3ECE1] cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimer / PDF</span>
                  </button>
                  <a
                    href="https://wa.me/237699906075?text=Voici%20le%20r%C3%A9sum%C3%A9%20de%20la%20facture%20La%20Roseraie%20d'Anne"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-[#681D54] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:bg-[#521442]"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#C5A065]" />
                    <span>Partager WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Invoice Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#E5DEC9] flex justify-between items-center">
                  <span>Privatisation Totale du Domaine (Grande Roseraie + Pavillon d'Anne + Loge Mariée)</span>
                  <strong className="font-mono text-[#1E171D]">{formatXAF(5500000)}</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E5DEC9] flex justify-between items-center">
                  <span>Buffet Royal Camerounais (650 convives x 12.000 FCFA avec service brigade)</span>
                  <strong className="font-mono text-[#1E171D]">{formatXAF(7800000)}</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E5DEC9] flex justify-between items-center">
                  <span>Scénographie Florale & Décoration Royale (Anash Events & Interior Design)</span>
                  <strong className="font-mono text-[#1E171D]">{formatXAF(2500000)}</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E5DEC9] flex justify-between items-center">
                  <span>Sécurité Mvan, Voiturier (120 véhicules) & Groupe Électrogène 250 kVA (Zéro Coupure)</span>
                  <strong className="font-mono text-[#1E171D]">{formatXAF(700000)}</strong>
                </div>

                <div className="p-4 bg-[#F3ECE1] rounded-xl border border-[#DED4C0] space-y-1.5 text-xs mt-3">
                  <div className="flex justify-between">
                    <span className="text-[#6B5A66]">Total Prestations Événement</span>
                    <strong className="font-mono text-sm text-[#1E171D]">{formatXAF(16500000)}</strong>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Acompte Perçu (Virement Bancaire + Mobile Money)</span>
                    <strong className="font-mono">- {formatXAF(9000000)}</strong>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#681D54] pt-2 border-t border-[#DED4C0]">
                    <span>Reste à Payer (Solde avant installation)</span>
                    <span className="font-mono">{formatXAF(7500000)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* New Booking Modal */}
      {newBookingModal && (
        <div className="fixed inset-0 z-50 bg-[#161115]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF6F0] border-2 border-[#C5A065]/50 rounded-[28px] max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#1E171D]">Nouvelle Réservation Événement / Chambre</h3>
              <button
                type="button"
                onClick={() => setNewBookingModal(false)}
                className="text-xs p-1 text-[#6B5A66] hover:text-[#1E171D]"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Nom du Client / Organisation</label>
                <input type="text" placeholder="ex: Famille Mbarga" className="w-full p-2.5 rounded-lg border bg-white border-[#E5DEC9]" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Numéro Téléphone / WhatsApp</label>
                <input type="text" placeholder="+237 6..." className="w-full p-2.5 rounded-lg border bg-white border-[#E5DEC9]" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Type de Réservation</label>
                  <select className="w-full p-2.5 rounded-lg border bg-white border-[#E5DEC9]">
                    <option>Mariage / Célébration</option>
                    <option>Cérémonie de Dot</option>
                    <option>Séminaire Corporate</option>
                    <option>Nuitée Suite Seule</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Date Souhaitée</label>
                  <input type="date" className="w-full p-2.5 rounded-lg border bg-white border-[#E5DEC9]" />
                </div>
              </div>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  alert('Réservation enregistrée dans le registre local du Domaine !');
                  setNewBookingModal(false);
                }}
                className="w-full py-3 rounded-full bg-[#681D54] hover:bg-[#521442] text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Valider & Bloquer la Date
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
