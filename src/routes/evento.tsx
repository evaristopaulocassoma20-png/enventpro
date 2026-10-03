import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Calendar,
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  MessageSquare,
  Play,
  Ticket,
  User,
  Users,
  Video,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { update, uid } from "@/lib/demo-store";

import heroImage from "@/assets/eventpro-hero.jpg";
import stageImage from "@/assets/sobre-stage.jpg";
import mapaImage from "@/assets/contacto-mapa.jpg";
import martaImage from "@/assets/team-marta.jpg";
import carlosImage from "@/assets/team-carlos.jpg";
import patriciaImage from "@/assets/team-patricia.jpg";
import evaristoImage from "@/assets/team-evaristo.jpg";

export const Route = createFileRoute("/evento")({
  head: () => ({
    meta: [
      { title: "Conferência de Negócios 2026 — EventPro" },
      {
        name: "description",
        content:
          "Conferência de Negócios 2026. Conectando ideias, gerando oportunidades. 15 - 16 Nov 2026 no Centro de Convenções de Luanda.",
      },
      { property: "og:title", content: "Conferência de Negócios 2026 — EventPro" },
      {
        property: "og:description",
        content: "Conectando ideias, gerando oportunidades. O maior evento de negócios de Angola.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: EventoPublicoPage,
});

function BrandMark() {
  return (
    <span className="brand-mark inline-flex items-center gap-1" aria-hidden="true">
      <span className="h-4 w-1.5 -skew-x-12 rounded-sm bg-[#0084FF]" />
      <span className="h-5 w-1.5 -skew-x-12 rounded-sm bg-[#0084FF]" />
      <span className="h-4 w-1.5 -skew-x-12 rounded-sm bg-[#0084FF]" />
    </span>
  );
}

export function EventoPublicoPage() {
  // Countdown Timer exactly as in pagina.png: 12 Dias 06 Horas 34 Min 22 Seg
  const [timeLeft, setTimeLeft] = useState({
    dias: 12,
    horas: 6,
    min: 34,
    seg: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seg > 0) {
          return { ...prev, seg: prev.seg - 1 };
        } else if (prev.min > 0) {
          return { ...prev, min: prev.min - 1, seg: 59 };
        } else if (prev.horas > 0) {
          return { ...prev, horas: prev.horas - 1, min: 59, seg: 59 };
        } else if (prev.dias > 0) {
          return { ...prev, dias: prev.dias - 1, horas: 23, min: 59, seg: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Programação tab state
  const [activeDia, setActiveDia] = useState<"15" | "16">("15");

  // Inscrição Modal state
  const [isInscricaoOpen, setIsInscricaoOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [ticketType, setTicketType] = useState<"Geral" | "VIP">("Geral");
  const [inscricaoForm, setInscricaoForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInscricao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inscricaoForm.nome || !inscricaoForm.email || !inscricaoForm.telefone) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      update(
        inscricaoForm.nome,
        `Inscrição confirmada na Conferência de Negócios 2026 (${ticketType})`,
        (d) => {
          const org = d.orgs[0];
          if (org && org.eventos[0]) {
            org.eventos[0].participantes.unshift({
              id: uid(),
              nome: inscricaoForm.nome,
              email: inscricaoForm.email,
              tipo: "Visitante",
              bilhete: ticketType,
              status: "Confirmado",
            });
          }
        }
      );
    } catch (err) {
      console.error(err);
    }

    setIsSuccess(true);
    toast.success("Inscrição realizada com sucesso! O seu bilhete digital foi gerado.");
  };

  const resetInscricao = () => {
    setIsInscricaoOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setInscricaoForm({ nome: "", email: "", telefone: "", empresa: "" });
    }, 300);
  };

  // 5 Speakers matching pagina.png exactly
  const palestrantes = [
    {
      nome: "Ana Silva",
      cargo: "CEO - Tech Angola",
      tag: "Tecnologia",
      img: martaImage,
    },
    {
      nome: "Carlos Mendes",
      cargo: "Diretor - Banca & Finanças",
      tag: "Finanças",
      img: carlosImage,
    },
    {
      nome: "Juliana Souza",
      cargo: "Especialista em Inovação",
      tag: "Inovação",
      img: patriciaImage,
    },
    {
      nome: "Rafael Nunes",
      cargo: "Consultor de Negócios",
      tag: "Negócios",
      img: evaristoImage,
    },
    {
      nome: "Beatriz Costa",
      cargo: "CEO - StartUp Angola",
      tag: "Empreendedorismo",
      img: martaImage,
      filter: "hue-rotate-15 contrast-105",
    },
  ];

  return (
    <div className="min-h-screen bg-[#01040f] text-slate-100 font-sans selection:bg-[#0080FF] selection:text-white">
      {/* 1. Header / Navbar matching pagina.png */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#020614]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5" aria-label="EventPro — início">
            <BrandMark />
            <span className="text-xl font-black tracking-tight text-white">
              Event<span className="text-[#0084FF]">Pro</span>
            </span>
          </Link>

          {/* Navigation links */}
          <nav className="hidden items-center gap-7 text-xs font-semibold text-slate-300 lg:flex">
            <a
              href="#inicio"
              className="rounded-md bg-blue-600/20 px-3 py-1.5 text-[#0084FF] transition-colors"
            >
              Início
            </a>
            <a href="#sobre" className="hover:text-white transition-colors">
              Sobre o Evento
            </a>
            <a href="#palestrantes" className="hover:text-white transition-colors">
              Palestrantes
            </a>
            <a href="#programacao" className="hover:text-white transition-colors">
              Programação
            </a>
            <a href="#galeria" className="hover:text-white transition-colors">
              Galeria
            </a>
            <a href="#localizacao" className="hover:text-white transition-colors">
              Localização
            </a>
          </nav>

          {/* Right action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsInscricaoOpen(true)}
              className="rounded-lg bg-[#0080FF] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-[#0070e0] active:scale-95"
            >
              Inscrever-se
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300">
              <User size={16} />
            </div>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with Event Details & Countdown floating card */}
      <section id="inicio" className="relative min-h-[580px] overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24">
        {/* Real conference stage background matching pagina.png */}
        <img
          src={heroImage}
          alt="Conferência de Negócios 2026"
          className="absolute inset-0 h-full w-full object-cover filter brightness-[0.34] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#01040f] via-[#01040f]/60 to-transparent" />
        <div className="absolute inset-0 bg-radial from-blue-600/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-950/70 px-3.5 py-1 text-[11px] font-bold text-[#0084FF] backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#0084FF]" />
                <span className="tracking-wider">CONFERÊNCIA</span>
              </div>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] leading-[1.08]">
                Conferência de <br />
                Negócios 2026
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-200 font-medium">
                Conectando ideias, gerando oportunidades.
              </p>

              {/* Event Metadata row */}
              <div className="mt-6 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-500/40 bg-blue-950/70 text-[#0084FF]">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-white">15 - 16 Nov 2026</div>
                    <div className="text-[11px] text-slate-400">08:00 - 18:00</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-500/40 bg-blue-950/70 text-[#0084FF]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-white">Centro de Convenções de Luanda</div>
                    <div className="text-[11px] text-slate-400">Luanda, Angola</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsInscricaoOpen(true)}
                  className="flex items-center gap-2 rounded-lg bg-[#0080FF] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-[#0070e0] active:scale-95 cursor-pointer"
                >
                  Inscrever-se Agora <ArrowRight size={16} />
                </button>

                <a
                  href="#programacao"
                  className="rounded-lg border border-slate-700 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-slate-500 hover:bg-slate-800/60 backdrop-blur-md"
                >
                  Ver Programação
                </a>
              </div>
            </div>

            {/* Right: Floating Countdown Card matching pagina.png */}
            <div className="mx-auto w-full max-w-[380px]">
              <div className="rounded-2xl border border-blue-500/40 bg-[#040e24]/90 p-6 sm:p-7 shadow-[0_0_60px_rgba(0,112,243,0.35)] backdrop-blur-xl">
                <h3 className="text-center text-xs font-semibold text-slate-300">
                  Evento começa em
                </h3>

                <div className="mt-5 grid grid-cols-4 gap-2.5 text-center">
                  {/* Dias */}
                  <div className="rounded-xl border border-slate-800 bg-[#061129] py-3.5 px-2">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">
                      {String(timeLeft.dias).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[10px] uppercase font-semibold text-slate-400">
                      Dias
                    </div>
                  </div>

                  {/* Horas */}
                  <div className="rounded-xl border border-slate-800 bg-[#061129] py-3.5 px-2">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">
                      {String(timeLeft.horas).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[10px] uppercase font-semibold text-slate-400">
                      Horas
                    </div>
                  </div>

                  {/* Min */}
                  <div className="rounded-xl border border-slate-800 bg-[#061129] py-3.5 px-2">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">
                      {String(timeLeft.min).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[10px] uppercase font-semibold text-slate-400">
                      Min
                    </div>
                  </div>

                  {/* Seg */}
                  <div className="rounded-xl border border-slate-800 bg-[#061129] py-3.5 px-2">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">
                      {String(timeLeft.seg).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[10px] uppercase font-semibold text-slate-400">
                      Seg
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Metrics Bar matching pagina.png */}
      <section className="border-y border-slate-800/80 bg-[#030818] py-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {/* Metric 1 */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                <Users size={20} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">2.480</div>
                <div className="text-xs text-slate-400">Participantes</div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                <User size={20} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">+50</div>
                <div className="text-xs text-slate-400">Palestrantes</div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                <CalendarDays size={20} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">40</div>
                <div className="text-xs text-slate-400">Expositores</div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                <Users size={20} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">12</div>
                <div className="text-xs text-slate-400">Workshops</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "Sobre o Evento" matching pagina.png */}
      <section id="sobre" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16 items-center">
            {/* Left Column */}
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Sobre o Evento</h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
                A Conferência de Negócios 2026 é o maior encontro de líderes, empreendedores e
                profissionais de negócios para debater o futuro da economia e da inovação.
              </p>
              <a
                href="#programacao"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#0084FF] hover:text-blue-300 transition-colors"
              >
                Saiba mais <ArrowRight size={15} />
              </a>
            </div>

            {/* Right Column: Stage Image with centered glowing Play button */}
            <div
              onClick={() => setIsVideoOpen(true)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-blue-500/40 shadow-2xl"
            >
              <img
                src={stageImage}
                alt="Vídeo da Conferência de Negócios"
                className="aspect-[16/9] w-full object-cover filter brightness-75 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-950/30 group-hover:bg-blue-950/10 transition-colors" />

              {/* Glowing Play Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0080FF]/90 text-white shadow-[0_0_35px_rgba(0,128,255,0.8)] transition-transform group-hover:scale-110">
                  <Play size={26} className="ml-1 fill-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "Palestrantes em Destaque" matching pagina.png */}
      <section id="palestrantes" className="border-t border-slate-800/80 py-16 lg:py-24 bg-[#020716]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Palestrantes em Destaque
            </h2>
            <a
              href="#palestrantes"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0084FF] hover:text-blue-300 transition-colors"
            >
              Ver todos <ArrowRight size={14} />
            </a>
          </div>

          {/* 5 Speaker cards with rectangular photo at top matching pagina.png */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {palestrantes.map((speaker) => (
              <div
                key={speaker.nome}
                className="group overflow-hidden rounded-2xl border border-slate-800 bg-[#050d22] transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img
                    src={speaker.img}
                    alt={speaker.nome}
                    className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                      speaker.filter || ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050d22] via-transparent to-transparent opacity-60" />
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-white">{speaker.nome}</h3>
                  <p className="mt-0.5 text-[11px] text-slate-400">{speaker.cargo}</p>
                  <div className="mt-3">
                    <span className="inline-block rounded-md bg-blue-600/25 px-2.5 py-1 text-[10px] font-semibold text-[#0084FF] border border-blue-500/30">
                      {speaker.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. "Programação" & "Localização" Side-by-Side matching pagina.png */}
      <section id="programacao" className="border-t border-slate-800/80 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            {/* Left Column: Programação */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Programação</h2>
                <a
                  href="#programacao"
                  className="text-xs font-bold text-[#0084FF] hover:text-blue-300 transition-colors"
                >
                  Ver toda a programação →
                </a>
              </div>

              {/* Day filter buttons */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveDia("15")}
                  className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                    activeDia === "15"
                      ? "bg-[#0080FF] text-white shadow-md shadow-blue-500/30"
                      : "border border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  Dia 15 Nov
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDia("16")}
                  className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                    activeDia === "16"
                      ? "bg-[#0080FF] text-white shadow-md shadow-blue-500/30"
                      : "border border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  Dia 16 Nov
                </button>
              </div>

              {/* Timeline with blue vertical line and dots matching pagina.png */}
              <div className="mt-8 space-y-6 relative border-l-2 border-blue-600/40 pl-6 ml-3">
                {activeDia === "15" ? (
                  <>
                    <div className="relative">
                      <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-blue-500 bg-[#0084FF] shadow-[0_0_10px_rgba(0,132,255,0.7)]" />
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs font-bold text-[#0084FF]">08:00</span>
                        <div>
                          <h4 className="text-sm font-bold text-white">Abertura e boas-vindas</h4>
                          <p className="text-xs text-slate-400">Auditório Principal</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-blue-500 bg-[#0084FF] shadow-[0_0_10px_rgba(0,132,255,0.7)]" />
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs font-bold text-[#0084FF]">09:00</span>
                        <div>
                          <h4 className="text-sm font-bold text-white">O futuro da economia digital</h4>
                          <p className="text-xs text-slate-400">Auditório Principal</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-blue-500 bg-[#0084FF] shadow-[0_0_10px_rgba(0,132,255,0.7)]" />
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs font-bold text-[#0084FF]">10:30</span>
                        <div>
                          <h4 className="text-sm font-bold text-white">Coffee Break & Networking</h4>
                          <p className="text-xs text-slate-400">Área de Exposições</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-blue-500 bg-[#0084FF] shadow-[0_0_10px_rgba(0,132,255,0.7)]" />
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs font-bold text-[#0084FF]">11:00</span>
                        <div>
                          <h4 className="text-sm font-bold text-white">Painel: Inovação e Tecnologia</h4>
                          <p className="text-xs text-slate-400">Auditório Principal</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-blue-500 bg-[#0084FF] shadow-[0_0_10px_rgba(0,132,255,0.7)]" />
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs font-bold text-[#0084FF]">09:00</span>
                        <div>
                          <h4 className="text-sm font-bold text-white">Sessão Plenária: Finanças e Investimento</h4>
                          <p className="text-xs text-slate-400">Auditório Principal</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-blue-500 bg-[#0084FF] shadow-[0_0_10px_rgba(0,132,255,0.7)]" />
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs font-bold text-[#0084FF]">11:30</span>
                        <div>
                          <h4 className="text-sm font-bold text-white">Mesas Redondas com Investidores</h4>
                          <p className="text-xs text-slate-400">Salas Temáticas A & B</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-blue-500 bg-[#0084FF] shadow-[0_0_10px_rgba(0,132,255,0.7)]" />
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs font-bold text-[#0084FF]">15:00</span>
                        <div>
                          <h4 className="text-sm font-bold text-white">Cerimónia de Encerramento e Prémios</h4>
                          <p className="text-xs text-slate-400">Auditório Principal</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Localização Card matching pagina.png */}
            <div id="localizacao" className="rounded-2xl border border-slate-800 bg-[#050c20] p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <MapPin size={18} className="text-[#0084FF]" />
                  <span>Localização</span>
                </div>

                {/* Map illustration with central red pin */}
                <div className="mt-4 relative overflow-hidden rounded-xl border border-slate-700/80 aspect-[16/9] bg-[#0c1836]">
                  <img
                    src={mapaImage}
                    alt="Mapa do Centro de Convenções de Luanda"
                    className="h-full w-full object-cover filter brightness-90"
                  />
                  {/* Central Red Marker Pin */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-xl animate-bounce">
                      <MapPin size={18} />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-bold text-white">Centro de Convenções de Luanda</h4>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin size={12} className="text-[#0084FF]" />
                    <span>Luanda, Angola</span>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 py-2.5 text-xs font-semibold text-white transition-colors hover:border-slate-500 hover:bg-slate-800"
              >
                Ver no Google Maps <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom CTA Bar matching pagina.png */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-blue-900/60 bg-gradient-to-r from-[#040e26] via-[#071536] to-[#05112a] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/80 text-[#0084FF] shadow-[0_0_20px_rgba(0,132,255,0.3)]">
                <MessageSquare size={22} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  Faça parte deste grande evento!
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  Inscreva-se agora e garanta o seu lugar na Conferência de Negócios 2026.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsInscricaoOpen(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#0080FF] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-[#0070e0] sm:self-center cursor-pointer active:scale-95"
            >
              Inscrever-se Agora <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 8. Footer matching pagina.png */}
      <footer className="border-t border-slate-800/80 bg-[#01040e] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-6 sm:flex-row text-xs text-slate-400">
          {/* Left: Brand & Slogan */}
          <div className="flex items-center gap-3">
            <BrandMark />
            <span>
              <span className="block text-sm font-extrabold text-white">
                Event<span className="text-[#0084FF]">Pro</span>
              </span>
              <span className="block text-[10px] text-slate-500">
                Eventos que conectam pessoas e negócios
              </span>
            </span>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-6">
            <Link to="/contactos" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <span className="text-slate-700">|</span>
            <Link to="/contactos" className="hover:text-white transition-colors">
              Política de Privacidade
            </Link>
            <span className="text-slate-700">|</span>
            <Link to="/contactos" className="hover:text-white transition-colors">
              Contacto
            </Link>
          </div>

          {/* Right Social Icons */}
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#facebook" className="hover:text-[#0084FF] transition-colors" aria-label="Facebook">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#instagram" className="hover:text-[#0084FF] transition-colors" aria-label="Instagram">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#linkedin" className="hover:text-[#0084FF] transition-colors" aria-label="LinkedIn">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="#youtube" className="hover:text-[#0084FF] transition-colors" aria-label="YouTube">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* INSCRIÇÃO MODAL */}
      {isInscricaoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="relative my-8 w-full max-w-lg rounded-2xl border border-blue-500/30 bg-[#060d1e] p-6 sm:p-7 shadow-[0_0_70px_rgba(0,112,243,0.3)] text-slate-100">
            <button
              type="button"
              onClick={resetInscricao}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/60 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleInscricao} className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0084FF]">
                    Inscrição Oficial
                  </span>
                  <h3 className="text-lg font-extrabold text-white">
                    Conferência de Negócios 2026
                  </h3>
                  <p className="text-xs text-slate-400">
                    15 - 16 Nov 2026 | Centro de Convenções de Luanda
                  </p>
                </div>

                {/* Tipo de Passe */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300">
                    Selecione o seu tipo de passe
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTicketType("Geral")}
                      className={`rounded-lg border p-2.5 text-left text-xs transition-all cursor-pointer ${
                        ticketType === "Geral"
                          ? "border-[#0080FF] bg-blue-600/20 text-white"
                          : "border-slate-800 bg-slate-900/60 text-slate-400"
                      }`}
                    >
                      <div className="font-bold text-white">Passe Geral</div>
                      <div className="text-[10px] text-[#0084FF]">15.000 Kz</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTicketType("VIP")}
                      className={`rounded-lg border p-2.5 text-left text-xs transition-all cursor-pointer ${
                        ticketType === "VIP"
                          ? "border-[#0080FF] bg-blue-600/20 text-white"
                          : "border-slate-800 bg-slate-900/60 text-slate-400"
                      }`}
                    >
                      <div className="font-bold text-white">Passe VIP</div>
                      <div className="text-[10px] text-[#0084FF]">35.000 Kz</div>
                    </button>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Manuel António"
                      value={inscricaoForm.nome}
                      onChange={(e) =>
                        setInscricaoForm({ ...inscricaoForm, nome: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#0080FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300">
                      E-mail para receber o bilhete
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seu.email@exemplo.com"
                      value={inscricaoForm.email}
                      onChange={(e) =>
                        setInscricaoForm({ ...inscricaoForm, email: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#0080FF]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+244 923 000 000"
                        value={inscricaoForm.telefone}
                        onChange={(e) =>
                          setInscricaoForm({ ...inscricaoForm, telefone: e.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#0080FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300">
                        Empresa (Opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="Nome da empresa"
                        value={inscricaoForm.empresa}
                        onChange={(e) =>
                          setInscricaoForm({ ...inscricaoForm, empresa: e.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#0080FF]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#0080FF] py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-[#0070e0] cursor-pointer"
                >
                  Confirmar Inscrição ({ticketType === "VIP" ? "35.000 Kz" : "15.000 Kz"})
                </button>
              </form>
            ) : (
              <div className="py-4 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-white">Inscrição Confirmada!</h3>
                <p className="text-xs text-slate-300">
                  Parabéns, <strong>{inscricaoForm.nome}</strong>. O seu bilhete digital para a{" "}
                  <strong>Conferência de Negócios 2026</strong> foi emitido com sucesso e enviado
                  para <strong>{inscricaoForm.email}</strong>.
                </p>
                <div className="rounded-xl border border-slate-800 bg-[#040916] p-3 text-left text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Passe:</span>
                    <strong className="text-white">{ticketType}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Código do Bilhete:</span>
                    <strong className="font-mono text-[#0084FF]">EP-2026-8492</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetInscricao}
                  className="w-full rounded-lg bg-[#0080FF] py-2.5 text-xs font-bold text-white cursor-pointer"
                >
                  Concluir
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIDEO PREVIEW MODAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-black">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-slate-800 cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="relative aspect-video">
              <img
                src={stageImage}
                alt="Vídeo da Conferência"
                className="h-full w-full object-cover filter brightness-75"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-950/40 p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0080FF] text-white shadow-xl shadow-blue-500/50">
                  <Play size={26} className="ml-1 fill-white" />
                </div>
                <h4 className="mt-4 text-lg font-bold text-white">
                  Conferência de Negócios 2026 — Teaser Oficial
                </h4>
                <p className="mt-1 text-xs text-slate-300">
                  Uma experiência imersiva de inovação, liderança e networking.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
